import express from "express";
import { authentication, authorized } from "../middlewares/authentication.js";
import {
  addProductToCart,
  getUserCart,
  updateProductQuantity,
  deleteProductFromCart,
} from "../controllers/cartControllers.js";

export const router = express.Router();

// access cart require Authentication
router.use(authentication);
router.get("/myCart", authorized("customer"), getUserCart);
router.post("/myCart", authorized("customer"), addProductToCart);
router.patch("/myCart:id", authorized("customer"), updateProductQuantity);
router.delete("/myCart:id", authorized("customer"), deleteProductFromCart);
