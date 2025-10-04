import React, { useState } from 'react';
import { FaEdit, FaTrash, FaStar, FaRegStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useBooks } from '../Context/BookContext.jsx';
import { useAuth } from '../Context/AuthContext.jsx';
import ReviewForm from './ReviewForm.jsx';

const BookCard = ({ book: initialBook, onDelete }) => {
  const { setSelectedBook, addReview } = useBooks();
  const { user } = useAuth();
  const navigate = useNavigate();
  const maxRating = 5;

  const [book, setBook] = useState(initialBook);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  const isOwner = book.addedBy === user?._id;

  const handleEdit = () => navigate(`/edit-book/${book._id}`);

  const handleSubmitReview = async (data) => {
    const reviewData = {
      rating: parseInt(data.rating),
      reviewText: data.reviewText || "",
      reviewer: user.name || user.username,
    };

    try {
      const newReview = await addReview(book._id, reviewData);

      setMessage("Review added successfully!");
      setShowForm(false);

      // Update local book state for card stars
      setBook((prev) => {
        const updatedReviews = [...(prev.reviews || []), newReview];
        const avgRating =
          updatedReviews.reduce((acc, r) => acc + parseInt(r.rating || 0), 0) /
          updatedReviews.length;

        return { ...prev, reviews: updatedReviews, rating: avgRating.toFixed(1) };
      });

      // Update selectedBook context for BookDetailsPage
      setSelectedBook((prev) => ({
        ...prev,
        reviews: [...(prev?.reviews || []), newReview],
        rating: book.reviews
          ? (
              (book.reviews.reduce((acc, r) => acc + parseInt(r.rating || 0), 0) +
                parseInt(reviewData.rating)) /
              (book.reviews.length + 1)
            ).toFixed(1)
          : reviewData.rating,
      }));

      setTimeout(() => {
        navigate("/home");
      }, 1000);

    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="rounded-lg shadow-md shadow-gray-300 p-4 flex flex-col md:flex-row m-4 mx-auto w-1/2 gap-4 bg-white">
      {book.image && (
        <div className="flex justify-center md:justify-start">
          <img src={book.image} alt={book.title} className="w-32 h-40 object-cover rounded" />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between md:items-start items-center">
          <div>
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-gray-600">{book.author}</p>
          </div>

          {isOwner && (
            <div className="flex gap-2">
              <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                <FaEdit />
              </button>
              <button onClick={() => onDelete(book._id)} className="text-red-500 hover:text-red-700 cursor-pointer">
                <FaTrash />
              </button>
            </div>
          )}
        </div>

        <p className="mt-2 text-gray-700">{book.description}</p>

        <div className="mt-2 flex items-center gap-2 text-yellow-500">
          {Array.from({ length: maxRating }, (_, i) =>
            i < book.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
          )}
          <span className="text-gray-700 font-semibold">{book.rating}/{maxRating}</span>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <Link
            to={`/books/${book._id}`}
            className="text-blue-600 hover:underline"
            onClick={() => setSelectedBook(book)}
          >
            View Details
          </Link>

          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            {showForm ? "Close Review Form" : "Add Review"}
          </button>
        </div>

        {message && <p className="text-green-600 mt-2 font-semibold">{message}</p>}

        {showForm && (
          <ReviewForm onSubmit={handleSubmitReview} onCancel={() => setShowForm(false)} />
        )}
      </div>
    </div>
  );
};

export default BookCard;
