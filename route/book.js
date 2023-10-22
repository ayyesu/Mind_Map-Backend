const express = require("express");
const {
  getRandomBooksByCategory,
  getAllBooks,
  getBooksByCategory,
  getSingleBook,
  searchBooks,
  addNewBook,
  updateBook,
  deleteBook,
} = require("../controller/book.controller");

const router = express.Router();

router.get("/random-books/:category", getRandomBooksByCategory);
router.get("/:id", getSingleBook);
router.get("/:category", getBooksByCategory);
router.get("/search", searchBooks);

router.get("/", getAllBooks);
router.post("/addbook", addNewBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
