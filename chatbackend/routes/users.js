const express = require('express');
const { getProfile, updateProfile, getUsers } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.get('/', auth, getUsers);

module.exports = router;