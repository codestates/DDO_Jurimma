const express = require('express');
const router = express.Router();

const { myContentsController } = require('../controllers');

router.get('/', myContentsController.myContents.get);

module.exports = router;
