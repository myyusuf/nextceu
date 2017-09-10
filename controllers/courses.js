const moment = require('moment');
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

const checkProblems = (course) => {
  const courseProblems = course.CourseProblems;
  let hasProblem = false;
  for (let i = 0; i < courseProblems.length; i += 1) {
    const courseProblem = courseProblems[i];
    if (!courseProblem.completed) {
      hasProblem = true;
      break;
    }
  }

  if (hasProblem) {
    return {
      valid: false,
      message: 'Course has pending problems. ',
    };
  }

  return {
    valid: true,
    message: '',
  };
};

const checkSeminars = course => (
  new Promise((resolve, reject) => {
    const startDate = course.realStartDate;
    const endDate = course.realEndDate;
    const where = {
      eventDate: {},
    };

    if (startDate) {
      where.eventDate.$gte = startDate;
    }

    if (endDate) {
      where.eventDate.$lte = endDate;
    }
    models.Participant.findAll({
      where: {},
      include: [
        { model: models.Seminar,
          where,
        },
        { model: models.Student, where: { id: course.Student.id } },
      ],
    })
    .then((participants) => {
      const seminars = participants.map(participant => participant.Seminar);
      const minimumSeminarCount = course.Department.seminarsCount * 0.8;
      if (seminars.length < minimumSeminarCount) {
        resolve({
          valid: false,
          message: 'Course seminars below minimum. ',
        });
      } else {
        resolve({
          valid: true,
          message: '',
        });
      }
    });
  })
);

const orderingCourses = course => (
  new Promise((resolve, reject) => {
    models.Course.findAll({
      where: { StudentId: course.Student.id, status: { $ne: 4 } },
      order: [
        ['planStartDate'],
      ],
    })
    .then((courses) => {
      const promises = [];
      for (let i = 0; i < courses.length; i += 1) {
        const course = courses[i];
        course.courseIndex = i + 1;
        course.finalCourse = (i === courses.length - 1);
        promises.push(new Promise((resolveInner, rejectInner) => {
          course.save()
          .then(() => {
            resolveInner();
          });
        }));
      }

      Promise.all(promises)
      .then((result) => {
        resolve(result);
      });
    });
  })
);

exports.update = function(req, res, next) {

  const courseForm = req.body;
  console.log(JSON.stringify(courseForm));
  models.Course.findOne({
    where: { id: req.params.courseId },
    include: [
      { model: models.Department },
      { model: models.Student },
      { model: models.CourseProblem },
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

    if (courseForm.adviser) {
      course.adviserId = parseInt(courseForm.adviser, 10);
    } else {
      course.adviserId = null;
    }

    if (courseForm.examiner) {
      course.examinerId = parseInt(courseForm.examiner, 10);
    } else {
      course.examinerId = null;
    }

    if (courseForm.dpk) {
      course.dpkId = parseInt(courseForm.dpk, 10);
    } else {
      course.dpkId = null;
    }

    // You can not change pending status
    if (course.status !== 4) {
      if (course.realStartDate && course.realEndDate) {
        const checkProblemsResult = checkProblems(course);
        let problemDescription = '';
        checkSeminars(course)
        .then((checkSeminarsResult) => {
          if (!checkSeminarsResult.valid || !checkProblemsResult.valid) {
            course.status = 3;
            problemDescription += checkSeminarsResult.message;
            problemDescription += checkProblemsResult.message;
            course.problemDescription = problemDescription;
          } else {
            course.problemDescription = '';
            course.status = 2;
          }
          course.save()
          .then((courseSaveResult) => {
            // res.json(courseSaveResult);
            orderingCourses(course)
            .then(() => {
              res.json(courseSaveResult);
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send('Error when doing operation.');
          });
        });
      } else {
        if (course.realStartDate) {
          course.status = 1;
        } else {
          course.status = 0;
        }
        course.save()
        .then((courseSaveResult) => {
          orderingCourses(course)
          .then(() => {
            res.json(courseSaveResult);
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send('Error when doing operation.');
        });
      }
    }
  });
};

exports.pending = function(req, res, next) {
  models.Course.findOne({
    where: { id: req.params.courseId },
  })
  .then((course) => {
    course.status = 4;
    course.courseIndex = -1;
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

//-----

exports.addPortofolio = function(req, res) {
  const courseId = req.params.courseId;
  const portofolioForm = req.body;
  portofolioForm.CourseId = parseInt(courseId, 10);
  portofolioForm.PortofolioTypeId = parseInt(portofolioForm.portofolioType, 10);
  models.Portofolio.create(portofolioForm)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('Error when doing operation.');
  });
};

exports.findPortofolios = function(req, res) {
  models.Portofolio.findAll({
    where: {},
    include: [
      { model: models.Course, where: { id: req.params.courseId } },
      { model: models.PortofolioType },
    ],
  })
  .then((portofolios) => {
    res.json(portofolios);
  });
};

//-----

exports.findCourseSeminars = function(req, res) {
  const startDate = req.query.startDate ? moment(req.query.startDate.replace(/"/g, '')) : null;
  const endDate = req.query.endDate ? moment(req.query.endDate.replace(/"/g, '')) : null;
  const courseId = parseInt(req.params.courseId, 10);

  models.Course.findOne({
    where: { id: courseId },
    include: [
      { model: models.Student },
    ],
  })
  .then((course) => {
    const where = {
      eventDate: {},
    };

    if (startDate) {
      where.eventDate.$gte = startDate.toDate();
    }

    if (endDate) {
      where.eventDate.$lte = endDate.toDate();
    }

    models.Participant.findAll({
      where: {},
      include: [
        { model: models.Seminar,
          where,
        },
        { model: models.Student, where: { id: course.Student.id } },
      ],
    })
    .then((participants) => {
      res.json(participants.map(participant => participant.Seminar));
    });
  });
};
