const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Department.findAll({
    where: {},
    order: ['id']
  })
  .then((departments) => {
    res.json(departments);
  });
});

router.post('/add', function(req, res, next) {
  const departmentForm = req.body;
  models.Department.create(departmentForm)
  .then((department) => {
    res.json(department);
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

router.put('/edit/:departmentId', function(req, res, next) {
  const departmentForm = req.body;
  models.Department.update(
    departmentForm,
    {
      where: { id: req.params.departmentId },
    })
  .then((result) => {
    res.json(result);
  });
});

router.delete('/delete/:departmentId', function(req, res, next) {
  models.Department.destroy(
    {
      where: { id: req.params.departmentId },
    })
  .then((result) => {
    res.json(result);
  });
});

module.exports = router;
