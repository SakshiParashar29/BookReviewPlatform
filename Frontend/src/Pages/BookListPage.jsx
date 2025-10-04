import React, { useContext, useState } from "react";
import { BookContext } from "../Context/BookContext.jsx";
import BookCard from "../Components/BookCard.jsx";
import Pagination from "../Components/Pagination.jsx";

const BookListPage = () => {
  const { books, deleteBook, addReview } = useContext(BookContext);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = books.slice(indexOfFirst, indexOfLast);

  return (
    <div className="mt-6">
      {currentBooks.map((book) => (
        <BookCard
          key={book.id}
          {...book}
          onDelete={() => deleteBook(book.id)}
          onAddReview={() => addReview(book.id, { rating: 5, comment: "Awesome book!" })}
        />
      ))}

      <Pagination
        currentPage={currentPage}
        totalItems={books.length}
        itemsPerPage={booksPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default BookListPage;
