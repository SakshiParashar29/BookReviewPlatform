const BASE_URL = "https://bookreviewplatform-3-msm9.onrender.com/api";

class ReviewService {
  async getByBookId(bookId) {
    const res = await fetch(`${BASE_URL}/books/reviews/${bookId}`);
    if (!res.ok) throw new Error("Failed to fetch reviews");
    return res.json();
  }

  async add(bookId, review) { 
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/books/${bookId}/rate`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(review),
    });
    if (!res.ok) throw new Error("Failed to add review");
    return res.json();
  }

  async update(reviewId, updatedReview) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updatedReview),
    });
    if (!res.ok) throw new Error("Failed to update review");
    return res.json();
  }

  async delete(reviewId) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete review");
    return res.json();
  }
}

export default new ReviewService();
