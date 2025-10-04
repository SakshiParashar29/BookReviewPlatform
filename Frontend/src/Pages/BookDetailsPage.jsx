import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBooks } from "../Context/BookContext.jsx";
import BookInfo from "../Components/BookInfo.jsx";

const BookDetailsPage = () => {
  const { id } = useParams();
  const { fetchBookById, loading, selectedBook, setSelectedBook } = useBooks();
  const [book, setBook] = useState(selectedBook || null);

  useEffect(() => {
    if (selectedBook && selectedBook._id === id) {
      setBook(selectedBook);
    } else {
      const fetchData = async () => {
        try {
          const fetchedBook = await fetchBookById(id);
          setBook(fetchedBook);
          setSelectedBook(fetchedBook);
        } catch (err) {
          console.error("Failed to fetch book:", err);
        }
      };
      fetchData();
    }
  }, [id, fetchBookById, selectedBook, setSelectedBook]);

  if (loading || !book) return <p className="text-center mt-6">Loading book details...</p>;

  return (
    <div className="p-4">
      <BookInfo book={book} />
    </div>
  );
};

export default BookDetailsPage;
