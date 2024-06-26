const { check, oneOf, validationResult } = require("express-validator");

const validateProduct = [
  check("data.title").not().isEmpty().withMessage("Title is required"),
  check("data.description")
    .not()
    .isEmpty()
    .withMessage("Description is required"),
  check("data.price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  check("data.discountPercentage")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount percentage must be between 0 and 100"),
  check("data.rating")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),
  check("data.stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  check("data.brand").not().isEmpty().withMessage("Brand is required"),
  check("data.category").not().isEmpty().withMessage("Category is required"),
  check("data.thumbnail")
    .not()
    .isEmpty()
    .withMessage("Thumbnail URL is required"),
  check("data.images").not().isEmpty().withMessage("Images URL is required"),
];

const validateProductPartial = [
  oneOf([
    check("data.title")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Title is required"),
    check("description")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Description is required"),
    check("data.price")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    check("data.discountPercentage")
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage("Discount percentage must be between 0 and 100"),
    check("data.rating")
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),
    check("data.stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer"),
    check("data.brand")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Brand is required"),
    check("data.category")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Category is required"),
    check("data.thumbnail")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Thumbnail URL is required"),
    check("data.images")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Images URL is required"),
  ]),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validatePartial = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateProduct,
  validateProductPartial,
  validate,
  validatePartial,
};
