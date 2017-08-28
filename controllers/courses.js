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

  const courseForm = req.body;
  console.log(JSON.stringify(courseForm));
  models.Course.findOne({
    where: { id: req.params.courseId },
    include: [
      { model: models.Score },
    ],
  })
  .then((course) => {
    course.title = courseForm.title;
    course.completion = courseForm.completion;

    if (course.status !== 3) {
      if (course.completion === 0) {
        course.status = 0;
      } else if (course.completion > 0 && course.completion < 100) {
        course.status = 1;
      } else if (course.completion === 100) {
        course.status = 2;
      }
    }

    course.planStartDate = courseForm.planDate[0];
    course.planEndDate = courseForm.planDate[1];
    course.realStartDate = courseForm.realStartDate;
    course.realEndDate = courseForm.realEndDate;

    if (courseForm.planDate1.length > 0) {
      course.planStartDate1 = courseForm.planDate1[0];
      course.planEndDate1 = courseForm.planDate1[1];
    } else {
      course.planStartDate1 = null;
      course.planEndDate1 = null;
    }
    course.realStartDate1 = courseForm.realStartDate1;
    course.realEndDate1 = courseForm.realEndDate1;

    if (courseForm.planDate2.length > 0) {
      course.planStartDate2 = courseForm.planDate2[0];
      course.planEndDate2 = courseForm.planDate2[1];
    } else {
      course.planStartDate2 = null;
      course.planEndDate2 = null;
    }
    course.realStartDate2 = courseForm.realStartDate2;
    course.realEndDate2 = courseForm.realEndDate2;

    if (courseForm.planDate3.length > 0) {
      course.planStartDate3 = courseForm.planDate3[0];
      course.planEndDate3 = courseForm.planDate3[1];
    } else {
      course.planStartDate3 = null;
      course.planEndDate3 = null;
    }
    course.realStartDate3 = courseForm.realStartDate3;
    course.realEndDate3 = courseForm.realEndDate3;

    const score = course.Score;
    score.preTest = courseForm.preTest;
    score.research = courseForm.research;
    score.weeklyDiscussion = courseForm.weeklyDiscussion;
    score.test = courseForm.test;
    score.postTest = courseForm.postTest;

    course.save()
    .then(() => {
      score.save()
      .then((scoreSaveResult) => {
        res.json(scoreSaveResult);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error when doing operation.');
    });
  });
  // const title = req.body.title;
  /*
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
  */
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
