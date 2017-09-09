const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  models.PortofolioType.findAll({
    where: {
      $or: [
        { code: { $ilike: searchText } },
        { name: { $ilike: searchText } },
      ],
    },
  })
  .then((portofolioTypes) => {
    res.json(portofolioTypes);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.PortofolioType.findOne({
    where: { id: req.params.portofolioTypeId },
  })
  .then((portofolioType) => {
    res.json(portofolioType);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const portofolioTypeForm = req.body;
  models.PortofolioType.create(portofolioTypeForm)
  .then((portofolioType) => {
    res.json(portofolioType);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const portofolioTypeForm = req.body;
  models.PortofolioType.update(
    portofolioTypeForm,
    {
      where: { id: req.params.portofolioTypeId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.PortofolioType.destroy(
    {
      where: { id: req.params.portofolioTypeId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};