const express = require('express');

const router = express.Router();
const StudentController = require('../controllers/students');

/* GET users listing. */
router.get('/', StudentController.findAll);
router.post('/', StudentController.create);

module.exports = router;
