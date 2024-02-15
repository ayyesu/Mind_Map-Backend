"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controller/book.controller");
const router = express_1.default.Router();
router.get('/random-books/:category', book_controller_1.getRandomBooksByCategory);
router.get('/:id', book_controller_1.getSingleBook);
router.get('/:category', book_controller_1.getBooksByCategory);
router.get('/user/:userId', book_controller_1.getAllBooksByUser);
router.post('/:userId/add-book', book_controller_1.addNewBook);
router.get('/:bookId/pdf', book_controller_1.getPDF);
router.get('/search', book_controller_1.searchBooks);
router.get('/', book_controller_1.getAllBooks);
router.patch('/:bookId/update-book', book_controller_1.updateBook);
router.delete('/:id/delete', book_controller_1.deleteBook);
exports.default = router;
