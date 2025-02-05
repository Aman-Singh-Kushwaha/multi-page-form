const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaign.controller');
// const authMiddleware = require('../middlewares/authMiddleware');

//kept unprotected for testing
router.post('/publish', campaignController.publishCampaign);

// router.post('/publish', authMiddleware, campaignController.publishCampaign);


module.exports = router;
