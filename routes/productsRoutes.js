import express from "express";

const router = express.Router();

// endpoint to get all products (resigtered & unristered)
router.get("/", (req, res) => {
  res.status(200).json({ status: "success", data: "products" });
});
