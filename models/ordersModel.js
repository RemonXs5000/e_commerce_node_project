import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: [true, "cartId is required"],
    },
    orderTotal: {
      type: Number,
      required: [true, "Order total is required"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "canceled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
    },
  },
  { timestamps: true }
);

export const ordersModel = mongoose.model("Order", orderSchema);
