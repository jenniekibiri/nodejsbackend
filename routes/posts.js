const express = require('express');
const router = express.Router()
const {getPosts,getAllPosts,deletePosts,updatePost,createPosts} = require('../controllers/post')
const {postValidator} = require('../validator')


router.get('/',getPosts)
router.post('/posts',postValidator,createPosts)
router.get('/allposts',getAllPosts)
router.delete('/deletepost',deletePosts)
router.put('/updatepost',updatePost)
module.exports = router;