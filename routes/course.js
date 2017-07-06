
const express = require('express');

const router = express.Router();
const CourseController = require('../controllers/courses');

router.get('/:courseId', CourseController.findOne);
router.put('/:courseId', CourseController.update);

module.exports = router;
