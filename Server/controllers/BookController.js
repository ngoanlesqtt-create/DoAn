const BookModel = require("../models/BookModel");

const BookController = {
  addBook: async (req, res) => {
    try {
      const newBook = new BookModel(req.body);
      const savedBook = await newBook.save();

      res.status(201).json(savedBook);
    } catch (error) {
      console.error('Error adding book:', error);
      res.status(500).json({ error: 'Error adding book' });
    }
  },

  getAllBooks: async (req, res) => {
    try {
      const allBooks = await BookModel.find();
      res.status(200).json(allBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'Error fetching books' });
    }
  },
};

module.exports = BookController;
