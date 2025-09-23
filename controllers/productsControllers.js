import { productModel } from "../models/productsModel.js";

// Get all products controller
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res
      .status(200)
      .json({ status: "succuss", length: products.length, data: { products } });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// get product by name / seller name TODO
const getProductByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json({ status: "failed", message: "Please provide a product name" });
    }

    // لو عايز تجيب أكتر من منتج متشابه في الاسم
    const products = await productModel.find({
      name: { $regex: name, $options: "i" }, // i = case-insensitive
    });

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "Product not found" });
    }

    res.status(200).json({ status: "success", data: { products } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
