import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage
  useEffect(() => {
    setLoading(true);
    const savedCart = localStorage.getItem("book_cart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems([]);
    }

    setLoading(false);
  }, []);

  // Save updates back to localStorage
  const updateCartStorage = (items) => {
    localStorage.setItem("book_cart", JSON.stringify(items));
  };

  // Remove item
  const handleRemove = (bookId) => {
    const updated = cartItems.filter((item) => item.book_id !== bookId);
    setCartItems(updated);
    updateCartStorage(updated);
  };

  // Increase quantity
  const increaseQty = (bookId) => {
    const updated = cartItems.map((item) =>
      item.book_id === bookId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCartItems(updated);
    updateCartStorage(updated);
  };

  // Decrease quantity (min 1)
  const decreaseQty = (bookId) => {
    const updated = cartItems.map((item) => {
      if (item.book_id === bookId) {
        const newQty = item.quantity > 1 ? item.quantity - 1 : 1;
        return { ...item, quantity: newQty };
      }
      return item;
    });

    setCartItems(updated);
    updateCartStorage(updated);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center mb-4">Your Cart</h2>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border" role="status"></div>
          </div>
        )}

        {!loading && cartItems.length === 0 && (
          <div className="text-center py-5">
            <h4>Your cart is empty</h4>
            <a href="/book" className="btn btn-primary mt-3">
              Browse Books
            </a>
          </div>
        )}

        {!loading && cartItems.length > 0 && (
          <div className="row">
            {/* Cart items */}
            <div className="col-md-8">
              <div className="list-group">
                {cartItems.map((item) => (
                  <div
                    key={item.book_id}
                    className="list-group-item d-flex align-items-center"
                  >
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="rounded"
                      style={{
                        width: "80px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />

                    <div className="ms-3 flex-grow-1">
                      <h5 className="mb-1">{item.title}</h5>
                      <p className="mb-1 text-muted">
                        ${Number(item.price).toFixed(2)}
                      </p>

                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary btn-sm me-2"
                          onClick={() => decreaseQty(item.book_id)}
                        >
                          -
                        </button>

                        <input
                          type="text"
                          readOnly
                          value={item.quantity}
                          className="form-control text-center"
                          style={{ width: "60px" }}
                        />

                        <button
                          className="btn btn-outline-secondary btn-sm ms-2"
                          onClick={() => increaseQty(item.book_id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      className="btn btn-danger ms-3"
                      onClick={() => handleRemove(item.book_id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-md-4">
              <div className="card shadow p-3">
                <h4 className="mb-3">Order Summary</h4>

                <div className="d-flex justify-content-between mb-2">
                  <span>Total Items:</span>
                  <strong>{cartItems.length}</strong>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Total Price:</span>
                  <strong>${total.toFixed(2)}</strong>
                </div>

                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => alert("Checkout not implemented yet")}
                >
                  Proceed to Checkout
                </button>

                <a
                  href="/book"
                  className="btn btn-outline-secondary w-100 mt-2"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
