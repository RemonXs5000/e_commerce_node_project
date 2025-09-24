import express from "express";
import {
  registerUser,
  loginUser,
  resetPassword,
} from "../controllers/usersControllers.js";
import { authentication, authorized } from "../middlewares/authentication.js";

export const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.use(authentication);
// only registered users can reset their passwords
router.post("/resetPassword", resetPassword);
