import React, { useEffect, useState } from 'react';
import axios from 'axios';
import image from '../assets/img/otp.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Alert from '../Components/Alert';
import { useParams, useNavigate } from 'react-router-dom';

const Otp_verify = ({ isAuthenticated }) => {
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [alerts, setAlert] = useState(false);
  const [otp, setOtp] = useState({ otp: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/users/verify/${id}`, otp);
      if (response.status === 200) {
        setType('success');
        setMessage('✅ Registration Successful! Redirecting to login...');
        setAlert(true);
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      } else {
        setType('error');
        setMessage('Registration Unsuccessful');
        setAlert(true);
      }
    } catch (error) {
      setType('error');
      setMessage(error.response?.data?.message || '❌ Invalid OTP, please try again');
      setAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/users/resend/${id}`);
      if (response.status === 200) {
        setType('success');
        setMessage('📧 OTP has been resent to your email');
      } else {
        setType('error');
        setMessage('❌ Failed to resend OTP');
      }
      setAlert(true);
    } catch (error) {
      setType('error');
      setMessage('⚠️ Could not resend OTP, please try again later');
      setAlert(true);
    } finally {
      setIsResending(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOtp((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
  }, []);

  if (isAuthenticated) {
    return (
      <div className="py-20 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {alerts && (
          <Alert type={type} message={message} onClose={() => setAlert(false)} />
        )}
        <img
          data-aos="zoom-in"
          className="w-72 mb-8"
          src="https://img.freepik.com/free-vector/403-error-forbidden-with-police-concept-illustration_114360-1904.jpg?t=st=1722009703~exp=1722013303~hmac=f8743ec79b03629cd8f7be7a5632551c77d7ed3ac0ce8847be37ac115ee55a67&w=360"
          alt="403 Error"
        />
        <h1 className="text-xl font-bold text-cyan-800 text-center">Please Login / Sign Up First</h1>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-cyan-100 to-blue-50 min-h-screen flex items-center justify-center px-4">
      {alerts && (
        <div className="absolute top-5 left-5 right-5 z-50">
          <Alert type={type} message={message} onClose={() => setAlert(false)} />
        </div>
      )}
      <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-xl shadow-2xl p-10 gap-8">
        <img
          data-aos="zoom-in"
          className="w-60 hidden md:block"
          src={image}
          alt="OTP"
        />
        <div data-aos="fade-up" className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-cyan-700 mb-2">OTP Verification</h2>
          <p className="text-sm text-gray-600 text-center mb-6">Enter the 6-digit code sent to your email</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="otp"
              id="otp"
              maxLength={6}
              onChange={handleChange}
              required
              placeholder="Enter OTP"
              className="w-full px-4 py-3 border border-cyan-500 rounded-lg text-lg focus:ring-2 focus:ring-cyan-600 outline-none transition-all"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-70"
            >
              {isSubmitting ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResending}
              className="w-full py-3 border border-cyan-700 text-cyan-700 hover:bg-cyan-700 hover:text-white font-semibold rounded-lg transition duration-200 disabled:opacity-70"
            >
              {isResending ? 'Resending...' : 'Resend OTP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp_verify;
