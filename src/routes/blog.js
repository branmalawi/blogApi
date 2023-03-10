const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const blogController = require("../controller/blog");

// router handler POST http request
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

// router handler GET http request (get all data)
router.get("/", blogController.getAllBlog);

// router handler GET http request (get detail data)
router.get("/:id", blogController.getBlog);

// router handler UPDATE http request (update sole data)
router.put(
  "/:id",
  body("title")
    .isLength({ min: 3 })
    .withMessage("title minimal harus 3 karakter"),
  body("article").isLength({ min: 3 }).withMessage("article harus diisikan"),
  blogController.updateBlog
);

module.exports = router;
