import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Product } from "./models/product.js";

// MongoDB connection string
const mongoURI = "mongodb://localhost:27017/ECommerce";

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function insertProductsInBatches(batchSize, batches) {
  for (let batch = 0; batch < batches; batch++) {
    const products = [];
    for (let i = 0; i < batchSize; i++) {
      // Generate an array of 1 to 3 image URLs
      const thumbnails = Array.from(
        { length: faker.number.int({ min: 1, max: 3 }) },
        () => faker.image.url()
      );

      products.push({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        discountPercentage: faker.number.float({
          multipleOf: 0.01,
          min: 0,
          max: 30,
        }),
        rating: faker.number.float({ multipleOf: 0.1, min: 0, max: 5 }),
        stock: faker.number.int({ min: 10, max: 100 }),
        brand: faker.company.name(),
        category: faker.commerce.department(),
        mainImage: faker.image.url(),
        thumbnails: thumbnails,
      });
    }

    try {
      await Product.insertMany(products);
      console.log(`Batch ${batch + 1} inserted`);
    } catch (error) {
      console.error("Error inserting products:", error);
    }
  }
  mongoose.disconnect();
}

insertProductsInBatches(5, 2);
