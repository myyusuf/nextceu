const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  models.Department.findAll({
    where: {
      $or: [
        { code: { $ilike: searchText } },
        { name: { $ilike: searchText } },
      ],
    },
    order: ['id'],
  })
  .then((departments) => {
    res.json(departments);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.Department.findOne({
    where: { id: req.params.departmentId },
  })
  .then((department) => {
    res.json(department);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const departmentForm = req.body;
  models.Department.create(departmentForm)
  .then((department) => {
    res.json(department);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const departmentForm = req.body;
  models.Department.update(
    departmentForm,
    {
      where: { id: req.params.departmentId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.delete = function destroy(req, res) {
  models.Department.destroy(
    {
      where: { id: req.params.departmentId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
