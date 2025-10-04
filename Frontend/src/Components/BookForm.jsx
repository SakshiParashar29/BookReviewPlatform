import React, { useState } from 'react';

const BookForm = ({ initialData = {}, onSubmit }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [author, setAuthor] = useState(initialData.author || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [genre, setGenre] = useState(initialData.genre || '');
  const [year, setYear] = useState(initialData.year || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = { title, author, description, genre, year };
    onSubmit(bookData); 
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded-lg mt-4">
      <h2 className="text-2xl font-bold mb-4">
        {initialData.id ? 'Edit Book' : 'Add New Book'}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
          rows={4}
        />

        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Published Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white cursor-pointer py-2 rounded hover:bg-blue-600"
        >
          {initialData.id ? 'Update Book' : 'Add Book'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
