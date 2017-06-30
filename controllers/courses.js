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
