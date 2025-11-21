import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const userId = localStorage.getItem("user_id");

  // Load user info from localStorage if available
  useEffect(() => {
    if (!userId) return;

    const storedName = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");

    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Fake delay to simulate submission
    setTimeout(() => {
      if (!name || !email || !message) {
        setError("Please fill all required fields.");
        setLoading(false);
        return;
      }

      // Save messages locally (optional)
      const storedMessages = JSON.parse(localStorage.getItem("contact_messages") || "[]");

      storedMessages.push({
        id: Date.now(),
        name,
        email,
        subject,
        message,
      });

      localStorage.setItem("contact_messages", JSON.stringify(storedMessages));

      setSuccess("Your message has been sent successfully!");
      setSubject("");
      setMessage("");
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <Navbar />

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-7">
            <div className="card shadow p-4">
              <h3 className="text-center mb-3">Contact Us</h3>
              <p className="text-center text-muted mb-4">
                Have a question or need help? Send us a message!
              </p>

              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}
              {success && (
                <div className="alert alert-success text-center">{success}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button
                  className="btn btn-primary w-100 mt-2"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
