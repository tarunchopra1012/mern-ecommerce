import mongoose from "mongoose";
import { nanoid } from "nanoid";

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    default: () => nanoid(10), // Generate a Nano ID of 10 characters by default
  },
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  thumbnails: {
    type: [String], // This makes `images` an array of strings
    required: true,
  },
});

// Custom index creation on `_id` is not needed as it's automatically indexed by MongoDB
// productSchema.index({ _id: 1 }, { unique: true });

const Product = mongoose.model("Product", productSchema);

export { Product };
