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
export const getProductByName = async (req, res) => {
  try {
    // getting the querystring provided by user
    const { name } = req.query;

    if (!name) {
      return res
        .status(400)
        .json({ status: "failed", message: "Please provide a product name" });
    }
    // search for the products the have the same regex
    const products = await productModel.find({
      name: { $regex: name, $options: "i" }, // i = case-insensitive
    });

    console.log(products);

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

// add new Product (restricted to user with rule seller)
export const addNewProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    // check if user ddn't provide product details
    if (!newProduct || Object.keys(newProduct).length === 0) {
      return res
        .status(400)
        .json({ status: "failed", message: "product details not provided" });
    }
    const product = await productModel.create(newProduct);
    res.status(201).json({ status: "success", data: { product } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};
