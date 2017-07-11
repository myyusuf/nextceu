const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  models.HospitalDepartment.findAll({
    where: {},
  })
  .then((hospitalDepartments) => {
    res.json(hospitalDepartments);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.HospitalDepartment.findOne({
    where: { id: req.params.hospitalDepartmentId },
  })
  .then((hospitalDepartment) => {
    res.json(hospitalDepartment);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const hospitalDepartmentForm = req.body;
  models.HospitalDepartment.create(hospitalDepartmentForm)
  .then((hospitalDepartment) => {
    res.json(hospitalDepartment);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const hospitalDepartmentForm = req.body;
  models.HospitalDepartment.update(
    hospitalDepartmentForm,
    {
      where: { id: req.params.hospitalDepartmentId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.HospitalDepartment.destroy(
    {
      where: { id: req.params.hospitalDepartmentId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
