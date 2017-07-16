
const express = require('express');

const router = express.Router();
const CourseController = require('../controllers/courses');

router.get('/:courseId', CourseController.findOne);
router.get('/:courseId/problems', CourseController.findCourseProblems);
router.put('/:courseId', CourseController.update);
router.delete('/:courseId', CourseController.delete);

module.exports = router;
