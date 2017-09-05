
const express = require('express');

const router = express.Router();
const CourseController = require('../controllers/courses');

router.get('/:courseId', CourseController.findOne);
router.get('/:courseId/problems', CourseController.findCourseProblems);
router.put('/:courseId', CourseController.update);
router.put('/:courseId/pending', CourseController.pending);
router.put('/:courseId/unpending', CourseController.unPending);
router.delete('/:courseId', CourseController.delete);

module.exports = router;
