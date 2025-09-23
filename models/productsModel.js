import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
      trim: true,
      minlength: [5, "product name must be at least 5 characters"],
      maxlength: [40, "product name must be at most 40 characters"],
      unique: true,
    },
    disc: {
      type: String,
      required: [true, "product description is required"],
      trim: true,
      minlength: [5, "product description must be at least 5 characters"],
    },
    image: {
      type: String,
      required: [true, "image URL is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "sellerId is required"],
    },
  },
  { timestamps: true }
);

export const productModel = mongoose.model("Product", productSchema);
