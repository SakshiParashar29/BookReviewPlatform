import React from "react";
import BookForm from "../Components/BookForm.jsx";
import BookList from "../Components/BookList.jsx";
import BookInfo from "../Components/BookInfo.jsx";
import { useBooks } from "../Context/BookContext.jsx";

const Home = () => {
  const { selectedBook, addBook } = useBooks();

  const handleAddBook = async (bookData) => {
    try {
      await addBook(bookData);
      alert("Book added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add book");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-4 px-4">
      <BookForm onSubmit={handleAddBook} />
      <BookList />
      {/* {selectedBook && <BookInfo book={selectedBook} />} */}
    </div>
  );
};

export default Home;
