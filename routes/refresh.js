const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');



router.get('/', refreshTokenController.handleRefreshToken);
// router.get('/', refreshTokenController.text);

module.exports = router;