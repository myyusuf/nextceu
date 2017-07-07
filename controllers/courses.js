const models = require('../models');

exports.findOne = function(req, res) {
  models.Course.findOne({
    where: { id: req.params.courseId },
    include: [
      { model: models.Student },
      { model: models.Department },
    ],
  })
  .then((student) => {
    res.json(student);
  });
};

exports.update = function(req, res, next) {
  // const title = req.body.title;
  models.Course.update(
    req.body,
    {
      where: { id: req.params.courseId },
    })
  .then((result) => {
    res.json(result);
  });
};
