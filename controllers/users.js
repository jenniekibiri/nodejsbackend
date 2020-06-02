
const User = require('../model/user')
const bcrypt = require('bcryptjs')
exports.signup =async (req, res, next) => {
   const userExists =await User.findOne({ email: req.body.email })
   if (userExists)
      return res.status(403).json({
         error: "email is already taken Login!"
      });

   bcrypt.hash(req.body.password, 10).then(
      (hash) => {
         req.body.password = hash;
         const user = new User(req.body);
         user.save()
            .then(() => {
                  res.json({
                     message: 'User added successfully!',
                     user

                  });
               }
            ).catch((error) => {
               res.json({
                  error
               })
            })
      }
   );
};