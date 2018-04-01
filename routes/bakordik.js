const express = require('express');
const BakordikController = require('../controllers/bakordik.js');
const { isAuthorizedAsBakordik } = require('../helpers/AuthUtils');

const router = express.Router();

router.get('/initiatestudents', isAuthorizedAsBakordik, BakordikController.findInitiateStudentCourses);

module.exports = router;
