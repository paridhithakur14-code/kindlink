const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ==========================================
// GENERATE JWT TOKEN
// ==========================================

const generateToken = (id) => {

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

};


// ==========================================
// REGISTER USER
// ==========================================

const registerUser = async (req, res) => {

  try {

    // Get data from frontend
    const {
      name,
      email,
      password,
      phone,
      city,
      interests
    } = req.body;


    // ======================================
    // VALIDATION
    // ======================================

    if (!name || !email || !password) {

      return res.status(400).json({

        success: false,

        message:
          "Please provide name, email and password",

      });

    }


    // ======================================
    // CHECK IF USER ALREADY EXISTS
    // ======================================

    const existingUser =
      await User.findOne({
        email: email.toLowerCase()
      });


    if (existingUser) {

      return res.status(400).json({

        success: false,

        message:
          "User already exists",

      });

    }


    // ======================================
    // HASH PASSWORD
    // ======================================

    const salt =
      await bcrypt.genSalt(10);


    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );


    // ======================================
    // CREATE USER IN MONGODB
    // ======================================

    const user =
      await User.create({

        name,

        email:
          email.toLowerCase(),

        password:
          hashedPassword,

        phone,

        city:
          city || "",

        interests:
          interests || []

      });


    // ======================================
    // REGISTRATION SUCCESS
    // ======================================

    res.status(201).json({

      success: true,

      message:
        "User registered successfully",

      token:
        generateToken(user._id),

      user: {

        id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        phone:
          user.phone,

        city:
          user.city,

        interests:
          user.interests,

        role:
          user.role

      }

    });


  } catch (error) {

    console.error(
      "Registration Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Server error",

    });

  }

};


// ==========================================
// LOGIN USER
// ==========================================

const loginUser = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    // ======================================
    // VALIDATION
    // ======================================

    if (!email || !password) {

      return res.status(400).json({

        success: false,

        message:
          "Please provide email and password",

      });

    }


    // ======================================
    // FIND USER
    // ======================================

    const user =
      await User.findOne({

        email:
          email.toLowerCase()

      });


    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password",

      });

    }


    // ======================================
    // CHECK PASSWORD
    // ======================================

    const isPasswordCorrect =
      await bcrypt.compare(

        password,

        user.password

      );


    if (!isPasswordCorrect) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password",

      });

    }


    // ======================================
    // LOGIN SUCCESS
    // ======================================

    res.status(200).json({

      success: true,

      message:
        "Login successful",

      token:
        generateToken(user._id),

      user: {

        id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        phone:
          user.phone,

        city:
          user.city,

        interests:
          user.interests,

        role:
          user.role

      }

    });


  } catch (error) {

    console.error(
      "Login Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Server error",

    });

  }

};


// ==========================================
// EXPORT CONTROLLERS
// ==========================================

module.exports = {

  registerUser,

  loginUser

};