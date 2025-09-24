import { cartModel } from "../models/cartModel.js";

export const getUserCart = async (req, res) => {
  try {
    const userId = req.currentuser._id;
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        status: "Failed",
        message: "No cart Found, Start Adding Products",
      });
    }
    return res.status(200).json({ status: "success", data: { cart } });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const userId = req.currentuser._id;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({
        status: "failed",
        message: "productId is required",
      });
    }
    // search for exicting cart
    let cart = await cartModel.findOne({ userId });

    if (!cart) {
      // if no cart found
      const newDocument = {
        userId,
        products: [{ productId, quantity }],
      };
      cart = await cartModel.create(newDocument);

      return res.status(201).json({
        status: "success",
        message: "Cart created and product added",
        data: cart,
      });
    } else {
      // if cart found
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      await cart.save();

      return res.status(200).json({
        status: "success",
        message: "Product added to cart",
        data: cart,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
