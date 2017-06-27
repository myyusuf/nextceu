const models = require('../models');

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
