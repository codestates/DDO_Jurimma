const express = require('express');
const router = express.Router();

const { meaningController } = require('../controllers');

router.get('/', meaningController.search.get); // Get Word Meanings

router.get('/user/:id', meaningController.me.get);
router.post('/', meaningController.me.post);
router.patch('/:id', meaningController.me.patch);
router.delete('/:id', meaningController.me.delete);

router.patch('/:id/thumbsup', meaningController.thumbsup.patch);

module.exports = router;
