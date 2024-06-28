import { check, oneOf, validationResult } from "express-validator";

const validateProduct = [
  check("title").not().isEmpty().withMessage("Title is required"),
  check("description").not().isEmpty().withMessage("Description is required"),
  check("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  check("discountPercentage")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount percentage must be between 0 and 100"),
  check("rating")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),
  check("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  check("brand").not().isEmpty().withMessage("Brand is required"),
  check("category").not().isEmpty().withMessage("Category is required"),
  check("mainImage").notEmpty().withMessage("Main image URL is required"),
  check("thumbnails")
    .isArray({ min: 1 })
    .withMessage("At least one thumbnail URL is required")
    .custom((value) => {
      if (value.length > 3) {
        throw new Error("Cannot upload more than 3 thumbnails");
      }
      return true;
    }),
];

const validateProductPartial = [
  oneOf([
    check("title").optional().not().isEmpty().withMessage("Title is required"),
    check("description")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Description is required"),
    check("price")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    check("discountPercentage")
      .optional()
      .isFloat({ min: 0, max: 100 })
      .withMessage("Discount percentage must be between 0 and 100"),
    check("rating")
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),
    check("stock")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Stock must be a non-negative integer"),
    check("brand").optional().not().isEmpty().withMessage("Brand is required"),
    check("category")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Category is required"),
    check("thumbnail")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Thumbnail URL is required"),
    check("images")
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

export { validateProduct, validateProductPartial, validate, validatePartial };
