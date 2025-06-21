import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import Alert from "../Components/Alert";

const BookAppointment = ({ isAuthenticated, ismember }) => {
  const [type, SetType] = useState("");
  const [message, setMessage] = useState("");
  const [alerts, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctor] = useState([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    doctorName: "",
    doctorId: "",
    datetime: "", 
    age: "",
    problem: "",
  });

  const getRandomDoctor = () => {
    if (doctors.length === 0) {
      console.warn("No doctors available for random selection");
      return { name: "", id: "" };
    }
    const randomIndex = Math.floor(Math.random() * doctors.length);
    const randomDoctor = doctors[randomIndex];
    return {
      name: randomDoctor.name,
      id: randomDoctor._id,
    };
  };

  const fetchUser = async () => {
    setLoading(true);

    try {
      // Get doctor info - either selected or random
      let finalDoctorName = data.doctorName;
      let finalDoctorId = data.doctorId;

      // If no doctor is selected (for non-members), assign random doctor
      if (!finalDoctorName || !finalDoctorId) {
        const randomDoctor = getRandomDoctor();
        finalDoctorName = randomDoctor.name;
        finalDoctorId = randomDoctor.id;
      }

      // Validate that we have a doctor
      if (!finalDoctorName || !finalDoctorId) {
        SetType("danger");
        setMessage("Unable to assign a doctor. Please try again.");
        setAlert(true);
        return;
      }

      const appointmentData = {
        ...data,
        doctorName: finalDoctorName,
        doctorId: finalDoctorId,
      };

      console.log("Appointment Data:", appointmentData);

      const response = await axios.post(
        "http://localhost:8080/api/v1/appoint/book",
        {
          d_id: appointmentData.doctorId,
          name: appointmentData.name,
          age: appointmentData.age,
          problem: appointmentData.problem,
          date: appointmentData.datetime, 
          doctorName: appointmentData.doctorName,
        },
        {withCredentials: true}
      );

      if (response.status === 200) {
        // Reset form after successful booking
        setData({
          name: "",
          email: "",
          phone: "",
          doctorName: "",
          doctorId: "",
          datetime: "", 
          age: "",
          problem: "",
        });
        
        SetType("success");
        setMessage(
          "Appointment booked successfully. You will be informed further through mail and phone."
        );
        setAlert(true);
      }
    } catch (error) {
      console.error("Booking error:", error);
      if(error.response?.status === 400) {
        SetType("danger");
        setMessage("Date is already booked please try booking date again.");
        setAlert(true);   
      } else {
        SetType("danger");
        setMessage("Failed to book appointment. Please try again.");
        setAlert(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "doctor") {
      const selectedDoctor = doctors.find((doctor) => doctor.name === value);
      if (selectedDoctor) {
        setData({
          ...data,
          doctorName: selectedDoctor.name,
          doctorId: selectedDoctor._id,
        });
      } else {
        // Clear doctor selection if invalid
        setData({
          ...data,
          doctorName: "",
          doctorId: "",
        });
      }
    } else {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const getDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/doctor/getdoctors');
      if (response && response.data?.data) {
        console.log("Doctors fetched:", response.data.data);
        setDoctor(response.data.data);
      } else {
        console.warn("No doctors data received");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      SetType("danger");
      setMessage("Failed to load doctors. Please refresh the page.");
      setAlert(true);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
    getDoctors();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.age || !data.problem || !data.datetime) {
      SetType("danger");
      setMessage("Please fill in all required fields.");
      setAlert(true);
      return;
    }

    // For members, ensure they selected a doctor
    if (ismember && (!data.doctorName || !data.doctorId)) {
      SetType("danger");
      setMessage("Please select a doctor.");
      setAlert(true);
      return;
    }

    // Check if doctors are loaded for non-members
    if (!ismember && doctors.length === 0) {
      SetType("danger");
      setMessage("Doctors list not loaded. Please refresh the page.");
      setAlert(true);
      return;
    }

    fetchUser();
  };

  return (
    <>
      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(135deg, #065f46 0%, #0f766e 25%, #14b8a6 50%, #5eead4 75%, #ccfbf1 100%);
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .input-focus {
          transition: all 0.3s ease;
        }
        
        .input-focus:focus {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(20, 184, 166, 0.3);
        }
        
        .btn-gradient {
          background: linear-gradient(135deg, #059669, #0d9488);
          transition: all 0.3s ease;
        }
        
        .btn-gradient:hover {
          background: linear-gradient(135deg, #047857, #0f766e);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(5, 150, 105, 0.4);
        }
        
        .floating-icon {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .pulse-border {
          animation: pulse-border 2s infinite;
        }
        
        @keyframes pulse-border {
          0% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(20, 184, 166, 0); }
          100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0); }
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
      `}</style>

      {!isAuthenticated ? (
        <>
          {alerts && (
            <div className="ml-5 py-20 -mb-20">
              <Alert
                type={type}
                message={message}
                onClose={() => setAlert(false)}
              />
            </div>
          )}
          <div className="min-h-screen gradient-bg flex flex-col justify-center items-center">
            <div className="glass-card rounded-3xl p-12 shadow-2xl max-w-md mx-auto text-center card-hover">
              <div className="floating-icon mb-8">
                <svg className="w-24 h-24 mx-auto text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gradient mb-4">
                Authentication Required
              </h1>
              <p className="text-emerald-700 text-lg mb-8">
                Please login or sign up to book your appointment
              </p>
              <div className="space-y-4">
                <button className="w-full py-3 px-6 btn-gradient text-white font-semibold rounded-xl">
                  Login
                </button>
                <button className="w-full py-3 px-6 border-2 border-teal-500 text-teal-600 font-semibold rounded-xl hover:bg-teal-50 transition-all duration-300">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="min-h-screen gradient-bg">
            <div className="py-20 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-around items-center gap-12">
                  <div data-aos="zoom-out" className="floating-icon">
                    <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-2xl">
                      <svg className="w-32 h-32 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
                      </svg>
                    </div>
                  </div>
                  <div data-aos="fade-left" className="text-center lg:text-left">
                    <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                      Book Your
                      <span className="block ">Appointment</span>
                    </h1>
                    <p className="text-xl text-emerald-100 mb-8 max-w-md">
                      Connect with expert doctors and get the care you deserve
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-white text-sm">24/7 Available</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                        <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                        <span className="text-white text-sm">Expert Doctors</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
 
            <div className="text-center mb-12">
              <div data-aos="fade-up" className="inline-block">
                <div className="pulse-border rounded-full p-4 bg-white/20 backdrop-blur-sm flex flex-col items-center">
                  <svg className="w-8 h-8 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <p className="text-white mt-4 font-semibold p-2">Scroll Down to Book Appointment</p>
                </div>
              </div>
            </div>

            <div className="pb-20 px-4">
              <div className="max-w-4xl mx-auto">
                <div data-aos="flip-up" className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">
                    Book an Appointment
                  </h2>
                  <p className="text-xl text-emerald-100 mb-2">
                    Connect with {ismember ? 'your preferred' : 'our expert'} doctors
                  </p>
                  {ismember && (
                    <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      ✨ Premium Member - Choose Your Doctor
                    </div>
                  )}
                </div>

                <div className="glass-card rounded-3xl p-8 lg:p-12 shadow-2xl card-hover">
                  <form className="space-y-8" onSubmit={handleSubmit} data-aos="fade-up">
                  
                    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-l-4 border-teal-500 p-6 rounded-r-xl">
                      <div className="flex items-center mb-4">
                        <svg className="w-6 h-6 text-teal-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        <h3 className="text-lg font-semibold text-teal-800">Important Information</h3>
                      </div>
                      <ul className="space-y-3 text-sm text-teal-700">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          Please ensure all details are correct before booking
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          You'll receive confirmation via email and phone
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {!ismember && "A doctor will be randomly assigned for you"}
                          {ismember && "View your appointments on the doctor's profile"}
                        </li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"> 
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gradient mb-4">Personal Information</h3>
                        
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-emerald-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            className="input-focus w-full rounded-xl border-2 border-teal-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 px-4 py-3 text-gray-700"
                            placeholder="Enter your full name"
                            required
                            maxLength={50}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="age" className="block text-sm font-medium text-emerald-700 mb-2">
                              Age *
                            </label>
                            <input
                              type="number"
                              id="age"
                              name="age"
                              value={data.age}
                              className="input-focus w-full rounded-xl border-2 border-teal-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 px-4 py-3 text-gray-700"
                              placeholder="Age"
                              required
                              min="1"
                              max="120"
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-emerald-700 mb-2">
                              Phone *
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={data.phone}
                              className="input-focus w-full rounded-xl border-2 border-teal-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 px-4 py-3 text-gray-700"
                              placeholder="Phone number"
                              required
                              pattern="[0-9]{10}"
                              maxLength={10}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-emerald-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            className="input-focus w-full rounded-xl border-2 border-teal-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 px-4 py-3 text-gray-700"
                            placeholder="Enter your email"
                            required
                            maxLength={50}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
 
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gradient mb-4">Appointment Details</h3>
                        
                        {ismember && (
                          <div>
                            <label htmlFor="doctor" className="block text-sm font-medium text-emerald-700 mb-2">
                              Choose Your Doctor *
                            </label>
                            <select
                              id="doctor"
                              name="doctor"
                              value={data.doctorName}
                              onChange={handleChange}
                              className="input-focus w-full rounded-xl border-2 border-teal-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 px-4 py-3 text-gray-700"
                              required={ismember}
                            >
                              <option value="" disabled>Select a doctor</option>
                              {doctors.map((doctor) => (
                                <option key={doctor._id} value={doctor.name}>
                                  {doctor.name} - {doctor.specialization}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}

                        {!ismember && doctors.length > 0 && (
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-center mb-2">
                              <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                              <span className="text-blue-800 font-medium">Doctor Assignment</span>
                            </div>
                            <p className="text-blue-700 text-sm">
                              A suitable doctor will be automatically assigned based on your problem description.
                            </p>
                          </div>
                        )}

                        <div>
                          <label htmlFor="datetime" className="block text-sm font-medium text-emerald-700 mb-2">
                            Preferred Date & Time *
                          </label>
                          <input
                            type="datetime-local"
                            name="datetime"
                            id="datetime"
                            className="input-focus w-full rounded-xl border-2 border-teal-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 px-4 py-3 text-gray-700"
                            required
                            value={data.datetime}
                            min={new Date().toISOString().slice(0, 16)}
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          <label htmlFor="problem" className="block text-sm font-medium text-emerald-700 mb-2">
                            Problem Description *
                          </label>
                          <textarea
                            name="problem"
                            id="problem"
                            rows={5}
                            className="input-focus w-full rounded-xl border-2 border-teal-600 shadow-sm focus:border-teal-500 focus:ring-teal-500 px-4 py-3 text-gray-700 resize-none"
                            placeholder="Please describe your symptoms or concerns in detail..."
                            required
                            maxLength={500}
                            value={data.problem}
                            onChange={handleChange}
                          />
                          <div className="text-right text-sm text-gray-500 mt-1">
                            {data.problem.length}/500 characters
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 px-8 btn-gradient text-white font-semibold rounded-xl text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Booking Your Appointment...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Book Appointment
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {alerts && (
        <div className="fixed top-4 right-4 z-50">
          <Alert
            type={type}
            message={message}
            onClose={() => setAlert(false)}
          />
        </div>
      )}
    </>
  );
};

export default BookAppointment;

  // sessionStorage.setItem('doctor-token',response.data.data.id)
  //       sessionStorage.setItem('photo',response.data.data.photo)
  //       sessionStorage.setItem('name',response.data.data.name)