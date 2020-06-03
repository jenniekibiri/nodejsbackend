const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
exports.signin = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                message: "email doesnt exist"

            })
        }

        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
              if(!result){
                res.json({
                    
                    message:"password doesnt match"

                })
              }else{
                  const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
                  res.cookie("t",token,{expire:new Date() + 9999 })
                  const {_id,name,email}=user;
                  return res.json({token,user:{_id,email,name}})
              }
            })
        }



    })
}
