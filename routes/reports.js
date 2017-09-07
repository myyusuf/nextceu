const express = require('express');
const ReportController = require('../controllers/reports.js');

const router = express.Router();

router.get('/completedcourses', ReportController.findCompletedCourses);

module.exports = router;
