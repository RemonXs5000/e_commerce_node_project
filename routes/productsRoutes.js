import express from "express";
import {
  getAllProducts,
  getProductByName,
  addNewProduct,
  getMyProducts,
  deleteProduct,
  // updateProduct,
} from "../controllers/productsControllers.js";
import { authentication, authorized } from "../middlewares/authentication.js";

export const router = express.Router();

// endpoint to get all products (resigtered & unristered)
router.get("/", getAllProducts);
router.use(authentication);

// endpoint to get all products (resigtered user only)
router.get("/myProducts", authorized("seller"), getMyProducts);
router.post("/myProducts", authorized("seller"), addNewProduct);
router.delete("/myProducts/:id", authorized("seller"), deleteProduct);
// router.patch("/myProducts", authorized("seller"), updateProduct);

router.get("/search", authorized("customer,seller,admin"), getProductByName);
