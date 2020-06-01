const Posts = require('../model/post')
exports.getPosts = (req, res) => {
    res.json({
        post: [
            {
                "title": "stuck with you",
                "artist": "justin bieber"
            },
            {
                "title": "stuck with you",
                "artist": "justin bieber"
            }]

    }
    )
}
exports.createPosts=(req,res)=>{
const posts = new Posts (req.body)
posts.save()
.then((post)=>{
res.json({post})
})
}

exports.getAllPosts=(req,res)=>{
    Posts.find().then(posts=>{
        res.status(200).json({
            posts:posts
        })
    })
    .catch((err)=>{
        res.status(400).json({
            message:err
                })
    })
    
}
exports.deletePosts=(req,res)=>{
    Posts.findByIdAndRemove(req.params.id).then(post=>{
        res.status(200).json({
            message:'post succesfully deleted'
        })
    }).catch((err)=>{
        res.status(400).json({
            message:err
        })
    })
}
exports.updatePost=(req,res)=>{
    Posts.findOneAndUpdate(req.params.id,{
       title: req.body.title,
       body:req.body.body
    },{new:true})
    
    .then(post=>{
        res.status(200).json({
            message:'post updated successfully',
            post:post
        })
    }).catch((err)=>{
        res.status(400).json({
            message:err
        })
    })
}