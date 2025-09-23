import express from "express";
import { getAllProducts } from "../controllers/productsControllers.js";

export const router = express.Router();

// endpoint to get all products (resigtered & unristered)
router.get("/", getAllProducts);
