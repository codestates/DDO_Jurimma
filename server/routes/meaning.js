const express = require('express');
const router = express.Router();

const { meaningController } = require('../controllers');

router.get('/', meaningController.search.get); // Get Word Meanings

router.get('/me', meaningController.me.get);
router.post('/me', meaningController.me.post);
router.patch('/me', meaningController.me.patch);
router.delete('/me', meaningController.me.delete);

router.patch('/thumbsup', meaningController.thumbsup.patch);

module.exports = router;
