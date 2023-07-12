const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
  res.json("test is working");
};

// Register Endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if name was entered
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    // Check is password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }
    // Check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is taken already",
      });
    }

    const hashedPassword = await hashPassword(password);
    // Create user in database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

// Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    // Check if password match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) {
            console.log(err);
            res.json({ error: "Error signing JWT" });
          } else {
            try {
              const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
              res.cookie("token", token, { expires: expiryDate }).json(user);
            } catch (error) {
              console.log(error);
            }
          }
        }
      );
    }
    if (!match) {
      res.json({
        error: "Passwords do not match",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Profile Endpoint
const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

// Logout Endpoint
const logoutUser = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully." });
  } else {
    return res.json({
      error: "You are not logged in.",
    });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
};
