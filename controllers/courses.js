const models = require('../models');

exports.findOne = function(req, res) {
  models.Course.findOne({
    where: { id: req.params.courseId }
  })
  .then((student) => {
    res.json(student);
  });
};
