const express = require("express");
const { createBlog, getAllBlog } = require("../controller/blog");
const router = express.Router();

/*router.use((req, res, next) => {
  console.log("thus time is", 15);
  next();
});*/

// POST some data to db
router.post("/", createBlog);

// GET some data from db
router.get("/", getAllBlog);

module.exports = router;
