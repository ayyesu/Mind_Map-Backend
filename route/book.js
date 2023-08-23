const express = require('express');
const {
    getAllBooks,
    getBooksByCategory,
    getSingleBook,
    searchBooks,
    addNewBook,
    updateBook,
    deleteBook,
} = require('../controller/book.controller');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getSingleBook);
router.get('/:category', getBooksByCategory);
router.get('/search', searchBooks);
router.post('/', addNewBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
