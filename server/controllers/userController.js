require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, profilePic, role } = req.body;

  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Check if user already exists
  let user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  user = new User({
    userName,
    email,
    password: hashedPassword,
    role: role || "user",
    profilePic: profilePic || "",
  });

  await user.save();

  res.status(200).json({
    id: user._id,
    userName: user.userName,
    email: user.email,
    role: user.role,
    profilePic: user.profilePic,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required!");
  }

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  // Compare Password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.SECRET_KEY || "314EE7C8CDC5A8F6D9F5C1E1DFE2F",
    {
      expiresIn: "7d",
    }
  );

  res.status(201).json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      userName: user.userName,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
    },
  });
});

module.exports = { registerUser, loginUser };
