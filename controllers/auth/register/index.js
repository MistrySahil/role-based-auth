// Modules
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

const User = require('../../../models/user');

const register = async (req, role, res) => {
  try {

    const {userName, email, password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return the validation errors
      console.log(errors.array()[0].msg);
      return res.status(403).json({ 
        message: errors.array()[0].msg,
        success: false,
      });
    }

    // Get the hashed password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // create a new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return res.status(201).json({
      message: 'You are successfully signed up.',
      success: true,
    });

  } catch (err) {
    let errorMsg = 'Unable to create your account.';
    return res.status(500).json({
      message: errorMsg,
      success: false,
    });
  }
};

module.exports = register;