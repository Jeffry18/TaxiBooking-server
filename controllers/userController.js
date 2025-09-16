const users = require('../models/userModel')
const jwt = require('jsonwebtoken')



exports.registerController = async (req, res) => {
  console.log("inside register controller");
  console.log(req.body);
  const { username, email, password } = req.body
  try {
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      res.status(406).json("Already Existing User.. please Login!!!")
    } else {
      const newUser = new users({
        username, email, password
      })
      await newUser.save()
      res.status(200).json(newUser)
    }

  } catch (err) {
    res.status(401).json(err)
  }



}

// loigin


// login
exports.loginController = async (req, res) => {
  console.log("inside login controller");
  const { email, password } = req.body;

  try {
    // ✅ Admin login check
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Find admin in DB
      let adminUser = await users.findOne({ email: process.env.ADMIN_EMAIL });

      // If not found, you can auto-create one
      if (!adminUser) {
        adminUser = new users({
          username: "Admin",
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD, // hash if you use bcrypt
        });
        await adminUser.save();
      }

      // Generate token with real MongoDB _id
      const token = jwt.sign(
        { userId: adminUser._id, role: "admin" },
        process.env.JWTPASSWORD
      );

      return res.status(200).json({
        user: {
          _id: adminUser._id,
          username: adminUser.username,
          email: adminUser.email,
          role: "admin",
        },
        token,
      });
    }

    // ✅ Normal user login
    const existingUser = await users.findOne({ email, password });

    if (existingUser) {
      const token = jwt.sign(
        { userId: existingUser._id, role: "user" },
        process.env.JWTPASSWORD

      );
      return res.status(200).json({
        user: {
          _id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
          role: "user",
        },
        token,
      });
    }

    // ❌ If no match
    return res.status(404).json("Incorrect email/password");
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json("Server error");
  }
};
