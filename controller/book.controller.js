const Books = require('../model/Books');
const bookSchema = require('../validation/book.validate');

// Get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Books.find();
        if (!books) return res.status(404).json({message: 'No books found'});
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

// Get all books based on category
export const getBooksByCategory = async (req, res) => {
    const category = req.params.category;
    try {
        const books = await Books.find({category});
        if (!books)
            return res
                .status(404)
                .json({message: 'No books found in this category'});
        res.status(200).json(books);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

// Get single book
export const getSingleBook = async (req, res) => {
    const id = req.params.id;
    try {
        const book = await Books.findById(id);
        if (!book) return res.status(404).json({message: 'No book found'});
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

// Search books
export const searchBooks = async (req, res) => {
    const query = req.query.q;

    try {
        const books = await Book.find({
            $or: [
                {title: {$regex: query, $options: 'i'}},
                {author: {$regex: query, $options: 'i'}},
                {category: {$regex: query, $options: 'i'}},
            ],
        });
        res.json(books);
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while searching for books.',
        });
    }
};

// Add new book
export const addNewBook = async (req, res) => {
    const {title, author, description, coverImage, category, price} = req.body;
    const {error} = bookSchema.validate(req.body);

    if (error) return res.status(400).json({error: error.details[0].message});

    const book = new Books({
        title,
        author,
        description,
        coverImage,
        category,
        price,
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// Update book
export const updateBook = async (req, res) => {
    const {title, author, description, coverImage, category, price} = req.body;
    const {error} = bookSchema.validate(req.body);

    if (error) return res.status(400).json({error: error.details[0].message});

    try {
        const updatedBook = await Books.findByIdAndUpdate(
            title,
            author,
            description,
            coverImage,
            category,
            price,
            {new: true},
        );
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

// Delete book
export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Books.findByIdAndRemove(req.params.id);
        res.status(200).json(deletedBook);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};
