import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const dummyBooks = [
  {
    book_id: 1,
    title: "Learn React in 30 Days",
    author: "John Doe",
    price: 25.99,
    description: "A complete beginner-friendly guide to learning React.",
    image_url: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
  {
    book_id: 2,
    title: "Node.js for Beginners",
    author: "Jane Smith",
    price: 29.99,
    description: "Master backend development with Node.js.",
    image_url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
  },
  {
    book_id: 3,
    title: "Mastering MySQL",
    author: "Mark Wilson",
    price: 19.99,
    description: "Learn databases from zero to advanced.",
    image_url: "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
  }
];

const BookDetails = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    // Find the book directly from static array
    const selected = dummyBooks.find(
      (item) => item.book_id === Number(id)
    );
    setBook(selected);
  }, [id]);

  if (!book) {
    return (
      <>
        <Navbar />
        <h3 className="text-center mt-5 text-danger">
          Book not found
        </h3>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <div className="row align-items-center">

          <div className="col-md-6">
            <img
              src={book.image_url}
              alt={book.title}
              className="img-fluid rounded shadow"
            />
          </div>

          <div className="col-md-6">
            <h2>{book.title}</h2>
            <p className="text-muted">By {book.author}</p>

            <h4 className="text-primary fw-bold mb-3">
              ${Number(book.price).toFixed(2)}
            </h4>

            <p className="text-secondary">{book.description}</p>

            <button className="btn btn-primary mt-3 w-100">
              Add to Cart
            </button>

            <Link to="/book" className="btn btn-outline-secondary mt-3 w-100">
              Go Back
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default BookDetails;
