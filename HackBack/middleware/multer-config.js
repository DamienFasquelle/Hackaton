const multer = require("multer");

const MIME_TYPES = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = MIME_TYPES[file.mimetype];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + fileExtension);
  },
});

const fileFilter = function (req, file, cb) {
  if (MIME_TYPES[file.mimetype]) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG and PNG files are allowed."),
      false
    );
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
