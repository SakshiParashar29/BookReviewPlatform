const BASE_URL = "https://bookreviewplatform-3-msm9.onrender.com";

class AuthService {
  async login({ email, password }) {
    const res = await fetch(`${BASE_URL}/api/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    localStorage.setItem("token", data.data.token); 
    return data.data;
  }

  async signup({ username, email, password }) {
    const res = await fetch(`${BASE_URL}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) throw new Error("Signup failed");
    const data = await res.json();
    localStorage.setItem("token", data.data.token);
    return data.data;
  }

  async logout() {
    localStorage.removeItem("token"); 
    return true;
  }
}

export default new AuthService();
