const createBlog = (req, res) => {
  const data = req.body;
  console.log(data);
  res.json({
    message: "data berhasil di tambahkan",
    data : {...data},
  });
};

const getAllBlog = (req, res) => {
  res.status("200");
  res.json({
    message: "data berhasil diambil",
    data: {
      username: "branmalawi",
      number: 089567431245,
      email: "branmalawi@gmail.com",
    },
  });
};

module.exports = { createBlog, getAllBlog };
