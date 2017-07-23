const models = require('../models');

exports.findOne = function(req, res) {
  models.Course.findOne({
    where: { id: req.params.courseId },
    include: [
      { model: models.Student },
      { model: models.Department },
      { model: models.Score },
      { model: models.Hospital, as: 'hospital1' },
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
      score.research = req.body.research;
      score.weeklyDiscussion = req.body.weeklyDiscussion;
      score.test = req.body.test;
      score.postTest = req.body.postTest;
      score.save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(500).send('Error when doing operation.');
      })
    });
  } else {
    // models.Course.update(
    //   req.body,
    //   {
    //     where: { id: req.params.courseId },
    //   })
    //   .then((result) => {
    //     res.json(result);
    //   });
    const courseForm = req.body;
    models.Course.findOne({
      where: { id: req.params.courseId },
      include: [
        { model: models.Score },
      ],
    })
    .then((course) => {
      if (courseForm.hospital1) {
        models.Hospital.findOne({
          where: { id: courseForm.hospital1}
        })
        .then((foundHospital) => {
          course.setHospital1(foundHospital)
          .then(() => {

            course.save()
            .then((result) => {
              res.json(result);
            })
            .catch((err) => {
              res.status(500).send('Error when doing operation.');
            });

          });
        });
      } else {
        course.setHospital1(null)
        .then(() => {

          course.save()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            res.status(500).send('Error when doing operation.');
          });

        });
      }
    });
  }
};

exports.findCourseProblems = function(req, res) {
  models.Course.findOne({
    where: { id: req.params.courseId },
  })
  .then((course) => {
    course.getCourseProblems()
    .then((courseProblems) => {
      res.json(courseProblems);
    });
  });
};

exports.delete = function(req, res) {
  const courseId = req.params.courseId;
  models.Course.destroy({
    where: { id: courseId },
  })
  .then((result) => {
    res.json(result);
  });
};
