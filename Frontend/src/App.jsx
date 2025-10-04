import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import Signup from "./Pages/SignupPage.jsx";
import Login from "./Pages/LoginPage.jsx";
import BookDetails from "./Pages/BookDetailsPage.jsx";
import BookFormPage from "./Pages/BookFormPage.jsx";
import { AuthProvider, useAuth } from "./Context/AuthContext.jsx";
import { BookProvider } from "./Context/BookContext.jsx";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <BookProvider>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            <Route
              path="/books/:id"
              element={
                <PrivateRoute>
                  <BookDetails />
                </PrivateRoute>
              }
            />

            <Route
              path="/add-book"
              element={
                <PrivateRoute>
                  <BookFormPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/edit-book/:id"
              element={
                <PrivateRoute>
                  <BookFormPage />
                </PrivateRoute>
              }
            />

            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
      </BookProvider>
    </AuthProvider>
  );
};

export default App;
