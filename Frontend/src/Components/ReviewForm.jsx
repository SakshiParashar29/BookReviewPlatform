import React, { useState, useEffect } from "react";

const ReviewForm = ({ onSubmit, existingReview, onCancel }) => {
  const [form, setForm] = useState({ rating: 0, reviewText: "" });

  useEffect(() => {
    if (existingReview) {
      setForm({
        rating: parseInt(existingReview.rating) || 0,
        reviewText: existingReview.reviewText || ""
      });
    }
  }, [existingReview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <label>
        Rating (1-5):
        <input
          type="number"
          min="1"
          max="5"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          required
          className="border p-1 rounded w-20"
        />
      </label>
      <label>
        Review:
        <textarea
          name="reviewText"
          value={form.reviewText}
          onChange={handleChange}
          rows={3}
          className="border p-1 rounded"
        />
      </label>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
          {existingReview ? "Update Review" : "Add Review"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ReviewForm;
