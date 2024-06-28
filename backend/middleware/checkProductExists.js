import { Product } from "../models/product.js";
import mongoose from "mongoose";

async function checkProductExists(req, res, next) {
  const id = req.params.id;

  // Check if the id is a valid ObjectId
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ message: "Invalid product ID format" });
  // }

  // Proceed to check if the product actually exists
  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      req.product = product;
      next();
    })
    .catch((err) => {
      console.error("Error during product fetch:", err);
      res.status(500).json({ message: "Error fetching product" });
    });
}

export default checkProductExists;
