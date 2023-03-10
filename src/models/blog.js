const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Blog = new Schema(
  {
    title: { type: String, required: true },
    article: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: Object, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', Blog);
