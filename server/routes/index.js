const express = require('express');
const router = express.Router();
const RedStoneController = require('../controllers/redstone');

router.get('/tokens', RedStoneController.getTokens);
router.get('/token', RedStoneController.getToken);

module.exports = router;