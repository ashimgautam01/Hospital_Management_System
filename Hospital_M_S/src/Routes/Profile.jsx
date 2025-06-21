import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Components/Card';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const Profile = ({ authToken, isAuthenticated }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [userHistory, setUserHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // You can adjust this number

  useEffect(() => {
    AOS.init({ duration: 2000, once: true });
    
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/users/getuser", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUserData(response.data.data.user);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Fetch User Data Error:", error);
        setError("An error occurred while fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authToken]);

  useEffect(() => {
    const fetchUserHistory = async () => {
      if (userData._id) {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/users/gethistory/${userData._id}`);
          if (response.status === 200) {
            console.log(response.data);
            setUserHistory(response.data.data.user);
          } else {
            setError("Failed to fetch user history");
          }
        } catch (error) {
          console.error("Fetch User History Error:", error);
          setError("An error occurred while fetching user history");
        }
      }
    };

    fetchUserHistory();
  }, [userData]);

  // Pagination logic
  const totalPages = Math.ceil(userHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = userHistory.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to appointment history section
    const historySection = document.getElementById('appointment-history');
    if (historySection) {
      historySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="glass-card rounded-3xl p-8 text-center">
          <div className="animate-spin w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-teal-700 text-lg font-semibold">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="glass-card rounded-3xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <p className="text-red-600 text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(135deg, #065f46 0%, #0f766e 25%, #14b8a6 50%, #5eead4 75%, #ccfbf1 100%);
          min-height: 100vh;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .profile-image {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .profile-image:hover {
          transform: scale(1.05);
        }
        
        .profile-image::before {
          content: '';
          position: absolute;
          inset: -4px;
          padding: 4px;
          background: linear-gradient(135deg, #14b8a6, #059669);
          border-radius: 50%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        
        .stats-card {
          background: linear-gradient(135deg, rgba(20, 184, 166, 0.1), rgba(5, 150, 105, 0.1));
          border: 1px solid rgba(20, 184, 166, 0.2);
        }
        
        .floating-icon {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #065f46, #0d9488, #14b8a6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(20, 184, 166, 0.2);
        }
        
        .pulse-ring {
          animation: pulse-ring 2s infinite;
        }
        
        @keyframes pulse-ring {
          0% { transform: scale(0.33); }
          40%, 50% { opacity: 1; }
          100% { opacity: 0; transform: scale(1.2); }
        }
        
        .info-item {
          position: relative;
          padding: 1.5rem;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
          border: 1px solid rgba(20, 184, 166, 0.1);
          transition: all 0.3s ease;
        }
        
        .info-item:hover {
          transform: translateX(10px);
          border-color: rgba(20, 184, 166, 0.3);
          box-shadow: 0 10px 25px rgba(20, 184, 166, 0.1);
        }
        
        .history-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .pagination-button {
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(20, 184, 166, 0.2);
        }

        .pagination-button:hover {
          background: linear-gradient(135deg, #14b8a6, #059669);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(20, 184, 166, 0.3);
        }

        .pagination-button.active {
          background: linear-gradient(135deg, #14b8a6, #059669);
          color: white;
          box-shadow: 0 8px 20px rgba(20, 184, 166, 0.3);
        }

        .pagination-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-button:disabled:hover {
          background: rgba(255, 255, 255, 0.9);
          color: inherit;
          transform: none;
          box-shadow: none;
        }
      `}</style>

      {!isAuthenticated ? (
        <div className="min-h-screen gradient-bg flex flex-col justify-center items-center px-4">
          <div className="glass-card rounded-3xl p-12 shadow-2xl max-w-md mx-auto text-center card-hover">
            <div className="floating-icon mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-red-400 rounded-full pulse-ring"></div>
                <svg className="w-24 h-24 mx-auto text-red-500 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-8h2v6h-2V9z"/>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gradient mb-4">
              Access Restricted
            </h1>
            <p className="text-emerald-700 text-lg mb-8">
              Please login or sign up to view your profile
            </p>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/login')}
                className="w-full py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="w-full py-3 px-6 border-2 border-teal-500 text-teal-600 font-semibold rounded-xl hover:bg-teal-50 transition-all duration-300"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="gradient-bg">
          {/* Header Section */}
          <div className="pt-20 pb-10 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 data-aos='fade-up' className="text-5xl md:text-6xl font-bold text-white mb-4">
                Your Profile
              </h1>
              <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                Manage your account and view your medical history
              </p>
            </div>
          </div>

          {/* Profile Section */}
          <div className="px-4 pb-10">
            <div className="max-w-6xl mx-auto">
              <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl card-hover">
                {/* Profile Header */}
                <div className="flex flex-col items-center mb-12" data-aos="zoom-in">
                  <div className="profile-image mb-6">
                    <img 
                      src={userData.profile || "https://via.placeholder.com/150/14b8a6/ffffff?text=User"} 
                      alt="User Profile" 
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-2xl" 
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                      {userData.name || 'Loading...'}
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-emerald-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      <span className="font-semibold">Verified Account</span>
                    </div>
                  </div>
                </div>

                {/* Profile Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  <div className="info-item rounded-2xl" data-aos="slide-right">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700">Email Address</h3>
                    </div>
                    <p className="text-gray-600 text-lg ml-14">{userData.email}</p>
                  </div>

                  <div className="info-item rounded-2xl" data-aos="slide-left">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-700">Member Since</h3>
                    </div>
                    <p className="text-gray-600 text-lg ml-14">
                      {new Date(userData.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="stats-card rounded-2xl p-6 text-center" data-aos="fade-up" data-aos-delay="100">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-teal-600 mb-1">{userHistory.length}</h3>
                    <p className="text-gray-600 font-medium">Total Appointments</p>
                  </div>

                  <div className="stats-card rounded-2xl p-6 text-center" data-aos="fade-up" data-aos-delay="200">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-600 mb-1">Active</h3>
                    <p className="text-gray-600 font-medium">Account Status</p>
                  </div>

                  <div className="stats-card rounded-2xl p-6 text-center" data-aos="fade-up" data-aos-delay="300">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-teal-600 mb-1">Premium</h3>
                    <p className="text-gray-600 font-medium">Membership</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment History Section */}
          <div id="appointment-history" className="px-4 pb-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 data-aos='flip-up' className="text-4xl font-bold text-white mb-4">
                  Appointment History
                </h2>
                <p className="text-xl text-emerald-100">
                  Track your medical consultations and treatments
                </p>
                {userHistory.length > 0 && (
                  <p className="text-emerald-200 mt-2">
                    Showing {startIndex + 1}-{Math.min(endIndex, userHistory.length)} of {userHistory.length} appointments
                  </p>
                )}
              </div>

              {userHistory.length > 0 ? (
                <>
                  <div className="history-grid" data-aos="fade-up">
                    {currentAppointments.map((appointment, index) => (
                      <div 
                        key={appointment._id} 
                        className="card-hover"
                        data-aos="zoom-in"
                        data-aos-delay={index * 100}
                      >
                        <Card
                          date={new Date(appointment.Date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                          problem={appointment.problem}
                          response={appointment.response}
                          medicine={appointment.medicine}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Pagination Component */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center items-center">
                      <div className="glass-card rounded-2xl p-4 shadow-lg">
                        <div className="flex items-center space-x-2">
                          {/* Previous Button */}
                          <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="pagination-button px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 disabled:opacity-50"
                          >
                            <svg className="w-4 h-4 mr-1 inline" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                            </svg>
                            Previous
                          </button>

                          {/* Page Numbers */}
                          <div className="flex space-x-1">
                            {getPageNumbers().map((page, index) => (
                              <button
                                key={index}
                                onClick={() => typeof page === 'number' && handlePageChange(page)}
                                disabled={page === '...'}
                                className={`pagination-button px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 min-w-[40px] ${
                                  page === currentPage ? 'active' : ''
                                } ${page === '...' ? 'cursor-default' : ''}`}
                              >
                                {page}
                              </button>
                            ))}
                          </div>

                          {/* Next Button */}
                          <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="pagination-button px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 disabled:opacity-50"
                          >
                            Next
                            <svg className="w-4 h-4 ml-1 inline" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="glass-card rounded-3xl p-12 text-center max-w-md mx-auto">
                  <div className="floating-icon mb-6">
                    <svg className="w-16 h-16 mx-auto text-teal-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">No Appointments Yet</h3>
                  <p className="text-gray-600 mb-6">Start yofur healthcare journey by booking your first appointment.</p>
                  <button 
                    onClick={() => navigate('/book-appointment')}
                    className="py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Book Appointment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;