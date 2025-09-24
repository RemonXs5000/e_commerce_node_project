import { userModel } from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register new user
export const registerUser = async (req, res) => {
  try {
    const newUserData = req.body;
    if (!newUserData || Object.keys(newUserData).length === 0) {
      return res
        .status(400)
        .json({ status: "failed", message: "user details not provided" });
    }

    const newUser = await userModel.create(newUserData);

    return res.status(201).json({ status: "succuss", data: { newUser } });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err });
  }
};

// login Existing user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email not Provided" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ status: "failed", message: "Password not Provided" });
    }

    const userData = await userModel.findOne({ email });
    if (!userData) {
      return res.status(400).json({
        status: "failed",
        message: "Not such User, check your credentials",
      });
    }

    // checking the Password in DB with the provided password
    const isValidPassword = await bcrypt.compare(password, userData.password);

    if (!isValidPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Password not correct, check your credentials",
      });
    }
    // sending token back to user
    console.log(process.env.PRIVATE_KEY);
    const token = jwt.sign(
      {
        _id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
      process.env.PRIVATE_KEY,
      { expiresIn: "7h" }
    );
    return res.status(200).json({ status: "success", data: { token } });
  } catch (err) {
    return res.status(500).json({ status: "failed", message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.currentuser;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Old password isn't provided",
      });
    }

    if (!newPassword) {
      return res.status(400).json({
        status: "failed",
        message: "New password isn't provided",
      });
    }

    // getting the currently saved password from DB
    const { password: currentSavedPassword } = await userModel.findOne({
      email,
    });

    const isValidPassword = await bcrypt.compare(
      oldPassword,
      currentSavedPassword
    );
    if (!isValidPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid password, check your credentials",
      });
    }

    // hashing the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await userModel.updateOne({ email }, { password: hashedPassword });

    return res.status(200).json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong while resetting password",
    });
  }
};
