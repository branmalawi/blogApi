const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const { faker } = require("@faker-js/faker/locale/id_ID");
const Blog = require("../models/blog");

// calback to handle when POST
const createBlog = (req, res) => {
  const errors = validationResult(req);

  // logic to throw err if there invalid value and unlink the image
  if (!errors.isEmpty()) {
    fs.unlinkSync(req.file.path);
    const error = new Error("invalid value");
    error.status = 400;
    error.data = errors.array();
    throw error;
  }

  // logic to throw err when image undefined
  if (!req.file) {
    const error = new Error("gambar harus disertakan");
    error.status = 400;
    throw error;
  }

  // inisialisation data before upload to db
  const data = {
    title: faker.lorem.sentence(5),
    article: faker.lorem.paragraphs(5),
    image: req.file.filename,
    author: {
      uid: faker.datatype.uuid(),
      name: faker.name.fullName(),
    },
  };

  const Post = new Blog({
    ...data,
  });

  Post.save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "data berhasil di tambahkan",
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "data berhasil di tambahkan",
        ...err,
      });
    });
};

// calback to handle when GET all data
const getAllBlog = (req, res, next) => {
  const getBlog = new Blog();
  Blog.find({})
    .then((result) => {
      res.status(200).json({
        message: "data berhasil diambil",
        data: result,
      });
    })
    .catch((err) => next(err));
};

module.exports = { createBlog, getAllBlog };
