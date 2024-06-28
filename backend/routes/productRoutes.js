import express from "express";
const router = express.Router();
import {
  createProduct,
  getProductList,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import { handleUpload } from "../middleware/upload.js";

import {
  validateProduct,
  validate,
  validateProductPartial,
  validatePartial,
} from "../validators/productValidator.js";

import checkProductExists from "../middleware/checkProductExists.js";

router.post(
  "/create",
  handleUpload,
  validateProduct,
  validate,
  async (req, res) => {
    // Prepare product data
    const productData = {
      ...req.body,
      mainImage: req.files.mainImage ? req.files.mainImage[0].path : "",
      thumbnails: req.body.thumbnails,
    };

    console.log("Product Data:", productData);

    try {
      const product = await createProduct(productData);
      res.status(200).send("Product saved to the database!");
    } catch (error) {
      console.error("Product Creation Error:", error);
      res.status(500).json({ error: "Failed to save product to the database" });
    }
  }
);

router.get("/read", async (req, res) => {
  const products = await getProductList();
  res.json(products);
});

router.patch(
  "/update/:id",
  [checkProductExists, validateProductPartial, validatePartial],
  async (req, res) => {
    try {
      const updatedProduct = await updateProduct(req.params.id, req.body);
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }
);

router.delete("/delete/:id", checkProductExists, async (req, res) => {
  await deleteProduct(req.params.id);
  res.send("Product deleted!");
});

export default router;
