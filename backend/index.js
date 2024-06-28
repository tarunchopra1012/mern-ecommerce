import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes.js";
// import modifyResponse from "../interceptors/responseInterceptor.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(modifyResponse);

app.use("/uploads", express.static("./uploads"));
app.use("/api/products", productRoutes);

const port = 4000;
mongoose
  .connect("mongodb://127.0.0.1:27017/ECommerce")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
