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
            course.planStartDate = req.body.planStartDate;
            course.planStartDate1 = req.body.planStartDate1;
            course.planStartDate2 = req.body.planStartDate2;
            course.planStartDate3 = req.body.planStartDate3;
            course.planEndDate = req.body.planEndDate;
            course.planEndDate1 = req.body.planEndDate1;
            course.planEndDate2 = req.body.planEndDate2;
            course.planEndDate3 = req.body.planEndDate3;

            course.realStartDate = req.body.realStartDate;
            course.realStartDate1 = req.body.realStartDate1;
            course.realStartDate2 = req.body.realStartDate2;
            course.realStartDate3 = req.body.realStartDate3;
            course.realEndDate = req.body.realEndDate;
            course.realEndDate1 = req.body.realEndDate1;
            course.realEndDate2 = req.body.realEndDate2;
            course.realEndDate3 = req.body.realEndDate3;

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
          course.planStartDate = req.body.planStartDate;
          course.planStartDate1 = req.body.planStartDate1;
          course.planStartDate2 = req.body.planStartDate2;
          course.planStartDate3 = req.body.planStartDate3;
          course.planEndDate = req.body.planEndDate;
          course.planEndDate1 = req.body.planEndDate1;
          course.planEndDate2 = req.body.planEndDate2;
          course.planEndDate3 = req.body.planEndDate3;

          course.realStartDate = req.body.realStartDate;
          course.realStartDate1 = req.body.realStartDate1;
          course.realStartDate2 = req.body.realStartDate2;
          course.realStartDate3 = req.body.realStartDate3;
          course.realEndDate = req.body.realEndDate;
          course.realEndDate1 = req.body.realEndDate1;
          course.realEndDate2 = req.body.realEndDate2;
          course.realEndDate3 = req.body.realEndDate3;

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
