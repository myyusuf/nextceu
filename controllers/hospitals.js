const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  models.Hospital.findAll({
    where: {},
    include: [
      {
        model: models.Department,
      },
    ],
  })
  .then((hospitals) => {
    res.json(hospitals);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.Hospital.findOne({
    where: { id: req.params.hospitalId },
    include: [
      {
        model: models.Department,
      },
    ],
  })
  .then((hospital) => {
    res.json(hospital);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const hospitalForm = req.body;
  models.Hospital.create(hospitalForm)
  .then((hospital) => {
    models.Department.findAll({
      where: { id: hospitalForm.departments },
    })
    .then((foundDepartments) => {
      hospital.setDepartments(foundDepartments)
      .then((result) => {
        res.json(result);
      });
    });
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const hospitalForm = req.body;
  models.Hospital.findOne({
    where: { id: req.params.hospitalId },
  })
  .then((foundHospital) => {
    models.Department.findAll({
      where: { id: hospitalForm.departments },
    })
    .then((foundDepartments) => {
      foundHospital.code = hospitalForm.code;
      foundHospital.name = hospitalForm.name;
      foundHospital.save()
      .then((saveResult) => {
        foundHospital.setDepartments(foundDepartments)
        .then((result) => {
          res.json(result);
        });
      });
    });
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.Hospital.destroy(
    {
      where: { id: req.params.hospitalId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
