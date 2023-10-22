const Books = require("../model/Books");
const bookSchema = require("../validation/book.validate");

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Books.find()
      .select(
        "title author category description imageUrl fileUrl price createdAt"
      )
      .sort({ createdAt: -1 });
    if (!books) return res.status(404).json({ message: "No books found" });
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Get all books based on category
exports.getBooksByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const books = await Books.find({ category });
    if (!books)
      return res
        .status(404)
        .json({ message: "No books found in this category" });
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Get single book
exports.getSingleBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Books.findById(id);
    if (!book) return res.status(404).json({ message: "No book found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Return book with same category as the current book in random order
exports.getRandomBooksByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const randomBooks = await Books.aggregate([
      { $match: { category } },
      { $sample: { size: 5 } },
    ]);
    res.json(randomBooks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Search books
exports.searchBooks = async (req, res) => {
  const query = req.query.q;

  try {
    const books = await Books.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while searching for books.",
    });
  }
};

// Add new book
exports.addNewBook = async (req, res) => {
  const { title, author, description, category, price, imageUrl, fileUrl } =
    req.body;

  const { error } = bookSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const book = new Books({
      title,
      author,
      description,
      category,
      imageUrl,
      fileUrl,
      price,
    });

    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  const { title, author, description, coverImage, category, price } = req.body;
  const { error } = bookSchema.validate(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const updatedBook = await Books.findByIdAndUpdate(
      title,
      author,
      description,
      coverImage,
      category,
      price,
      { new: true }
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Books.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedBook);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
