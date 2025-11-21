import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(true);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      alert("You must be logged in to proceed to payment");
      navigate("/login");
      return;
    }

    try {
      setLoadingCart(true);

      // ⭐ Load cart from localStorage
      const storedCart = JSON.parse(localStorage.getItem("cart_items") || "[]");
      setCartItems(storedCart);

      // ⭐ Load user profile from localStorage
      setFullName(localStorage.getItem("username") || "");
      setEmail(localStorage.getItem("email") || "");
    } catch (err) {
      console.error(err);
      setError("Failed to load cart. Please try again.");
    } finally {
      setLoadingCart(false);
    }
  }, [navigate, userId]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handlePayNow = () => {
    if (!userId) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setProcessing(true);
    setError("");
    setSuccessMessage("");

    setTimeout(() => {
      // ⭐ Simulate checkout success
      setSuccessMessage("Payment successful! Your order has been placed.");

      // clear cart from localStorage
      localStorage.setItem("cart_items", JSON.stringify([]));
      setCartItems([]);

      setTimeout(() => {
        navigate("/");
      }, 2000);

      setProcessing(false);
    }, 1500);
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <h2 className="text-center mb-4">Checkout & Payment</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {successMessage && (
          <div className="alert alert-success text-center">{successMessage}</div>
        )}

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4">
              <h4 className="mb-3">Billing Information</h4>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <h4 className="mt-4 mb-3">Payment Method</h4>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  checked={paymentMethod === "credit_card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label">Credit / Debit Card</label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label">PayPal</label>
              </div>

              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label">Cash on Delivery</label>
              </div>

              {paymentMethod === "credit_card" && (
                <>
                  <h5 className="mb-3">Card Details</h5>

                  <div className="mb-3">
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Expiry Date</label>
                      <input type="text" className="form-control" placeholder="MM/YY" />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">CVV</label>
                      <input type="password" className="form-control" placeholder="123" />
                    </div>
                  </div>
                </>
              )}

              <button
                className="btn btn-primary w-100 mt-3"
                onClick={handlePayNow}
                disabled={processing || loadingCart || cartItems.length === 0}
              >
                {processing ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>

          <div className="col-md-4 mt-4 mt-md-0">
            <div className="card shadow p-4 h-100">
              <h4 className="mb-3">Order Summary</h4>

              {loadingCart ? (
                <div className="text-center py-3">
                  <div className="spinner-border"></div>
                </div>
              ) : cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  <ul className="list-group mb-3">
                    {cartItems.map((item) => (
                      <li
                        key={item.book_id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <div>{item.title}</div>
                          <small className="text-muted">Qty: {item.quantity}</small>
                        </div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="d-flex justify-content-between">
                    <span>Items:</span>
                    <strong>{cartItems.length}</strong>
                  </div>

                  <div className="d-flex justify-content-between mt-2">
                    <span>Total:</span>
                    <strong>${totalAmount.toFixed(2)}</strong>
                  </div>
                </>
              )}

              <hr />
              <p className="text-muted">
                Thank you for shopping with us! Your order will be processed once payment is
                completed.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;
