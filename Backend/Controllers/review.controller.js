import Review from '../Models/ReviewModel.js';
import User from '../Models/UserModel.js';
import Book from '../Models/BookModel.js';
import ApiError from '../Utils/ApiError.js';
import ApiResponse from '../Utils/ApiResponse.js';

// addRating for a book
export const addRating = async (req, res, next) => {
    try {
        const { rating, reviewText } = req.body;
        const { id: bookId } = req.params;

        const book = await Book.findById(bookId);
        if (!book) return next(new ApiError(404, "Book not found"));

        const review = await Review.create({
            rating,
            reviewText,
            bookId,
            userId: req.user.id 
        });

        return res.status(201).json(new ApiResponse(201, "Review added successfully", review));
    } catch (err) {
        next(err);
    }
};

// Get all reviews for a book
export const getReviewsByBook = async (req, res, next) => {
    try {
        const { id: bookId } = req.params;

        const reviews = await Review.find({ bookId })
            .populate("userId", "username email")  
            .sort({ createdAt: -1 });

        const averageRating =
            reviews.reduce((sum, r) => sum + r.rating, 0) / (reviews.length || 1);

        return res.status(200).json(
            new ApiResponse(200, "Reviews fetched successfully", {
                reviews,
                averageRating: averageRating.toFixed(1),
                totalReviews: reviews.length
            })
        );
    } catch (err) {
        next(err);
    }
};

// Update a review 
export const updateReview = async (req, res, next) => {
    try {
        const { rating, reviewText } = req.body;

        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            { rating, reviewText },
            { new: true, runValidators: true }
        );

        if (!updatedReview) return next(new ApiError(404, "Review not found"));

        return res.status(200).json(
            new ApiResponse(200, "Review updated successfully", updatedReview)
        );
    } catch (err) {
        next(err);
    }
};

// Delete a review 
export const deleteReview = async (req, res, next) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) return next(new ApiError(404, "Review not found"));

        return res.status(200).json(
            new ApiResponse(200, "Review deleted successfully", null)
        );
    } catch (err) {
        next(err);
    }
};
