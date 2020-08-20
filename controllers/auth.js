/* eslint-disable no-underscore-dangle */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");
const User = require("../model/user");
exports.socialLogin = (req, res) => {
  let user = User.findOne({ email: req.body }, (err, user) => {
    if (err || !user) {
      user = new User(req.body);
      req.body = user;
      user.save();
      const token = jwt.sign(
        { _id: user._id, iss: "NODEAPI" },
        process.env.JWT_SECRET
      );
      res.cookie("t", token, { expire: new Date() + 9999 });
      const { _id, name, email } = user;
      return res.json({ token, user: { _id, name, email } });
    } else {
      // update existing user with new social info and login
      req.profile = user;
      user = _.extend(user, req.body);
      user.updated = Date.now();
      user.save();
      // generate a token with user id and secret
      const token = jwt.sign(
        { _id: user._id, iss: "NODEAPI" },
        process.env.JWT_SECRET
      );
      res.cookie("t", token, { expire: new Date() + 9999 });
      // return response with user and token to frontend client
      const { _id, name, email } = user;
      return res.json({ token, user: { _id, name, email } });
    }
  });
};

exports.signup = async (req, res, next) => {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(403).json({
      error: "email is already taken Login!",
    });
  }

  bcrypt.hash(req.body.password, 10).then((hash) => {
    req.body.password = hash;
    const user = new User(req.body);
    user
      .save()
      .then(() => {
        res.json({
          message: "User added successfully!",
          user,
        });
      })
      .catch((error) => {
        res.json({
          error,
        });
      });
  });
};
exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        message: "email doesnt exist",
      });
    }

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (!result) {
          res.json({
            message: "password doesnt match",
          });
        } else {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
          res.cookie("t", token, { expire: new Date() + 9999 });
          const { _id, name } = user;
          return res.json({ token, user: { _id, email, name } });
        }
      });
    }
  });
};
exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "signout success" });
};
exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],

  userProperty: "auth",
});
