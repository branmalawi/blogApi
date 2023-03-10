const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const mongoose = require("mongoose");
const blog = require("./src/routes/blog.js");
const auth = require("./src/routes/auth.js");

const app = express();
const router = express.Router();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

app.use("/v1/blog", blog);
app.use("/v1/auth", auth);

app.use("/", (req, res) => {
  console.log("it will use this response");
  res.status("404");
  res.send("<h1>page is not found</h1>");
});

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
