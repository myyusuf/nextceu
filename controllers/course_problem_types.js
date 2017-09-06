const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  models.CourseProblemType.findAll({
    where: {
      $or: [
        { code: { $ilike: searchText } },
        { name: { $ilike: searchText } },
      ],
    },
  })
  .then((courseProblems) => {
    res.json(courseProblems);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.CourseProblemType.findOne({
    where: { id: req.params.courseProblemId },
  })
  .then((courseProblem) => {
    res.json(courseProblem);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const courseProblemForm = req.body;
  models.CourseProblemType.create(courseProblemForm)
  .then((courseProblem) => {
    res.json(courseProblem);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const courseProblemForm = req.body;
  models.CourseProblemType.update(
    courseProblemForm,
    {
      where: { id: req.params.courseProblemId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.CourseProblemType.destroy(
    {
      where: { id: req.params.courseProblemId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
