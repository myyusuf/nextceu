const express = require('express');
const YscController = require('../controllers/yudisiumchecklists.js');

const router = express.Router();

router.get('/findbystudent/:yscId', YscController.findByStudent);
router.put('/:yscId', YscController.update);

module.exports = router;
