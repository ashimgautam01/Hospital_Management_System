import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import Home from "./Routes/Home";
import Signup from "./Routes/Signup";
import Navbar from "./Components/Navbar";
import Membership from "./Routes/Membership";
import BookAppointment from "./Routes/Bookappointment";
import Profile from "./Routes/Profile";
import Contact from "./Routes/Contact";
import About from "./Routes/About";
import Payment from "./Components/Checkoutform";
import Login from "./Routes/Login";
import Otp_verify from "./Routes/Otp_verify";
import MedicineSearch from "./Routes/DrugInfo";
import Admin from "./Routes/Special_Routes/Admin";
import DoctorPage from "./Routes/Special_Routes/Doctorpage";
import DoctorLogin from "./Routes/Special_Routes/Doctor_login";
import Patient_info from "./Routes/Special_Routes/Patient_info";
import Staff from "./Routes/Special_Routes/Staff";
import Staffs from "./Routes/Staffs";
import axios from "axios";
import DoctorChange from "./Routes/Special_Routes/DoctorChange";
import Pharmacy from "./Routes/Special_Routes/Pharmacy";
import Lab from "./Routes/Special_Routes/Lab";
import LabReportsPage from "./Routes/Special_Routes/Lab_Report";
import ProtectedRoute from "./Protected";

function App() {
  const location = useLocation();
  const showNavbar =
    location.pathname !== "/admin" &&
    !location.pathname.startsWith("/doctor/") &&
    !location.pathname.startsWith("/staff");

  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [ismember, setismember] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/getuser",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setismember(response.data.data.user.ismember);
          setRole(response.data.data.user.role);
          setisAuthenticated(true);
        }
      } catch (error) {
        setisAuthenticated(false);
        setRole("");
        setismember(false);
      } finally {
        setLoading(false); 
      }
    };
    getuser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      {showNavbar && <Navbar isAuthenticated={isAuthenticated} />}
      <Routes>
        <Route path="*" element={<Home isStaff={role} />} />
        <Route path="/" element={<Home isStaff={role} />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/membership" element={<Membership />} />
        <Route
          path="/appointment"
          element={
            <BookAppointment
              ismember={ismember}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        {isAuthenticated && (
          <Route
            path="/profile"
            element={<Profile isAuthenticated={isAuthenticated} />}
          />
        )}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/checkout"
          element={<Payment isAuthenticated={isAuthenticated} />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/otpverification/:id"
          element={<Otp_verify isAuthenticated={isAuthenticated} />}
        />
        <Route path="/medicineinfo" element={<MedicineSearch />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/staffs" element={<Staffs />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />

        <Route path="/doctor/doctorpage" element={<DoctorPage />} />
        <Route path="/doctor/patient_info/:id" element={<Patient_info />} />

        <Route
          path="/staff"
          element={
            <ProtectedRoute isAllowed={role === "staff"}>
              <Staff />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/doctorchange"
          element={
            <ProtectedRoute isAllowed={role === "staff"}>
              <DoctorChange />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/pharmacy"
          element={
            <ProtectedRoute isAllowed={role === "staff"}>
              <Pharmacy />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/lab"
          element={
            <ProtectedRoute isAllowed={role === "staff"}>
              <Lab />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/lab-reports"
          element={
            <ProtectedRoute isAllowed={role === "staff"}>
              <LabReportsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
