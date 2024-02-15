"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.addNewBook = exports.searchBooks = exports.getRandomBooksByCategory = exports.getSingleBook = exports.getBooksByCategory = exports.getPDF = exports.getAllBooksByUser = exports.getAllBooks = void 0;
const Books_1 = __importDefault(require("../model/Books"));
const Users_1 = __importDefault(require("../model/Users"));
const stream_1 = require("stream");
const book_validate_1 = __importDefault(require("../validation/book.validate"));
const firebase_config_1 = require("../config/firebase.config");
// Get all books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield Books_1.default.find()
            .select('title author category description imageUrl fileUrl price createdAt')
            .sort({ createdAt: -1 });
        if (books.length === 0) {
            res.status(404).json({ message: 'No books found' });
        }
        else {
            res.status(200).json(books);
        }
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
exports.getAllBooks = getAllBooks;
// Get All Books for a particular user
const getAllBooksByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const books = yield Books_1.default.find({ user: userId });
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllBooksByUser = getAllBooksByUser;
// Get PDF
const getPDF = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    try {
        const book = yield Books_1.default.findById(bookId);
        if (!book) {
            res.status(404).send('Book not found');
            return;
        }
        const pdfUrl = book.fileUrl;
        const response = yield fetch(pdfUrl);
        const arrayBuffer = yield response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const readable = new stream_1.Readable();
        readable._read = () => { };
        readable.push(buffer);
        readable.push(null);
        res.setHeader('Content-Type', 'application/pdf');
        readable.pipe(res);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
exports.getPDF = getPDF;
// Get all books based on category
const getBooksByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    try {
        const books = yield Books_1.default.find({ category });
        if (books.length === 0) {
            res.status(404).json({ message: 'No books found in this category' });
        }
        else {
            res.status(200).json(books);
        }
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
exports.getBooksByCategory = getBooksByCategory;
// Get single book
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const book = yield Books_1.default.findById(id);
        if (!book) {
            res.status(404).json({ message: 'No book found' });
        }
        else {
            res.status(200).json(book);
        }
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
exports.getSingleBook = getSingleBook;
// Return book with same category as the current book in random order
const getRandomBooksByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category } = req.params;
    try {
        const randomBooks = yield Books_1.default.aggregate([
            { $match: { category } },
            { $sample: { size: 5 } },
        ]);
        res.json(randomBooks);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getRandomBooksByCategory = getRandomBooksByCategory;
// Search books
const searchBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    try {
        const books = yield Books_1.default.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } },
            ],
        });
        res.json(books);
    }
    catch (error) {
        res.status(500).json({
            error: 'An error occurred while searching for books.',
        });
    }
});
exports.searchBooks = searchBooks;
// Add new book
const addNewBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const { title, author, description, category, price, imageUrl, fileUrl, imageName, fileName, } = req.body;
    const { error } = book_validate_1.default.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    try {
        const user = yield Users_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        const book = new Books_1.default({
            user: userId,
            title,
            author,
            description,
            category,
            imageUrl,
            fileUrl,
            imageName,
            fileName,
            price,
        });
        const newBook = yield book.save();
        user.books.push(newBook);
        yield user.save();
        res.status(201).json(newBook);
    }
    catch (error) {
        res.status(400).json({ err: error.message });
    }
});
exports.addNewBook = addNewBook;
// Update book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Books_1.default.findById(req.params.bookId);
        if (!book) {
            res.status(404).send('Book not found...');
            return;
        }
        const updatedBook = yield Books_1.default.findByIdAndUpdate(req.params.bookId, {
            $set: req.body, // Use the entire request body to update the book
        }, { new: true });
        res.send(updatedBook);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateBook = updateBook;
// Delete book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookToDelete = yield Books_1.default.findById(req.params.id);
        if (!bookToDelete) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }
        const user = yield Users_1.default.findOne({ books: req.params.id });
        if (user) {
            user.books = user.books.filter((bookId) => bookId.toString() !== req.params.id);
            yield user.save();
        }
        const imageRef = (0, firebase_config_1.ref)(firebase_config_1.storage, `images/${bookToDelete.imageName}`);
        const fileRef = (0, firebase_config_1.ref)(firebase_config_1.storage, `files/${bookToDelete.fileName}`);
        yield Promise.all([(0, firebase_config_1.deleteObject)(imageRef), (0, firebase_config_1.deleteObject)(fileRef)]);
        console.log('Files removed from Firebase Storage successfully');
        const deletedBook = yield Books_1.default.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedBook);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteBook = deleteBook;
