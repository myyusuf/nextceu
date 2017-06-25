const models = require('../models');

exports.findAll = function(req, res) {
  models.Student.findAll({
    where: {}
  })
  .then((students) => {
    res.json(students);
  });
};

exports.create = function(req, res) {
  models.Student.create(req.body)
  .then((result) => {
    res.json(result);
  });
}
