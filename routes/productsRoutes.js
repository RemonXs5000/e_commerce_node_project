import express from "express";
import {
  getAllProducts,
  getProductByName,
  addNewProduct,
} from "../controllers/productsControllers.js";
import { authentication } from "../middlewares/authentication.js";

export const router = express.Router();

// endpoint to get all products (resigtered & unristered)
router.get("/", getAllProducts);
router.use(authentication);

// endpoint to get all products (resigtered user only)
router.post("/", addNewProduct);
router.get("/search", getProductByName);
