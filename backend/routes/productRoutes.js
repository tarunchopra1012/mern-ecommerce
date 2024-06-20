const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

const {
  validateProduct,
  validate,
  validateProductPartial,
  validatePartial,
} = require("../validators/productValidator");

const checkProductExists = require("../middleware/checkProductExists");

router.post("/create", validateProduct, validate, async (req, res) => {
  const product = await productController.createProduct(req.body);
  res.json(product);
});

router.get("/read", async (req, res) => {
  const products = await productController.getProductList();
  res.json(products);
});

router.patch(
  "/update/:id",
  [checkProductExists, validateProductPartial, validatePartial],
  async (req, res) => {
    try {
      const updatedProduct = await productController.updateProduct(
        req.params.id,
        req.body
      );
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ status: 500, error: error.message });
    }
  }
);

router.delete("/delete/:id", checkProductExists, async (req, res) => {
  await productController.deleteProduct(req.params.id);
  res.send("Product deleted!");
});

module.exports = router;
