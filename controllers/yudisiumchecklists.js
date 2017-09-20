const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findByStudent = function findOne(req, res) {
  models.YudisiumChecklist.findOne({
    where: { StudentId: req.params.studentId },
  })
  .then((role) => {
    res.json(role);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findPortofolios = (req, res) => {
  models.Course.findAll({
    where: {
      StudentId: req.params.studentId,
      status: { $ne: 4 },
    },
    include: [
      {
        model: models.Department,
        where: {
          level: 1,
        },
      },
    ],
  })
  .then((courses) => {
    const promises = [];
    for (let i = 0; i < courses.length; i += 1) {
      const course = courses[i];
      const promise = new Promise((resolve, reject) => {
        models.Portofolio.findAll({
          where: { CourseId: course.id },
        })
        .then((portofolios) => {
          resolve({
            course,
            portofolios,
          });
        })
        .catch((err) => {
          reject(err);
        });
      });
      promises.push(promise);
    }

    Promise.all(promises)
    .then((result) => {
      res.json(result);
    });
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const yscForm = req.body;
  models.YudisiumChecklist.update(
    yscForm,
    {
      where: { id: req.params.yscId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
