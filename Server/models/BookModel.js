const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: String,
  cost: Number,
  author: String,
  genres: [String],
  publishYear: Number,
  weight: Number,
  size: String,
  numPages: Number,
  shortDescription: String,
  longDescription: String,
  image: String,
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
