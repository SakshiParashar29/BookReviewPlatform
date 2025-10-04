import React from "react";
import BookCard from "./BookCard.jsx";
import { useBooks } from "../Context/BookContext.jsx";

const BookList = () => {
  const { books, deleteBook } = useBooks();

  if (!books || books.length === 0) return <p className="text-center mt-4">No books Review available.</p>;

  return (
    <div className="mt-4">
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          onDelete={deleteBook} 
        />
      ))}
    </div>
  );
};

export default BookList;
