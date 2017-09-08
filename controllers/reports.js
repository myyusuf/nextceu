const moment = require('moment');
const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findCompletedCourses = function(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  const dateRange = req.query.dateRange;
  let startDate = null;
  let endDate = null;
  if (dateRange) {
    startDate = moment(dateRange[0].replace(/"/g, ''));
    endDate = moment(dateRange[1].replace(/"/g, ''));
  } else {
    res.json({
      count: 0,
      rows: [],
    });
    return;
  }
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.Course.findAndCountAll({
    where: {
      realEndDate: {
        $gte: startDate.toDate(),
        $lte: endDate.toDate(),
      },
      status: 2,
    },
    include: [
      {
        model: models.Student,
        where: {
          $or: [
            { name: { $ilike: searchText } },
            { oldSid: { $ilike: searchText } },
            { newSid: { $ilike: searchText } },
          ],
        },
      },
    ],
    limit,
    offset,
  })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.exportToPreTest = function(req, res) {
  const exportToPreTestForm = req.body;
  const preTestDate = exportToPreTestForm.preTestDate;
  const courseIds = exportToPreTestForm.courseIds;
  const promises = [];
  for (let i = 0; i < courseIds.length; i += 1) {
    const courseId = courseIds[i];
    const promise = new Promise((resolve, reject) => {
      models.Course.update(
        { preTestDate },
        {
          where: { id: courseId },
        })
      .then((result) => {
        resolve(result);
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
  })
  .catch((err) => {
    sendError(err, res);
  });

  // models.Role.create(roleForm)
  // .then((role) => {
  //   res.json(role);
  // })
  // .catch((err) => {
  //   sendError(err, res);
  // });
};
