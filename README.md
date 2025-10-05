# BookPlatform

## About
BookPlatform is a web application for book lovers to discover, read, and share books.
Users can sign up, log in, browse books, view detailed information, add new books, rate books, and leave reviews.
The platform provides a seamless and interactive experience for managing and exploring books.

## Tech Stack
# Frontend
- React
- Tailwind CSS
- React Icons

# State Management
- Context API

# Routing
- React Router

# Backend
- Node.js
- Express.js

# Database
- MongoDB (Mongoose models for Books, Users, Reviews)

# Authentication
- JWT (JSON Web Token) stored in localStorage

  ## Setup Instructions

# 1. Clone the repository
git clone https://github.com/YourUsername/BookReviewPlatform.git
cd Frontend

# 2. Install frontend dependencies
npm install

# 3. Create a .env file (if backend URL is needed)
echo "REACT_APP_API_URL=http://localhost:5000" > .env

# 4. Start the frontend development server
cd Frontend
npm run dev

# 5. Install backend dependencies (if backend is separate)
cd backend
npm install

# 6. Start the backend server
npm start

# 7. Open the app in your browser
# http://localhost:3000

## API Routes

# Authentication
# Sign in a user
POST /api/signin

# Sign up a new user
POST /api/signup

# Books
# Add a new book (authenticated)
POST /api/books

# Get all books
GET /api/books

# Get a book by ID
GET /api/books/:id

# Update a book by ID (authenticated + owner)
PATCH /api/books/:id

# Delete a book by ID (authenticated + owner)
DELETE /api/books/:id

# Book Ratings
# Add a rating to a book (authenticated)
POST /api/books/:id/rate

# Reviews
# Get all reviews for a book
GET /api/books/reviews/:id

# Update a review by ID (authenticated + owner)
PATCH /api/reviews/:id

# Delete a review by ID (authenticated + owner)
DELETE /api/reviews/:id

# Others
- Axios or custom service layer for API calls
