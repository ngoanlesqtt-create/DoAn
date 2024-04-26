const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');

router.post('/add', BookController.addBook);
router.get('/all', BookController.getAllBooks);

module.exports = router;
