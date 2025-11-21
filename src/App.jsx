import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/user/Home";
import About from "./components/user/About";
import Book from "./components/user/Book";
import Contact from "./components/user/Contact";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import BookDetails from "./components/user/BookDetails";
import Cart from "./components/user/Cart";
import Payment from "./components/user/Payment";

import AdminDashboard from "./components/admin/AdminDashboard";
import AdminBooks from "./components/admin/AdminBooks";
import AdminUsers from "./components/admin/AdminUsers";
import AdminOrders from "./components/admin/AdminOrders";

import NotFound from "./components/user/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<Book />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/book/:id" element={<BookDetails />} />

        {/* Cart & Payment (now public) */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />

        {/* Admin pages (now public) */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<AdminBooks />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/orders" element={<AdminOrders />} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
