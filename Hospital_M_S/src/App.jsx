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

function App() {
  const location = useLocation();
  const showNavbar =
    location.pathname !== "/admin" &&
    !location.pathname.startsWith("/doctor/") &&
    !location.pathname.startsWith("/staff")
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [ismember, setismember] = useState(false);
  const [isStaff, setisStaff] = useState("");
  useEffect(() => {
    const getuser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/users/getuser",
          { withCredentials: true }
        );
        if (response.status == 200) {
          setismember(response.data.data.user.ismember);
          setisStaff(response.data.data.user.role);
          setisAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getuser();
  }, []);
  return (
    <div>
      {showNavbar && <Navbar isAuthenticated={isAuthenticated} />}
      <Routes>
<Route path="*" element={<Home isStaff={isStaff} />} />
        <Route path="/" element={<Home isStaff={isStaff} />} />
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
        <Route path="/doctor/doctorpage" element={<DoctorPage />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
       {isStaff && (
  <>
    <Route path="/staff" element={<Staff />} />
    <Route path="/doctor/patient_info/:id" element={<Patient_info />} />
    <Route path="/staff/doctorchange" element={<DoctorChange />} />
    <Route path="/staff/pharmacy" element={<Pharmacy />} />
    <Route path="/staff/lab" element={<Lab />} />
    <Route path="/staff/lab-reports" element={<LabReportsPage />} />
  </>
)}
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
