const { Product } = require("../models/products");

async function createProduct(data) {
  const product = new Product(data.data);
  await Product.create(product);
  return product;
}

async function getProductList() {
  return await Product.find().limit(20);
}

async function updateProduct(id, data) {
  const product = await Product.findById(id);
  if (!product) {
    return null;
  }

  for (const key in data) {
    if (data.hasOwnProperty(key) && product[key] !== undefined) {
      product[key] = data[key];
    }
  }

  await product.save();
  return product;
}

async function deleteProduct(id) {
  await Product.findByIdAndDelete(id);
}

module.exports = {
  createProduct,
  getProductList,
  updateProduct,
  deleteProduct,
};
