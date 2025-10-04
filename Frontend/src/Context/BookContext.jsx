import React, { createContext, useState, useEffect, useContext } from "react";
import BookService from "../Services/BookService.js";
import ReviewService from "../Services/ReviewService.js";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await BookService.getAll();
      const booksArray = res?.data?.books || [];
      setBooks(booksArray);
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single book by ID
  const fetchBookById = async (id) => {
    try {
      const res = await BookService.getById(id);
      const book = res?.data;
      setSelectedBook(book);
      return book;
    } catch (err) {
      console.error("Error fetching book by ID:", err);
      setSelectedBook(null);
    }
  };

  // Add a new book
  const addBook = async (book) => {
    try {
      const res = await BookService.add(book);
      const newBook = res.data;
      setBooks((prev) => [...prev, newBook]);
      return newBook;
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  // Update a book
  const updateBook = async (id, updatedBook) => {
    try {
      const res = await BookService.update(id, updatedBook);
      const updated = res.data;
      setBooks((prev) => prev.map((b) => (b._id === id ? updated : b)));
      if (selectedBook?._id === id) setSelectedBook(updated);
      return updated;
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  // Delete a book
  const deleteBook = async (id) => {
    try {
      await BookService.delete(id);
      setBooks((prev) => prev.filter((b) => b._id !== id));
      if (selectedBook?._id === id) setSelectedBook(null);
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };


  // --- Reviews ---
const addReview = async (bookId, review) => {
  try {
    const res = await ReviewService.add(bookId, review); // review = { rating, reviewText, reviewer }
    const newReview = res.data;

    // Update selectedBook with new review and updated average rating
    setSelectedBook((prev) => {
      const updatedReviews = [...(prev.reviews || []), newReview];
      const avgRating =
        updatedReviews.reduce((acc, r) => acc + parseInt(r.rating || 0), 0) /
        updatedReviews.length;

      return { ...prev, reviews: updatedReviews, rating: avgRating.toFixed(1) };
    });

    // Update books array with the new review and updated rating
    setBooks((prev) =>
      prev.map((b) =>
        b._id === bookId
          ? {
              ...b,
              reviews: [...(b.reviews || []), newReview],
              rating: (
                ((b.reviews?.reduce((acc, r) => acc + parseInt(r.rating || 0), 0) || 0) +
                  parseInt(newReview.rating)) /
                ((b.reviews?.length || 0) + 1)
              ).toFixed(1),
            }
          : b
      )
    );

    return newReview;
  } catch (err) {
    console.error("Error adding review:", err);
  }
};

const updateReview = async (bookId, reviewId, updatedReview) => {
  try {
    const res = await ReviewService.update(reviewId, updatedReview);
    const updated = res.data;

    setSelectedBook((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) => (r._id === reviewId ? updated : r)),
    }));

    setBooks((prev) =>
      prev.map((b) =>
        b._id === bookId
          ? { ...b, reviews: b.reviews.map((r) => (r._id === reviewId ? updated : r)) }
          : b
      )
    );

    return updated;
  } catch (err) {
    console.error("Error updating review:", err);
  }
};

const deleteReview = async (bookId, reviewId) => {
  try {
    await ReviewService.delete(reviewId);

    setSelectedBook((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((r) => r._id !== reviewId),
    }));

    setBooks((prev) =>
      prev.map((b) =>
        b._id === bookId ? { ...b, reviews: b.reviews.filter((r) => r._id !== reviewId) } : b
      )
    );
  } catch (err) {
    console.error("Error deleting review:", err);
  }
};


  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        selectedBook,
        setSelectedBook,
        loading,
        fetchBooks,
        addBook,
        updateBook,
        fetchBookById,
        deleteBook,
        addReview,
        updateReview,
        deleteReview,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);
