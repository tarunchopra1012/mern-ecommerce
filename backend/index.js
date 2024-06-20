const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const { modifyResponse } = require("./interceptors/responseInterceptor");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(modifyResponse);
app.use("/api/products", productRoutes);

const port = 4000;
mongoose
  .connect("mongodb://127.0.0.1:27017/ECommerce")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
