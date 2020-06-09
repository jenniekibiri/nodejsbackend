const Posts = require('../model/post')
const formidable= require('formidable')
const _=require('lodash')
const fs = require('fs')
exports.postById =(req,res,next,id)=>{
    Posts.findById(id)
.populate('postedBy','_id name')
.exec((err,post)=>{
    if(err || !post){
return res.status(400).json({
    error:err
})
    }
    req.post=post
    next();
})
}




exports.createPosts=(req,res,next)=>{
    let form = formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req,(err,fields,files)=>{
if(err){
    return res.status(400).json({
        error:'image could not be uploaded'
    })
}
let post = new Posts(fields)
req.profile.password= undefined

post.postedBy = req.profile
if(files.photo){
    post.photo.data=fs.readFileSync(files.photo.path);
    post.photo.contentType=files.photo.type;
}
post.save((err,result)=>{
    if(err){
        return res.status(400).json({ 
            error:err
        })
    }
    res.json(result)
})
    })

} 
 
exports.getAllPosts=(req,res,next)=>{
    Posts.find()
    .populate('postedBy','_id name')
    .select("_id title body")
    .then(posts=>{
        
        res.status(200).json({
            posts
        })
    })
    .catch((err)=>{
        res.status(400).json({
            message:err
                })
    })
    
}

exports.updatePost=(req,res,next)=>{
let post = req.post;
post =_.extend(post,req.body);
post.updated = Date.now();
post.save(err =>{
    if(err){
        return res.status(400).json({
            error:err
        })
    }
    res.json(post)
})
 
}
exports.postedByUser=(req,res)=>{
    Posts.find({postedBy:req.profile._id})
    .populate('postedBy','id name')
    .sort('_created')
    .exec((err,posts)=>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }res.json(posts)

    })
}

exports.deletePosts=(req,res,next)=>{
 let post = req.post;
  post.remove((err,post)=>{
     if(err){
         return res.status(400).json({
             error:err
         })
     }
     res.json({
         message:"post deleted succefully"
     })
 })

}
exports.isPoster = (req,res,next)=>{
    let poster =req.post&&req.auth&&req.post.postedBy._id == req.auth._id;
if(!poster){
    return res.status(403).json({
        error:"user is not authorized to delete"
    })
    
}
next()
}
exports.updatePost=(req,res,next)=>{
    let post = req.post;
    post =_.extend(post,req.body);
    post.updated = Date.now();
    post.save(err =>{
        if(err){
            return res.status(400).json({
                error:err
            })
        }
        res.json(post)
    })
     
    }