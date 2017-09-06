const express = require('express');

const router = express.Router();
const StudentController = require('../controllers/students');

/* GET users listing. */
router.get('/', StudentController.findAll);
router.get('/:studentId', StudentController.findOne);
router.post('/', StudentController.create);
router.put('/:studentId', StudentController.update);
router.delete('/:studentId', StudentController.delete);
router.post('/:studentId/courses', StudentController.addCourses);
router.get('/:studentId/courses', StudentController.findCourses);
router.delete('/:studentId/courses/:courseId', StudentController.deleteCourse);
router.get('/:studentId/scores', StudentController.findScores);

module.exports = router;
