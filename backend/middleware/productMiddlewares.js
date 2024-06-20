const { validateProduct, validate } = require("../validators/productValidator");
const checkProductExists = require("./checkProductExists");

const productPreprocessing = [checkProductExists, validateProduct, validate];

module.exports = productPreprocessing;
