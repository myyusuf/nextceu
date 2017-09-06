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
    // course.completion = courseForm.completion;
    //
    // if (course.status !== 3) {
    //   if (course.completion === 0) {
    //     course.status = 0;
    //   } else if (course.completion > 0 && course.completion < 100) {
    //     course.status = 1;
    //   } else if (course.completion === 100) {
    //     course.status = 2;
    //   }
    // }

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

    // You can not change pending status
    if (course.status !== 4) {
      if (course.realStartDate && course.realEndDate) {
        course.status = 2;
      } else if (course.realStartDate) {
        course.status = 1;
      } else {
        course.status = 0;
      }
    }

    const score = course.Score;
    score.preTest = courseForm.preTest;
    score.research = courseForm.research;
    score.weeklyDiscussion = courseForm.weeklyDiscussion;
    score.test = courseForm.test;
    score.postTest = courseForm.postTest;

    if (courseForm.hospital1) {
      course.hospital1Id = parseInt(courseForm.hospital1, 10);
    } else {
      course.hospital1Id = null;
    }

    if (courseForm.clinic) {
      course.clinicId = parseInt(courseForm.clinic, 10);
    } else {
      course.clinicId = null;
    }

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
};

exports.pending = function(req, res, next) {
  models.Course.findOne({
    where: { id: req.params.courseId },
  })
  .then((course) => {
    course.status = 4;
    course.save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error when doing operation.');
    });
  });
};

exports.unPending = function(req, res, next) {
  models.Course.findOne({
    where: { id: req.params.courseId },
  })
  .then((course) => {
    course.status = 0;
    course.save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error when doing operation.');
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

exports.addScore = function(req, res) {
  const courseId = req.params.courseId;
  const scoreForm = req.body;
  scoreForm.CourseId = parseInt(courseId, 10);
  scoreForm.ScoreTypeId = parseInt(scoreForm.scoreType, 10);
  models.Score.create(scoreForm)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('Error when doing operation.');
  });
};

exports.findScores = function(req, res) {
  models.Score.findAll({
    where: {},
    include: [
      { model: models.Course, where: { id: req.params.courseId } },
      { model: models.ScoreType },
    ],
  })
  .then((scores) => {
    res.json(scores);
  });
};

exports.addCourseProblem = function(req, res) {
  const courseId = req.params.courseId;
  const courseProblemForm = req.body;
  courseProblemForm.CourseId = parseInt(courseId, 10);
  courseProblemForm.CourseProblemTypeId = parseInt(courseProblemForm.courseProblemType, 10);
  models.CourseProblem.create(courseProblemForm)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('Error when doing operation.');
  });
};

exports.findCourseProblems = function(req, res) {
  models.CourseProblem.findAll({
    where: {},
    include: [
      { model: models.Course, where: { id: req.params.courseId } },
      { model: models.CourseProblemType },
    ],
  })
  .then((courseProblems) => {
    res.json(courseProblems);
  });
};
