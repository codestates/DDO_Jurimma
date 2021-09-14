const express = require('express');
const router = express.Router();

const { wordController } = require('../controllers');

router.get('/chart', wordController.chart.get);
router.get('/', wordController.autoComp.get);

module.exports = router;
