import multer from "multer";
import path from "path";

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  },
});

const upload = multer({
  storage: imgconfig,
  limits: { fileSize: 1024 * 1024 * 100 }, // Limit file size to 5MB
  fileFilter: (req, file, callback) => {
    // Validate file types
    const allowedTypes = /jpeg|jpg|png|webp|gif/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = allowedTypes.test(file.mimetype);
    if (mimeType && extname) {
      callback(null, true);
    } else {
      callback("Give proper file format to upload"); // Error message for invalid file types
    }
  },
}).fields([
  { name: "mainImage", maxCount: 1 },
  { name: "thumbnails", maxCount: 3 },
]);

const handleUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).send("File upload error: " + err);
    }

    req.body.mainImage = req.files.mainImage ? req.files.mainImage[0].path : "";
    req.body.thumbnails = req.files.thumbnails
      ? req.files.thumbnails.map((file) => file.path)
      : [];

    next();
  });
};

export { handleUpload };
