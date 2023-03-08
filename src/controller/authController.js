exports.register = (req, res) => {
  const { username, email } = req.body;
  res.json({
    message: "account registered successfully",
    data: {
      username,
      email,
    },
  });
};
