import React, { useContext, useState, useEffect } from "react";
import { BookContext } from "../Context/BookContext.jsx";
import { useNavigate, useParams } from "react-router-dom";

const BookFormPage = () => {
  const { addBook, updateBook, books } = useContext(BookContext);
  const { id } = useParams(); 
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: "",
    image: "",
  });

  useEffect(() => {
    if (isEdit && books.length > 0) {
      const book = books.find((b) => b._id === id);
      if (book) setForm(book);
    }
  }, [id, books, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateBook(id, form);
      } else {
        await addBook(form);
      }
      navigate("/home");
    } catch (err) {
      console.error("Error submitting book:", err);
    }
  };

  if (isEdit && !form.title) {
    return <p className="text-center mt-6">Loading book details...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 shadow rounded mt-6">
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Book" : "Add New Book"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {["title", "author", "description", "genre", "year", "image"].map(
          (field) => (
            <input
              key={field}
              type={field === "year" ? "number" : "text"}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="border p-2 rounded"
              required={field !== "image"} 
            />
          )
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isEdit ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default BookFormPage;
