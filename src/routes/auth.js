const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controller/authController");

const optionPassword = {
  minLength: 8,
};

router.post(
  "/register",
  body("email").isEmail(),
  body("email").isLength({ min: 15 }),
  body("password").isLength({ min: 5 }),
  authController.register
);

module.exports = router;
