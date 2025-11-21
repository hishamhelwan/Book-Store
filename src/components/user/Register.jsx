import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    // 🔍 Simulate stored users in localStorage
    const storedUsers =
      JSON.parse(localStorage.getItem("users_db") || "[]");

    // ❌ Check if user already exists
    const exists = storedUsers.some(
      (u) => u.email.toLowerCase() === form.email.toLowerCase()
    );

    if (exists) {
      setError("An account with this email already exists.");
      setLoading(false);
      return;
    }

    // ⭐ Create a new user entry
    const newUser = {
      user_id: Date.now().toString(), // simple unique id
      username: form.username,
      email: form.email,
      password: form.password,
      user_role: 0,
    };

    // ⭐ Save users DB
    storedUsers.push(newUser);
    localStorage.setItem("users_db", JSON.stringify(storedUsers));

    // ⭐ Also store the logged-in user session
    localStorage.setItem("user_id", newUser.user_id);
    localStorage.setItem("username", newUser.username);
    localStorage.setItem("email", newUser.email);
    localStorage.setItem("user_role", newUser.user_role);

    setSuccess("Account created successfully!");
    setLoading(false);

    // Redirect to home after a brief delay
    setTimeout(() => {
      navigate("/");
    }, 900);
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="col-md-5">
        <div className="card shadow p-4">
          <h3 className="text-center mb-3">Create an Account</h3>

          {error && <div className="alert alert-danger py-2">{error}</div>}
          {success && (
            <div className="alert alert-success py-2">{success}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="btn btn-primary w-100 mt-2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </button>

            <p className="text-center mt-3">
              Already have an account?{" "}
              <a href="/login" className="text-primary">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
