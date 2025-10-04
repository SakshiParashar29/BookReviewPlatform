import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const BookInfo = ({ book }) => {
  if (!book) return <p className="text-center mt-6">Select a book to view details.</p>;

  const reviews = book.reviews || [];
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + parseInt(r.rating || 0), 0) / reviews.length).toFixed(1)
      : 0;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre || "N/A"}</p>
      <p><strong>Year:</strong> {book.year || "N/A"}</p>
      <p><strong>Description:</strong> {book.description || "No description provided."}</p>
      <p><strong>Average Rating:</strong> {averageRating} / 5</p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li key={review._id} className="border p-3 rounded bg-gray-50">
                <p className="font-semibold">{review.reviewer}</p>
                <p className="text-yellow-500 flex gap-1">
                  {Array.from({ length: parseInt(review.rating || 0) }, (_, i) => (
                    <FaStar key={"f-" + i} />
                  ))}
                  {Array.from({ length: 5 - parseInt(review.rating || 0) }, (_, i) => (
                    <FaRegStar key={"e-" + i} />
                  ))}
                </p>
                <p>{review.reviewText || "No comment provided."}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookInfo;
