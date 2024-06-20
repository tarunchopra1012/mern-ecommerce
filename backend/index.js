const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Product } = require("./Models/products");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 4000;

mongoose
  .connect("mongodb://127.0.0.1:27017/ECommerce")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Create the new product
app.post("/create", async (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
    images: req.body.images,
  });

  await Product.create(newProduct);
  res.send("Product saved to the database!");
});

//Get the all product list
app.get("/read", async (req, res) => {
  const productList = await Product.find();
  res.send(JSON.stringify(productList));
});

//Update a product based on the id
app.put("/update/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndUpdate(product_id, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    thumbnail: req.body.thumbnail,
    images: req.body.images,
  });

  res.send("Product updated successfully!");
});

//Delete a product based on the id
app.delete("/delete/:id", async (req, res) => {
  const product_id = req.params.id;
  await Product.findByIdAndDelete(product_id);
  res.send("Product deleted!");
});

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
