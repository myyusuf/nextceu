const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  const limit = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 10;
  const currentPage = req.query.currentPage ? parseInt(req.query.currentPage, 10) : 1;
  const offset = (currentPage - 1) * limit;
  models.Docent.findAndCountAll({
    where: {
      $or: [
        { code: { $ilike: searchText } },
        { name: { $ilike: searchText } },
      ],
    },
    include: [
      { model: models.Hospital },
      { model: models.Department },
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

exports.findOne = function findOne(req, res) {
  models.Docent.findOne({
    where: { id: req.params.docentId },
  })
  .then((docent) => {
    res.json(docent);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const docentForm = req.body;
  const hospitalId = docentForm.hospital;
  const departmentId = docentForm.department;

  docentForm.HospitalId = hospitalId;
  docentForm.DepartmentId = departmentId;

  models.Docent.create(docentForm)
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const docentForm = req.body;
  const hospitalId = docentForm.hospital;
  const departmentId = docentForm.department;

  models.Docent.findOne({
    where: { id: req.params.docentId },
  })
  .then((docent) => {
    docent.code = docentForm.code;
    docent.name = docentForm.name;
    docent.HospitalId = hospitalId;
    docent.DepartmentId = departmentId;

    docent.save()
    .then((saveResult) => {
      res.json(saveResult);
    });
  })
  .catch((err) => {
    sendError(err, res);
  });

  models.Docent.update(
    docentForm,
    {
      where: { id: req.params.docentId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.Docent.destroy(
    {
      where: { id: req.params.docentId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
