const User = require('../model/post')

exports.signup= async(req,res,next)=>{
   const userExists= await User.findOne({email:req.body.email})
   if(userExists)
   return res.status(403).json({
error:"email is already taken Login!"
   })
   const user = await new User (req.body)
   user.save()
   res.status(200).json({
      user 
   })
}