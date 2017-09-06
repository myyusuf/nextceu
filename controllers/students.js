const moment = require('moment');
const Sequelize = require('sequelize');
const models = require('../models');

const WEEK_BREAK_DURATION = 2;

exports.findAll = function (req, res) {
  const level = req.query.level ? parseInt(req.query.level, 10) : 0;
  const status = req.query.status ? req.query.status : '';
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;

  const where = {
    $or: [
      { name: { $ilike: searchText } },
      { oldSid: { $ilike: searchText } },
      { newSid: { $ilike: searchText } },
    ],
  };

  where.$and = [];
  if (level !== 0) {
    where.$and.push({ level });
  }

  if (status !== '') {
    where.$and.push({ status });
  }

  models.Student.findAndCountAll({
    where,
    limit,
    offset,
  })
  .then((result) => {
    res.json(result);
  });
};

exports.findOne = function(req, res) {
  models.Student.findOne({
    where: { id: req.params.studentId }
  })
  .then((student) => {
    res.json(student);
  });
};

exports.getStatusCount = function(req, res) {
  models.Student.findAll({
    attributes: ['status', [Sequelize.fn('count', Sequelize.col('status')), 'statusCount']],
    group: ['status'],
  })
  .then((result) => {
    res.json(result);
  });
};

exports.create = function(req, res) {
  const studentForm = req.body;
  studentForm.status = 'ACTIVE';
  models.Student.create(studentForm)
  .then((result) => {
    res.json(result);
  })
  .catch(err => res.status(500).send(err.message));
};

exports.update = function updateStudent(req, res) {
  const studentForm = req.body;
  models.Student.update(
    studentForm,
    {
      where: { id: req.params.studentId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch(err => res.status(500).send(err.message));
};

exports.delete = function deleteStudent(req, res) {
  models.Student.destroy(
    {
      where: { id: req.params.studentId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch(err => res.status(500).send(err.message));
};

exports.addCourses = function(req, res) {
  const studentId = req.params.studentId;
  const form = req.body;

  if (form.formType === 'LEVEL') {
    models.Student.findOne({
      where: { id: studentId },
    })
    .then((student) => {
      models.Department.findAll({
        where: {
          level: parseInt(form.level, 10),
        },
      })
      .then((departments) => {
        const promises = [];

        const createCourse = function (courseParam, studentParam, departmentParam) {
          return new Promise((resolve, reject) => {
            models.Course.create(courseParam)
            .then((course) => {
              course.setStudent(studentParam)
              .then(() => {
                course.setDepartment(departmentParam)
                .then(() => {
                  resolve(course);
                });
              });
            })
            .catch((err) => {
              reject(err);
            });
          });
        };

        // let planStartDate = moment(form.formattedStartDate, 'DD/MM/YYYY');
        let planStartDate = moment(form.startDate);

        for (let i = 0; i < departments.length; i += 1) {
          const department = departments[i];

          const planStartDate1 = planStartDate.clone();

          const planEndDate = planStartDate.clone().add(parseInt(department.duration, 10), 'weeks');
          const planEndDate1 = planStartDate1.clone().add(parseInt(department.duration1, 10), 'weeks');

          const planStartDate2 = planEndDate1.clone();
          const planEndDate2 = planStartDate2.clone().add(parseInt(department.duration2, 10), 'weeks');

          const planStartDate3 = planEndDate2.clone();
          const planEndDate3 = planStartDate3.clone().add(parseInt(department.duration3, 10), 'weeks');

          const createCoursePromise = createCourse({
            title: `${department.name} ${form.suffix}`,
            planStartDate,
            planEndDate,
            planStartDate1,
            planEndDate1,
            planStartDate2,
            planEndDate2,
            planStartDate3,
            planEndDate3,
            status: 0,
            completion: 0,
          }, student, department);

          promises.push(createCoursePromise);

          planStartDate = planEndDate.clone().add(WEEK_BREAK_DURATION, 'weeks');
        }

        Promise.all(promises)
        .then((courses) => {
          res.json(courses);
        });
      });
    });
  } else if (form.formType === 'DEPARTMENT') {
    // const planStartDate = moment(form.formattedStartDate, 'DD/MM/YYYY');
    const planStartDate = moment(form.formattedStartDate);
    const planStartDate1 = planStartDate.clone();
    models.Student.findOne({
      where: { id: studentId },
    })
    .then((student) => {
      models.Department.findOne({
        where: { id: form.department },
      })
      .then((department) => {
        const planEndDate = planStartDate.clone().add(parseInt(department.duration, 10), 'weeks');
        const planEndDate1 = planStartDate1.clone().add(parseInt(department.duration1, 10), 'weeks');

        const planStartDate2 = planEndDate1.clone();
        const planEndDate2 = planStartDate2.clone().add(parseInt(department.duration2, 10), 'weeks');

        const planStartDate3 = planEndDate2.clone();
        const planEndDate3 = planStartDate3.clone().add(parseInt(department.duration3, 10), 'weeks');

        models.Course.create({
          title: form.title,
          planStartDate,
          planEndDate,
          planStartDate1,
          planEndDate1,
          planStartDate2,
          planEndDate2,
          planStartDate3,
          planEndDate3,
          status: 0,
          completion: 0,
        })
        .then((course) => {
          course.setStudent(student)
          .then(() => {
            course.setDepartment(department)
            .then(() => {
              res.json(course);
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
      });
    });
  } else {
    res.status(500).send({ error: 'Unknown add course formType' });
  }
};

exports.findCourses = function(req, res) {
  const studentId = req.params.studentId;
  models.Student.findOne({
    where: { id: studentId }
  })
  .then((student) => {
    models.Course.findAll({
      where: {},
      include: [
        { model: models.Student, where: { id: studentId } },
        { model: models.Department },
        { model: models.Score },
        { model: models.Hospital, as: 'hospital1' },
        { model: models.Hospital, as: 'clinic' },
      ],
    })
    .then((courses) => {
      res.json(courses);
    });
  });
};

exports.findScores = function(req, res) {
  const studentId = req.params.studentId;
  models.Student.findOne({
    where: { id: studentId }
  })
  .then((student) => {
    models.Score.findAll({
      where: {},
      include: [
        { model: models.Student, where: { id: studentId } },
        { model: models.ScoreType },
      ],
    })
    .then((courses) => {
      res.json(courses);
    });
  });
};

exports.deleteCourse = function(req, res) {
  const courseId = req.params.courseId;
  models.Course.destroy({
    where: { id: courseId },
  })
  .then((result) => {
    res.json(result);
  });
};
