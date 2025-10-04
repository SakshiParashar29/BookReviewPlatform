import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    bookId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: String,
        required: true,
        min: 1,
        max: 5
    },
    reviewText: {
        type: String,
        trim: true,
        maxLength: 1000
    }
}, {timestamps: true})

const Review = mongoose.model("Review", ReviewSchema);
export default Review;