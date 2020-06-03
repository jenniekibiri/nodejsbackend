const express = require('express');
const router = express.Router()
const { getAllPosts, deletePosts, updatePost, createPosts } = require('../controllers/post')
const { requireSignin } = require('../controllers/auth')
const { postValidator } = require('../validator')
const { userById } = require('../controllers/users')
router.post('/posts', requireSignin, postValidator,  createPosts)
router.get('/allposts', getAllPosts)
router.delete('/deletepost', requireSignin,deletePosts)
router.put('/updatepost',  requireSignin, updatePost)

router.param('UserId', userById);
module.exports = router;