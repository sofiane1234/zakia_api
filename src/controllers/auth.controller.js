const User = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    email: req.body.email
  });
  
  try {
    const newUserToSave = await newUser.save();
    let userToken = jwt.sign({
        id: newUserToSave._id,
        isAdmin: newUserToSave.isAdmin
      }, process.env.JWT_SECRET
    )
    return res.send({
      success:true,
      message: "User logged",
      auth: true,
      token: userToken
    })
  }

  catch(err) {
    next(err);
  }

}

exports.login = async (req, res, next) => {
  try {
    const userLogged = await User.findOne({ email: req.body.email });
    console.log(userLogged);
    if (!userLogged) {
        const error = new Error("user not found")
        error.status = 404
        throw error;
      }
    let passwordValid = bcrypt.compareSync(req.body.password, userLogged.password);
      if (!passwordValid) {
        const error = new Error("password not valid")
        error.status = 401
        throw error;
      }
      let userToken = jwt.sign({
        id: userLogged._id,
        isAdmin: userLogged.isAdmin
        },process.env.JWT_SECRET
      )
    return res.send({
        success: true,
        message: "User logged",
        auth: true,
        token:userToken
      })
  }
  catch (err) {
    next(err);
  }
}