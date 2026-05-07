const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const File = require("./models/File");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/files", fileRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server Running");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});