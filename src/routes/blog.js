const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const blogController = require("../controller/blog");

/*router.use((req, res, next) => {
  console.log("thus time is", 15);
  next();
});*/

// POST some data to db
router.post(
  "/post",
  body("title")
    .exists()
    .withMessage("harus menyertai title")
    .isLength({ min: 3 })
    .withMessage("title minimal harus 3 karakter"),
  body("article").isLength({ min: 3 }).withMessage("article harus diisikan"),
  blogController.createBlog
);

// GET some data from db
router.get("/", blogController.getAllBlog);

module.exports = router;
