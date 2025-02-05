// routes/groupRoutes.js
const express = require('express');
const router = express.Router();
const { createGroup, getGroups } = require('../controllers/group.controller');
// const authMiddleware = require('../middlewares/authMiddleware.js');

// kept unprotected for testing 
router.post('/', createGroup);
// router.post('/', authMiddleware, createGroup);

router.get('/', getGroups);

module.exports = router;
