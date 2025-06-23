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
  UserCircle,
  ChevronDown,
  Heart,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Login from "../Routes/Login";

const Navbar = ({ isAuthenticated, user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [ShowLogin, setShowLogin] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
 
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    { to: "/medicineinfo", label: "Search Medicines", icon: Pill, color: "text-blue-600" },
    { to: "/appointment", label: "Book Appointment", icon: Calendar, color: "text-green-600" },
    { to: "/membership", label: "Memberships", icon: Crown, color: "text-yellow-600" },
  ];

  const profileMenuItems = [
    { to: "/profile", label: "My Profile", icon: User },
    { to: "/appointments", label: "My Appointments", icon: Calendar },
  ];
 
  const getNavbarBackground = () => {
    if (isHomePage) {
      return isScrolled 
        ? "bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100"
        : "bg-transparent";
    } else {
      return isScrolled 
        ? "bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100  x" 
        : "bg-gradient-to-r from-white/90 to-teal-50/90 backdrop-blur-sm";
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${getNavbarBackground()} py-3`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
         
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-green-700 bg-clip-text text-transparent">
            HealthHub
          </span>
        </Link>
 
        <div className="hidden md:flex space-x-2 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center space-x-2  hover:text-teal-600 px-4 py-2 rounded-xl hover:bg-teal-50/70 transition-all duration-300 group"
            >
              <link.icon className={`w-5 h-5 ${link.color} group-hover:scale-110 transition-transform`} />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
 
          {isAuthenticated ? (
            <div className="flex items-center space-x-3 ml-4">
              <div className="relative profile-dropdown">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-3 bg-gradient-to-r from-teal-50 to-green-50 hover:from-teal-100 hover:to-green-100 px-4 py-2 rounded-xl border border-teal-200 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  {/* <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">
                      {user?.username || user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-600 truncate max-w-24">
                      {user?.email || "user@example.com"}
                    </p>
                  </div> */}
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                    isProfileDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                 {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in slide-in-from-top-5 duration-200">
             
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          {/* <p className="font-semibold text-gray-800">{user?.username || user?.name || "User Name"}</p>
                          <p className="text-sm text-gray-600">{user?.email || "user@example.com"}</p> */}
                          <div className="flex items-center space-x-1 mt-1">
                            <Crown className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-yellow-600 font-medium">Premium Member</span>
                          </div>
                        </div>
                      </div>
                    </div> 
                    <div className="py-2">
                      {profileMenuItems.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors duration-200"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
 
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileDropdownOpen(false);
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3 ml-4">
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center space-x-2 text-teal-700 hover:text-teal-800 px-4 py-2 rounded-xl hover:bg-teal-50 transition-all duration-300 font-medium"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
              <Link
                to="/register"
                className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white px-6 py-2 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <UserCircle className="w-4 h-4" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>
 
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl hover:bg-teal-50 transition-colors duration-300"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div> 
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg shadow-xl border-t border-gray-100 animate-in slide-in-from-top-5 duration-300">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center space-x-3 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl px-3 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon className={`w-5 h-5 ${link.color}`} />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="pt-4 border-t border-gray-200 space-y-2">
         
                <div className="flex items-center space-x-3 px-3 py-2 bg-teal-50 rounded-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user?.username || user?.name || "User"}</p>
                    <p className="text-sm text-gray-600">{user?.email || "user@example.com"}</p>
                  </div>
                </div> 
                {profileMenuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center space-x-3 py-3 text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-xl px-3 transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full py-3 text-red-600 hover:bg-red-50 rounded-xl px-3 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button
                  onClick={() => {
                    setShowLogin(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full py-3 text-teal-600 hover:bg-teal-50 rounded-xl px-3 transition-all duration-300"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </button>
                <Link
                  to="/register"
                  className="flex items-center space-x-3 w-full py-3 text-teal-600 hover:bg-teal-50 rounded-xl px-3 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserCircle className="w-5 h-5" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
 
      {ShowLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="animate-in zoom-in-95 duration-300">
            <Login setShowLogin={setShowLogin} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;