const express = require('express');
const router = express.Router();

const { contentController } = require('../controllers/');

router.get('/search', contentController.search.get);
router.get('/chart', contentController.chart.get);
router.get('/auto-comp', contentController.autoComp.get);
router.get('/more-search', contentController.moreSearch.get);
router.post('/new-content', contentController.newContent.post);
router.post('/delete', contentController.delete.post);
router.patch('/edition', contentController.edition.patch);
router.patch('/thumbsup', contentController.thumbsup.patch);

module.exports = router;
