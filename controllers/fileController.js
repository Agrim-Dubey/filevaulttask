const File = require("../models/File");
const fs = require("fs");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const newFile = await File.create({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (error) {
    // Handle multer-specific errors
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File too large. Maximum size is 10MB",
      });
    }

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({
      createdAt: -1,
    });

    res.status(200).json(files);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        message: "File not found",
      });
    }

    // Use async unlink; ignore error if file already removed from disk
    try {
      await fs.promises.unlink(file.path);
    } catch (unlinkErr) {
      if (unlinkErr.code !== "ENOENT") throw unlinkErr;
    }

    await File.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "File deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  uploadFile,
  getFiles,
  deleteFile,
};