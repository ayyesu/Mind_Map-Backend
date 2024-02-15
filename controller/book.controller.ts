import {Request, Response} from 'express';
import Book from '../model/Books';
import UserModel from '../model/Users';
import {Readable} from 'stream';
import bookSchema from '../validation/book.validate';
import {storage, ref, deleteObject} from '../config/firebase.config';

// Get all books
export const getAllBooks = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const books: any = await Book.find()
            .select(
                'title author category description imageUrl fileUrl price createdAt',
            )
            .sort({createdAt: -1});
        if (books.length === 0) {
            res.status(404).json({message: 'No books found'});
        } else {
            res.status(200).json(books);
        }
    } catch (error: any) {
        res.status(404).json({error: error.message});
    }
};

// Get All Books for a particular user
export const getAllBooksByUser = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const userId: string = req.params.userId;

    try {
        const books: any = await Book.find({user: userId});
        res.json(books);
    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
};

// Get PDF
export const getPDF = async (req: Request, res: Response): Promise<void> => {
    const bookId: string = req.params.bookId;

    try {
        const book: any = await Book.findById(bookId);

        if (!book) {
            res.status(404).send('Book not found');
            return;
        }

        const pdfUrl: string = book.fileUrl;

        const response: any = await fetch(pdfUrl);
        const arrayBuffer: ArrayBuffer = await response.arrayBuffer();

        const buffer: Buffer = Buffer.from(arrayBuffer);

        const readable: Readable = new Readable();
        readable._read = () => {};
        readable.push(buffer);
        readable.push(null);

        res.setHeader('Content-Type', 'application/pdf');
        readable.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Get all books based on category
export const getBooksByCategory = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const category: string = req.params.category;
    try {
        const books: any = await Book.find({category});
        if (books.length === 0) {
            res.status(404).json({message: 'No books found in this category'});
        } else {
            res.status(200).json(books);
        }
    } catch (error: Error | any) {
        res.status(404).json({error: error.message});
    }
};

// Get single book
export const getSingleBook = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const id: string = req.params.id;
    try {
        const book: any = await Book.findById(id);
        if (!book) {
            res.status(404).json({message: 'No book found'});
        } else {
            res.status(200).json(book);
        }
    } catch (error: Error | any) {
        res.status(404).json({error: error.message});
    }
};

// Return book with same category as the current book in random order
export const getRandomBooksByCategory = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const {category} = req.params;

    try {
        const randomBooks: any = await Book.aggregate([
            {$match: {category}},
            {$sample: {size: 5}},
        ]);
        res.json(randomBooks);
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
};

// Search books
export const searchBooks = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const query: string = req.query.q as string;

    try {
        const books: any = await Book.find({
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
export const addNewBook = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const userId: string = req.params.userId;
    const {
        title,
        author,
        description,
        category,
        price,
        imageUrl,
        fileUrl,
        imageName,
        fileName,
    } = req.body;

    const {error} = bookSchema.validate(req.body);

    if (error) {
        res.status(400).json({message: error.details[0].message});
        return;
    }

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }

        const book = new Book({
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

        const newBook: any = await book.save();

        user.books.push(newBook);
        await user.save();

        res.status(201).json(newBook);
    } catch (error: Error | any) {
        res.status(400).json({err: error.message});
    }
};

// Update book
export const updateBook = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const book: any = await Book.findById(req.params.bookId);

        if (!book) {
            res.status(404).send('Book not found...');
            return;
        }

        const updatedBook: any = await Book.findByIdAndUpdate(
            req.params.bookId,
            {
                $set: req.body, // Use the entire request body to update the book
            },
            {new: true}, // Return the updated document
        );

        res.send(updatedBook);
    } catch (error: Error | any) {
        res.status(500).json({error: error.message});
    }
};

// Delete book
export const deleteBook = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const bookToDelete: any = await Book.findById(req.params.id);
        if (!bookToDelete) {
            res.status(404).json({error: 'Book not found'});
            return;
        }

        const user = await UserModel.findOne({books: req.params.id});

        if (user) {
            user.books = user.books.filter(
                (bookId) => bookId.toString() !== req.params.id,
            );
            await user.save();
        }

        const imageRef = ref(storage, `images/${bookToDelete.imageName}`);
        const fileRef = ref(storage, `files/${bookToDelete.fileName}`);

        await Promise.all([deleteObject(imageRef), deleteObject(fileRef)]);

        console.log('Files removed from Firebase Storage successfully');

        const deletedBook: any = await Book.findByIdAndRemove(req.params.id);

        res.status(200).json(deletedBook);
    } catch (error: Error | any) {
        res.status(500).json({error: error.message});
    }
};
