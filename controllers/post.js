const Posts = require('../model/post')

exports.createPosts=(req,res,next)=>{
const posts = new Posts (req.body)
posts.save()
.then((post)=>{
res.json({post})
})
}

exports.getAllPosts=(req,res,next)=>{
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
exports.deletePosts=(req,res,next)=>{
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
exports.updatePost=(req,res,next)=>{
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