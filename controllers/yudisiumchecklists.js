const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.findByStudent = function findOne(req, res) {
  models.YudisiumChecklist.findOne({
    where: { StudentId: req.params.student },
  })
  .then((role) => {
    res.json(role);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.update = function update(req, res) {
  const yscForm = req.body;
  models.YudisiumChecklist.update(
    yscForm,
    {
      where: { id: req.params.yscId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
