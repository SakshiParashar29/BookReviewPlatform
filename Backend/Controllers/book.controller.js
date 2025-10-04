import Book from '../Models/BookModel.js';
import ApiError from '../Utils/ApiError.js';
import ApiResponse from '../Utils/ApiResponse.js';
import { pagination } from '../Utils/pagination.js';


export const addBook = async (req, res, next) => {
    try {
        const { title, author, description, genre, year } = req.body;

        if (!title || !author) {
            return next(new ApiError(400, "Title and Author are required"));
        }

        const book = await Book.create({
            title,
            author,
            description,
            genre,
            year,
            addedBy: req.user._id   
        });

        return res.status(201).json(new ApiResponse(201, "Book added successfully", book));
    } catch (err) {
        next(err);
    }
};

export const getBooks = async (req, res, next) => {
    try {
        const { skip, limit } = pagination(req.query.page, 5);

        const totalBooks = await Book.countDocuments();
        const books = await Book.find()
            .skip(skip)
            .limit(limit);

        return res.status(200).json(
            new ApiResponse(200, "Books fetched successfully", {
                books,
                currentPage: parseInt(req.query.page) || 1,
                totalPages: Math.ceil(totalBooks / limit),
                totalBooks
            })
        );
    } catch (err) {
        next(err);
    }
};

export const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return next(new ApiError(404, "Book not found"));
        }

        return res.status(200).json(new ApiResponse(200, "Book fetched successfully", book));
    } catch (err) {
        next(err);
    }
};

export const updateBook = async (req, res, next) => {
    try {
        const { title, author, description, genre, year } = req.body;

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, description, genre, year },
            { new: true, runValidators: true }
        );

        if (!book) {
            return next(new ApiError(404, "Book not found"));
        }

        return res.status(200).json(new ApiResponse(200, "Book updated successfully", book));
    } catch (err) {
        next(err);
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return next(new ApiError(404, "Book not found"));
        }

        return res.status(200).json(new ApiResponse(200, "Book deleted successfully", null));
    } catch (err) {
        next(err);
    }
};
