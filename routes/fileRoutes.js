const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadFile,
  getFiles,
} = require("../controllers/fileController");

router.post(
  "/",
  upload.single("file"),
  uploadFile
);

router.get("/", getFiles);

module.exports = router;