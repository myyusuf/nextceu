const moment = require('moment');
const models = require('../models');

exports.costUnits = function(req, res) {
  let startDate = null;
  let endDate = null;
  const dateRange = req.query.dateRange;
  if (dateRange) {
    startDate = moment(dateRange[0].replace(/"/g, ''));
    endDate = moment(dateRange[1].replace(/"/g, ''));
  } else {
    res.json([]);
    return;
  }

  const hospitalId = req.query.hospital ? parseInt(req.query.hospital, 10) : -1;
  models.Course.findAll({
    where: {
      realStartDate: {
        $gte: startDate.toDate(),
        $lte: endDate.toDate(),
      },
    },
    include: [
      { model: models.Student },
      { model: models.Department },
      { model: models.Hospital, as: 'hospital1', where: { id: hospitalId } },
    ],
  })
  .then((courses) => {
    const FEE_CONSTANT1 = 75000;
    const FEE_CONSTANT2 = 20000;
    const FEE_CONSTANT3 = 20000;
    const FEE_CONSTANT4 = 5000;
    const FEE_CONSTANT5 = 50000;
    const FEE_CONSTANT6 = 50000;
    const FEE_CONSTANT7 = 100000;

    for (let i = 0; i < courses.length; i += 1) {
      const course = courses[i];
      const tmpStartDate = moment(course.realStartDate);
      const tmpEndDate = endDate;
      // const tmpEndDate = moment(course.realEndDate);
      // tmpEndDate.add({seconds: 1});

      const courseDuration = tmpEndDate.diff(tmpStartDate, 'weeks');

      const fee1 = courseDuration * FEE_CONSTANT1;
      const fee2 = courseDuration * FEE_CONSTANT2;
      const fee3 = courseDuration * FEE_CONSTANT3;
      const fee4 = courseDuration * FEE_CONSTANT4;
      const fee5 = courseDuration * FEE_CONSTANT5;
      const fee6 = courseDuration * FEE_CONSTANT6;
      const fee7 = courseDuration * FEE_CONSTANT7;
      const total = fee1 + fee2 + fee3 + fee4 + fee5 + fee6 + fee7;

      course.courseDuration = courseDuration;
      course.fee1 = fee1;
      course.fee2 = fee2;
      course.fee3 = fee3;
      course.fee4 = fee4;
      course.fee5 = fee5;
      course.fee6 = fee6;
      course.fee7 = fee7;
      course.total = total;
    }
    res.json(courses);
  });
};
