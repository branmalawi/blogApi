const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const blog = require("./src/routes/blog.js");
const auth = require("./src/routes/auth.js");

// express setup
const app = express();
const router = express.Router();
const port = 8080;

// middleware allow permission to access file images
app.use("/images", express.static("images"));

// middleware to handle auto parse string to json
app.use(bodyParser.json());

// middleware to handle cors problem
app.use(cors());

// multer setup
// multer storage logic
const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
    const extention = path.extname(file.originalname);
    cb(null, "IMG_" + uniqueSuffix + extention);
  },
});

// multer filter file logic
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    console.log("file salah");
  }
};

// multer inisialisation
const uploadImage = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, //2mb
});

// multer handle when upload file
app.use(uploadImage.single("image"));

// middleware handler req to blog
app.use("/v1/blog", blog);

// middleware handler req to auth
app.use("/v1/auth", auth);

// middleware handler all undefined req location
app.use("/", (req, res) => {
  console.log("it will use this response");
  res.status(404);
  res.send("<h1>page is not found</h1>");
});

// middleware handler all error
app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || err instanceof multer.MulterError ? 400 : 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({ message, data });
});

// mongoose setup
mongoose
  .connect(
    "mongodb+srv://branmalawi:XkyHCPlYgFME63MZ@cluster0.hioihgn.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log("app is running on port " + port);
    });
    console.log("Connected to database");
  })
  .catch((err) => console.log(err));
