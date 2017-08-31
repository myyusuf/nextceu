const express = require('express');
const SeminarController = require('../controllers/seminars.js');

const router = express.Router();

router.post('/', SeminarController.fileUpload);

module.exports = router;
