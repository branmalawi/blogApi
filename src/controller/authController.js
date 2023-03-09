const { validationResult } = require("express-validator");

exports.register = (req, res) => {
  const { username, email } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json({
    message: "account registered successfully",
    data: {
      username,
      email,
    },
  });
};
