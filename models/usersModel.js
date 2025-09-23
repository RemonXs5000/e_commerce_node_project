import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    minlength: [3, "Username must be at least 3 characters"],
    maxlength: [20, "Username must be at most 40 characters"],
  },
  email: {
    type: String,
    required: [true, "user Email is required"],
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [5, "Password must be at least 5 characters"],
    maxlength: [25, "Password must be at most 25 characters"],
  },
  role: {
    type: String,
    default: "customer",
    enum: {
      values: ["customer", "seller", "admin"],
      message: "Role must be either: customer, seller, or admin",
    },
  },
});

export const userModel = mongoose.model("User", userSchema);
