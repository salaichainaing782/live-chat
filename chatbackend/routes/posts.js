const express = require('express');
const { createPost, getPosts, likePost } = require('../controllers/postController');
const auth = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();

router.post('/', auth, upload.array('images', 4), createPost);
router.get('/', auth, getPosts);
router.put('/:id/like', auth, likePost);

module.exports = router;