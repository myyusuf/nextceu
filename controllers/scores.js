const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  models.Score.findAll({
    where: {
      $or: [
        { code: { $ilike: searchText } },
        { name: { $ilike: searchText } },
      ],
    },
  })
  .then((scores) => {
    res.json(scores);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.scoreTypes = function findAll(req, res) {
  models.ScoreType.findAll({
    where: {},
  })
  .then((scores) => {
    res.json(scores);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.Score.findOne({
    where: { id: req.params.scoreId },
  })
  .then((score) => {
    res.json(score);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const scoreForm = req.body;
  models.Score.create(scoreForm)
  .then((score) => {
    res.json(score);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const scoreForm = req.body;
  models.Score.update(
    scoreForm,
    {
      where: { id: req.params.scoreId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.Score.destroy(
    {
      where: { id: req.params.scoreId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
