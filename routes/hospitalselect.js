const express = require('express');
const HospitalController = require('../controllers/hospitals.js');

const router = express.Router();

router.get('/', HospitalController.findSchedule);
router.get('/hospitalschedules', HospitalController.hospitalSchedule);

module.exports = router;
