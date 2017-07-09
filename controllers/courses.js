const models = require('../models');

exports.findOne = function(req, res) {
  models.Course.findOne({
    where: { id: req.params.courseId },
    include: [
      { model: models.Student },
      { model: models.Department },
      { model: models.Score },
    ],
  })
  .then((course) => {
    res.json(course);
  });
};

exports.update = function(req, res, next) {
  // const title = req.body.title;

  if (req.body.editType && req.body.editType === 'SCORE') {
    models.Course.findOne({
      where: { id: req.params.courseId },
      include: [
        { model: models.Score },
      ],
    })
    .then((course) => {
      const score = course.Score;
      score.preTest = req.body.preTest;
      score.save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).send('Error when doing operation.');
      })
    });
  } else {
    models.Course.update(
      req.body,
      {
        where: { id: req.params.courseId },
      })
      .then((result) => {
        res.json(result);
      });
  }
};
