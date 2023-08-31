// Modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

// Imports
const User = require('../../../models/user');

const login = async (req, role, res) => {
  try {
    let { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return the validation errors
      return res.status(403).json({
        message: errors.array()[0].msg,
        success: false,
      });
    }
    // First Check if the username or email is in the database

    let user  = await User.findOne({ email });;

    if (!user) {
      return res.status(404).json({
        message: 'Username is not found. Invalid login credentials.',
        success: false,
      });
    }

    // We will check the role
    if (user.role !== role) {
      return res.status(403).json({
        message: 'Please make sure this is your identity.',
        success: false,
      });
    }

    // That means user is existing and trying to signin from the right portal
    // Now check for the password
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Sign in the token and issue it to the user
      let token = jwt.sign(
        {
          user_id: user._id,
          role: user.role,
          username: user.username,
          email: user.email,
        },
        process.env.SECRET,
        { expiresIn: '7 days' }
      );

      let result = {
        username: user.userName,
        role: user.role,
        email: user.email,
        token: `Bearer ${token}`,
        expiresIn: process.env.TOKEN_EXPIRATION,
      };

      return res.status(200).json({
        ...result,
        message: 'You are successfully logged in.',
        success: true,
      });
    } else {
      return res.status(403).json({
        message: 'Incorrect password.',
        success: false,
      });
    }
  } catch (err) {
    console.log(err);
    let errorMsg = 'Oops! Something went wrong.';
    return res.status(500).json({
      message: errorMsg,
      success: false,
    });
  }
};

module.exports = login;