const express = require('express');
const router = express.Router();
const { login, createUser, getDriveLink } = require('../controllers/authController');

// Routes
router.post('/login', login);
router.post('/register', createUser);
router.get('/drive-link/:id', getDriveLink);

module.exports = router;
