const User = require('../model/user')
exports.userById =(req,res,next,id)=>{
   User.findOne(id).exec((err,user)=>{
       if(err || !user){
           return res.status(400).json({error:"user not found "})
       }
       req.profile = user;
   })
   next()
}
exports.hasAuthorization =(req,res)=>{
    const authorized =req.profile&&req.auth &&req.profile._id ===req.auth._id;
    if(!authorized){
        return res.status(403).json({error:"user is not authorized to perform this action"})
    }
}
exports.allUsers=(req,res,next)=>{
    User.find((err,user)=>{
        if(err){
            return res.status(400).json({error:err})

        }
        res.json({user})
    }).select('name email created ')
}