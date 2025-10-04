import express from 'express'
import { signIn, signUp } from '../Controllers/user.controller.js';
import {addRating, getReviewsByBook, updateReview, deleteReview} from '../Controllers/review.controller.js'
import { addBook, getBookById, getBooks, updateBook, deleteBook } from '../Controllers/book.controller.js';
import {authMiddleware } from '../Middlewares/auth.middleware.js'
import {authorizeOwner} from '../Middlewares/authorizeOwner.js'
import Book from '../Models/BookModel.js';
import Review from '../Models/ReviewModel.js';

export const router = express.Router()

router.post('/signin', signIn); // api testing complete
router.post('/signup', signUp); // complete


router.post('/books', authMiddleware, addBook); //complete
router.get('/books', getBooks);//complete
router.get('/books/:id', getBookById);//complete
router.patch('/books/:id', authMiddleware, authorizeOwner(Book, 'addedBy'),updateBook);//complete
router.delete('/books/:id', authMiddleware, authorizeOwner(Book, 'addedBy'),deleteBook);//complete

router.post('/books/:id/rate', authMiddleware, addRating);//complete
router.get('/books/reviews/:id', getReviewsByBook);//complete
router.patch('/reviews/:id',authMiddleware, authorizeOwner(Review, 'userId'), updateReview);//complete
router.delete('/reviews/:id',authMiddleware, authorizeOwner(Review, 'userId'), deleteReview);//complete

