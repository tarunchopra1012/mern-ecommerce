import EventEmitter from "events";
class ProductEventEmitter extends EventEmitter {}
const productEmitter = new ProductEventEmitter();

// Subscribe to an event
productEmitter.on("newProduct", (product) => {
  console.log("New product added:", product.title);
});

module.exports = productEmitter;
