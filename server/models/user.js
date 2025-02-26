import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: [true, "userName must be provided"] },
  email: {
    type: String,
    required: [true, "email must be provided"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password must be provided"],
    validate: {
      validator: function (value) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value);
      },
      message:
        "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: [true, "please select a role"],
  },
  profilePic: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
