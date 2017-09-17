const models = require('../models');

const sendError = (err, res) => {
  res.status(500).send(`Error while doing operation: ${err.name}, ${err.message}`);
};

exports.update = function update(req, res) {
  const sglForm = req.body;
  sglForm.SglTypeId = parseInt(sglForm.sglType, 10);
  sglForm.PengampuId = parseInt(sglForm.pengampu, 10);
  models.Sgl.update(
    sglForm,
    {
      where: { id: req.params.sglId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};

exports.destroy = function destroy(req, res) {
  models.Sgl.destroy(
    {
      where: { id: req.params.sglId },
    })
  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    sendError(err, res);
  });
};
