import { ordersModel } from "../models/ordersModel.js";
import { cartModel } from "../models/cartModel.js";
import mongoose from "mongoose";

// getting the currently logged-user Orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.currentuser._id;
    const orders = await ordersModel.find({ userId });
    if (!orders) {
      return res.status(404).json({
        status: "Failed",
        message: "No orders Found , Start Shopping",
      });
    }
    return res
      .status(200)
      .json({ status: "success", results: orders.length, data: { orders } });
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};

export const checkoutOrder = async (req, res) => {
  try {
    const userId = req.currentuser._id;

    //  Check if user has a cart
    const cart = await cartModel
      .findOne({ userId })
      .populate("products.productId");
    if (!cart) {
      return res.status(404).json({
        status: "failed",
        message: "No cart found for this user",
      });
    }

    //  Calculate total order price
    const orderTotal = cart.products.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);

    //  Create order
    const order = await ordersModel.create({
      userId,
      cartId: cart._id,
      orderTotal,
      status: "pending",
      paymentMethod: req.body.paymentMethod || "cash",
    });

    // Delete the cart after checkout
    await cartModel.deleteOne({ _id: cart._id });

    return res.status(201).json({
      status: "success",
      message: "Order placed successfully",
      data: { order },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
