const express = require('express');
const router = express.Router();
const models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Student.findAll({
    where: {}
  })
  .then((students) => {
    res.json(students);
  });
});

module.exports = router;
