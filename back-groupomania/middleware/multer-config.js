const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(".")[0].split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    mimeTypeIsValid(extension, req);
    const finalFilename = name + "_" + Date.now() + "." + extension;
    req.body.finalFileName = finalFilename;
    callback(null, finalFilename);
  },
});

module.exports = multer({ storage: storage }).single("image");

const mimeTypeIsValid = (ext, req) => {
  if (ext != "jpg" && ext != "jpeg" && ext != "png" && ext != "gif") {
    req.body.errorMessage = "Le format de l'image n'est pas valide!";
  }
};
