import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Book = () => {
  const navigate = useNavigate();

  // ⭐ Static dummy books (remove if you will inject props later)
  const [books, setBooks] = useState([
    {
      book_id: 1,
      title: "Learn React in 30 Days",
      author: "John Doe",
      price: 25.99,
      image_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    },
    {
      book_id: 2,
      title: "Node.js for Beginners",
      author: "Jane Smith",
      price: 29.99,
      image_url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    },
    {
      book_id: 3,
      title: "Mastering MySQL",
      author: "Mark Wilson",
      price: 19.99,
      image_url: "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
    }
  ]);

  const [cartMessage, setCartMessage] = useState("");

  // Not needed anymore but keep basic UI loading feel
  const [loading, setLoading] = useState(false);

  const handleViewDetails = (id) => {
    navigate(`/book/${id}`);
  };

  const handleAddToCart = (book) => {
    setCartMessage(`"${book.title}" added to cart (frontend only)`);
    setTimeout(() => setCartMessage(""), 3000);
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center mb-4">Our Books</h2>

        {cartMessage && (
          <div className="alert alert-success text-center">
            {cartMessage}
          </div>
        )}

        <div className="row g-4">
          {books.map((book) => (
            <div className="col-md-4" key={book.book_id}>
              <div className="card shadow-sm h-100">
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="card-img-top"
                  style={{ height: "300px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="text-muted">By {book.author}</p>
                  <h6 className="text-primary fw-bold">
                    ${Number(book.price).toFixed(2)}
                  </h6>

                  <div className="mt-auto">
                    <button
                      className="btn btn-outline-primary w-100 mt-3"
                      onClick={() => handleViewDetails(book.book_id)}
                    >
                      View Details
                    </button>

                    <button
                      className="btn btn-primary w-100 mt-2"
                      onClick={() => handleAddToCart(book)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Book;
