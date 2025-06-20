import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  User,
  LogOut,
  Calendar,
  Pill,
  Crown,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import Login from "../Routes/Login";

const Navbar = ({ isAuthenticated }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ShowLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:8080/api/v1/users/logout", {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const navLinks = [
    { to: "/medicineinfo", label: "Search Medicines", icon: Pill },
    { to: "/appointment", label: "Book Appointment", icon: Calendar },
    { to: "/membership", label: "Memberships", icon: Crown },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      } py-4`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-green-950">
          HealthHub
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center space-x-1 text-gray-900 hover:text-teal-600 transition"
            >
              <link.icon className="w-5 h-5 " />
              <span className="text-gray-900">{link.label}</span>
            </Link>
          ))}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center space-x-1 bg-teal-800 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
              <Link
                to={"/register"}
                className="flex items-center space-x-1 bg-teal-800 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition"
              >
                <LogIn className="w-4 h-4" />
                <span> Sign In</span>
              </Link>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pt-4 pb-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-2 text-gray-700 hover:text-teal-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="w-full text-left py-2 text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          ) : (
            <div className="flex gap-2">
              <button
              onClick={() => {
                setShowLogin(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 text-teal-600 hover:text-teal-700"
            >
              Login
            </button>
            <Link
              to={'/'}
              className="w-full text-left py-2 text-teal-600 hover:text-teal-700"
            >
              Login
            </Link>
            </div>
          )}
        </div>
      )}
    {ShowLogin && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <Login setShowLogin={setShowLogin} />
  </div>
)}


    </nav>
  );
};

export default Navbar;
