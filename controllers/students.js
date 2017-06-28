const moment = require('moment');
const models = require('../models');

const WEEK_BREAK_DURATION = 2;

exports.findAll = function(req, res) {
  models.Student.findAll({
    where: {}
  })
  .then((students) => {
    res.json(students);
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

exports.create = function(req, res) {
  models.Student.create(req.body)
  .then((result) => {
    res.json(result);
  });
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
  });
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
        where: {},
      })
      .then((departments) => {
        const promises = [];
        for (let i = 0; i < departments.length; i += 1) {
          const createCourse = new Promise((resolve, reject) => {
            const department = departments[i];
            models.Course.create({
              title: `${department.name} ${form.suffix}`,
            })
            .then((course) => {
              course.setStudent(student)
              .then(() => {
                course.setDepartment(department)
                .then(() => {
                  resolve(course);
                });
              });
            })
            .catch((err) => {
              reject(err);
            });
          });
          promises.push(createCourse);
        }

        Promise.all(promises)
        .then((courses) => {
          res.json(courses);
        });
      });
    });
  } else if (form.formType === 'DEPARTMENT') {
    const planStartDate = moment(form.formattedStartDate, 'DD/MM/YYYY');
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
      ]
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
