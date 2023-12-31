const Books = require("../model/Books");
const User = require("../model/Users");
const { Readable } = require("stream");
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

// Get All Books for a particular user
exports.getAllBooksByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const books = await Books.find({ user: userId });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPDF = async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const book = await Books.findById(bookId);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    const pdfUrl = book.fileUrl; // Assuming `fileUrl` is the field in your book schema

    const response = await fetch(pdfUrl); // Make sure to install the 'node-fetch' package
    const arrayBuffer = await response.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);

    res.setHeader("Content-Type", "application/pdf");
    readable.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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
  const userId = req.params.userId;
  const { title, author, description, category, price, imageUrl, fileUrl } =
    req.body;

  const { error } = bookSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const book = new Books({
      user: userId,
      title,
      author,
      description,
      category,
      imageUrl,
      fileUrl,
      price,
    });

    const newBook = await book.save();

    user.books.push(newBook);
    await user.save();

    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const book = await Books.findById(req.params.bookId);

    if (!book) return res.status(404).send("Book not found...");

    const updatedBook = await Books.findByIdAndUpdate(
      req.params.bookId,
      {
        $set: req.body, // Use the entire request body to update the book
      },
      { new: true } // Return the updated document
    );

    res.send(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Books.findByIdAndRemove(req.params.id);

    // Find the user associated with the deleted book
    const user = await User.findOne({ books: req.params.id });

    if (user) {
      // Remove the book ID from the user's books array
      user.books = user.books.filter(
        (bookId) => bookId.toString() !== req.params.id
      );
      await user.save();
    }

    res.status(200).json(deletedBook);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
