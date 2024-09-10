import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
import Menu from "./pages/Menu";
import Dine from "./pages/Dine";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Edit from "./pages/Edit";
import OrderDone from "./pages/OrderDone";
import Info from "./pages/Info";
import OrderHistory from "./pages/OrderHistory";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/dine-in" element={<Dine />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile/:uid" element={<Profile />} />
        <Route path="/profile/:uid/edit" element={<Edit />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-confirmation/:orderID" element={<OrderDone />} />
        <Route path="/payment/:orderID" element={<Info />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
