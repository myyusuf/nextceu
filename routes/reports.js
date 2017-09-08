const express = require('express');
const ReportController = require('../controllers/reports.js');

const router = express.Router();

router.get('/completedcourses', ReportController.findCompletedCourses);
router.post('/exporttopretest', ReportController.exportToPreTest);
router.get('/pretests', ReportController.findPreTests);

module.exports = router;
