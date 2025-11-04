const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/generateToken');

module.exports.registerUser =  async (req, res) => {
  try {
    let { email, fullname, password } = req.body;

    let user = await userModel.findOne({email:email});
    if(user) return res.status(401).send("you already have an account for this email ,Please Login!");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.send(err.message);
        } else {
          const createdUser = await userModel.create({
            email,
            fullname,
            password:hash,
          });
          let token = generateToken(createdUser)
          res.cookie("token",token);
          res.send('user created succefully ');
        }
      });
    });
  } catch (err) {
    res.send(err.message);
  }
};


module.exports.loginUser = async function(req, res) {
  try {
    let { email, password } = req.body;

    // Debug logging
    console.log("Login attempt:");
    console.log("Email:", email);
    console.log("Password received:", password ? "Yes" : "No");
    console.log("Password length:", password ? password.length : "undefined");

    if (!email || !password) {
      return res.status(400).send("Email and password are required!");
    }

    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).send("No such account exists with this email, try signing up first!");
    }

  

    if (!user.password) {
      return res.status(500).send("User password hash is missing from database!");
    }

    bcrypt.compare(password, user.password, function(err, result) {
      if (err) {
        console.log("Bcrypt compare error:", err);
        return res.status(500).send("Error during password comparison: " + err.message);
      }
      
      if (result) {
        // Password is correct
        let token = generateToken(user);
        res.cookie("token", token);
        res.status(200).render('index');
      } else {
        // Password is incorrect
        res.status(401).send("Incorrect password!");
      }
    });
  } catch (err) {
    console.log("Login function error:", err);
    res.status(500).send("Server error: " + err.message);
  }
};

module.exports.logoutUser = function(req, res) {
  res.cookie("token", "");
  res.redirect("/");
};
