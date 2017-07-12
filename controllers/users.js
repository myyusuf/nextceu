const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findAll = function findAll(req, res) {
  const searchText = req.query.searchText ? `%${req.query.searchText}%` : '%%';
  models.User.findAll({
    where: {
      $or: [
        { username: { $ilike: searchText } },
        { name: { $ilike: searchText } },
      ],
    },
  })
  .then((users) => {
    res.json(users);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.findOne = function findOne(req, res) {
  models.User.findOne({
    where: { id: req.params.userId },
  })
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.create = function create(req, res) {
  const userForm = req.body;
  models.User.create(userForm)
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const userForm = req.body;
  models.User.update(
    userForm,
    {
      where: { id: req.params.userId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.User.destroy(
    {
      where: { id: req.params.userId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
