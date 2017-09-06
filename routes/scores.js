const express = require('express');
const ScoreController = require('../controllers/scores.js');

const router = express.Router();

router.get('/', ScoreController.findAll);
router.get('/:scoreId', ScoreController.findOne);
router.post('/', ScoreController.create);
router.put('/:scoreId', ScoreController.update);
router.delete('/:scoreId', ScoreController.destroy);

module.exports = router;
