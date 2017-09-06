
const express = require('express');

const router = express.Router();
const CourseController = require('../controllers/courses');

router.get('/:courseId', CourseController.findOne);
router.get('/:courseId/problems', CourseController.findCourseProblems);
router.put('/:courseId', CourseController.update);
router.put('/:courseId/pending', CourseController.pending);
router.put('/:courseId/unpending', CourseController.unPending);
router.delete('/:courseId', CourseController.delete);
router.post('/:courseId/scores', CourseController.addScore);
router.get('/:courseId/scores', CourseController.findScores);

module.exports = router;
