import express from "express";
import {
  getAllProducts,
  getProductByName,
  addNewProduct,
} from "../controllers/productsControllers.js";

export const router = express.Router();

// endpoint to get all products (resigtered & unristered)
router.get("/", getAllProducts);
router.post("/", addNewProduct);

router.get("/search", getProductByName);
