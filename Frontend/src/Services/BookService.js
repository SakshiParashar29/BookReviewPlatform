const BASE_URL = "https://bookreviewplatform-3-msm9.onrender.com";

class BookService {
  async getAll() {
    const res = await fetch(`${BASE_URL}/api/books`);
    if (!res.ok) throw new Error("Failed to fetch books");
    return res.json();
  }

  async getById(id) {
    const res = await fetch(`${BASE_URL}/api/books/${id}`);
    if (!res.ok) throw new Error("Failed to fetch book");
    return res.json();
  }

  async add(book) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/api/books`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(book),
    });
    if (!res.ok) throw new Error("Failed to add book");
    return res.json();
  }

  async update(id, updatedBook) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/api/books/${id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updatedBook),
    });
    if (!res.ok) throw new Error("Failed to update book");
    return res.json();
  }

  async delete(id) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/api/books/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete book");
    return res.json();
  }

  async rate(id, rating) {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/api/books/${id}/rate`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ rating }),
    });
    if (!res.ok) throw new Error("Failed to rate book");
    return res.json();
  }
}

export default new BookService();
