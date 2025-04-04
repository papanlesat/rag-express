const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

router.post('/ask', aiController.ask);
router.post('/ask-stream', aiController.askStream);
//router.post('/prepare-rag', aiController.prepareRAG);
//router.post('/toggle-rag', aiController.toggleRAG);
router.post('/search', aiController.searchWeb);

module.exports = router;