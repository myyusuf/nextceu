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

router.get('/edit/:departmentId', function(req, res, next) {
  models.Department.findOne({
    where: { id: req.params.departmentId },
  })
  .then((department) => {
    res.json(department);
  });
});

module.exports = router;
