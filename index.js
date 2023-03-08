const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const blog = require("./src/routes/blog.js");

const app = express();
const router = express.Router();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

app.use("/blog", blog);

app.use("/", (req, res) => {
  console.log("it will use this response");
  res.status("404");
  res.send("<h1>page is not found</h1>");
});

app.listen(port, () => {
  console.log("app is running on port " + port);
});
