const express = require('express');
const router = express.Router()
const {getPosts,getAllPosts,deletePosts,updatePost,createPosts} = require('../controllers/post')
const {signup,signout}= require('../controllers/users')
const {signin} =require('../controllers/auth')
const {postValidator,signinValidator} = require('../validator')


router.get('/',getPosts)
router.post('/posts',postValidator,createPosts)
router.post('/signup',signinValidator,signup)
router.get('/allposts',getAllPosts)
router.delete('/deletepost',deletePosts)
router.put('/updatepost',updatePost)
router.post('/signin',signin)
router.post('/signout',signout)
module.exports = router;