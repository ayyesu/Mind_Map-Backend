import express, {Router} from 'express';
import {
    getRandomBooksByCategory,
    getAllBooks,
    getBooksByCategory,
    getSingleBook,
    searchBooks,
    addNewBook,
    updateBook,
    deleteBook,
    getAllBooksByUser,
    getPDF,
} from '../controller/book.controller';

const router: Router = express.Router();

router.get('/random-books/:category', getRandomBooksByCategory);
router.get('/:id', getSingleBook);
router.get('/:category', getBooksByCategory);
router.get('/user/:userId', getAllBooksByUser);
router.post('/:userId/add-book', addNewBook);
router.get('/:bookId/pdf', getPDF);
router.get('/search', searchBooks);

router.get('/', getAllBooks);
router.patch('/:bookId/update-book', updateBook);
router.delete('/:id/delete', deleteBook);

export default router;
