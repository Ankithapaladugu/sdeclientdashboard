const express = require('express');
const router = express.Router();
const { login, createUser, getDriveLink, getUserDetails,getSmartsheetLink} = require('../controllers/authController');

// Routes
router.post('/login', login);
router.post('/register', createUser);
router.get('/drive-link/:id', getDriveLink);
router.get('/user/:id', getUserDetails);
router.get('/smartsheet-link/:id', getSmartsheetLink);

module.exports = router;
