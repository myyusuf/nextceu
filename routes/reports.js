const express = require('express');
const ReportController = require('../controllers/reports.js');
const CostUnitController = require('../controllers/cost_units.js');

const router = express.Router();

router.get('/completedcourses', ReportController.findCompletedCourses);
router.post('/exporttopretest', ReportController.exportToPreTest);
router.get('/pretests', ReportController.findPreTests);
router.put('/pretests/remove', ReportController.removeCoursesFormPreTest);
router.get('/costunits', CostUnitController.costUnits);

module.exports = router;
