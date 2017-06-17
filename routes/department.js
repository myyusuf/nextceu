const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Department.findAll({
    where: {}
  })
  .then((departments) => {
    res.json(departments);
  });
});

module.exports = router;
