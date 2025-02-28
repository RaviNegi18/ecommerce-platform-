import Admin from "../models/adminModel.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const registerAdmin = async (req, res) => {
  const { userName, email, password, role } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      userName,
      email,
      password: hashedPassword,
      role: role || "admin",
    });

    await newAdmin.save();

    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const token = jwt.sign(
      { adminId: newAdmin._id, role: newAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: newAdmin._id,
        userName: newAdmin.userName,
        email: newAdmin.email,
        role: newAdmin.role,
      },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering admin", error: error.message });
  }
};

// Login admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      admin: {
        id: admin._id,
        userName: admin.userName,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Get all admins (only for super admin)
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching admins", error: error.message });
  }
};

// Get admin details by ID
const getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching admin", error: error.message });
  }
};

//Get aall users

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    // Even if users is an empty array, that's a valid response.
    res.status(200).json(users);
  } catch (error) {
    console.error(
      "Error in getting the details about users in admin controller",
      error.message
    );
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Get a single user
const getUserById = async (req, res) => {
  const { id } = req.params; // Changed to req.params for clarity
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getting a user", error.message);
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// Edit user by ID
const updateUserById = async (req, res) => {
  const { id } = req.params;
  try {
    // Use findByIdAndUpdate for clarity and correct filtering; the first argument is the id.
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "No user found!" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating the data", error.message);
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "No user found" });
    }
    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user", error.message);
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

export {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
};
