import express from "express";
import { authentication, authorized } from "../middlewares/authentication.js";
import {
  getUserOrders,
  checkoutOrder,
} from "../controllers/ordersControllers.js";

export const router = express.Router();

router.use(authentication);
router.get("/myOrders", authorized("customer"), getUserOrders);
router.post("/myOrders/checkout", authorized("customer"), checkoutOrder);
