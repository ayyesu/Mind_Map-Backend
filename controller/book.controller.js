const Books = require('../model/Books');

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
