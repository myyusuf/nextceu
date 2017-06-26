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
