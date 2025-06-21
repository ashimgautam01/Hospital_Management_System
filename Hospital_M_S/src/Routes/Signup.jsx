import React, { useState } from 'react';
import {
  FaUser, FaEnvelope, FaLock, FaBirthdayCake,
  FaUpload, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationCircle,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate=useNavigate()
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [alerts, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [data, setData] = useState({
    name: '',
    email: '',
    age: '',
    profile: null,
    password: '',
  });

  const Alert = ({ type, message, onClose }) => (
    <div className={`p-3 rounded-xl flex items-center justify-between shadow-md border mb-4
      ${type === 'error' ? 'bg-red-100 border-red-300 text-red-800' : 'bg-green-100 border-green-300 text-green-800'}`}>
      <div className="flex items-center gap-2">
        {type === 'error' ? <FaExclamationCircle /> : <FaCheckCircle />}
        <span>{message}</span>
      </div>
      <button onClick={onClose} className="text-xl font-bold hover:opacity-75">&times;</button>
    </div>
  );

  const validateForm = () => {
    const { name, email, age, password, profile } = data;
    
    if (!name.trim()) {
      setType('error');
      setMessage('Name is required');
      setAlert(true);
      return false;
    }
    
    if (!email.trim()) {
      setType('error');
      setMessage('Email is required');
      setAlert(true);
      return false;
    }
     
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setType('error');
      setMessage('Please enter a valid email address');
      setAlert(true);
      return false;
    }
    
    if (!age || age <= 0) {
      setType('error');
      setMessage('Please enter a valid age');
      setAlert(true);
      return false;
    }
    
    if (!password.trim()) {
      setType('error');
      setMessage('Password is required');
      setAlert(true);
      return false;
    }
    
    if (password.length < 6) {
      setType('error');
      setMessage('Password must be at least 6 characters long');
      setAlert(true);
      return false;
    }
    
    if (!profile) {
      setType('error');
      setMessage('Profile photo is required');
      setAlert(true);
      return false;
    }
    
    return true;
  };

  const fetchUser = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try { 
      const formData = new FormData();
      formData.append('name', data.name.trim());
      formData.append('email', data.email.trim());
      formData.append('age', data.age);
      formData.append('password', data.password);
      formData.append('profile', data.profile);

      const response = await fetch('http://localhost:8080/api/v1/users/register', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        const userId = result.data?._id;
        setType('success');
        setMessage(result.message || 'User registered successfully! Please check your email for verification.');
        setAlert(true);
         
        setData({
          name: '',
          email: '',
          age: '',
          profile: null,
          password: '',
        }); 
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
        if (userId) {
          navigate(`/otpverification/${userId}`);
        }
      } else {
        setType('error');
        setMessage(result.message || 'Registration failed. Please try again.');
        setAlert(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setType('error');
      setMessage('Network error. Please check your connection and try again.');
      setAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'profile') {
      const file = files[0];
      if (file) { 
        if (!file.type.startsWith('image/')) {
          setType('error');
          setMessage('Please select a valid image file');
          setAlert(true);
          return;
        }
         
        if (file.size > 5 * 1024 * 1024) {
          setType('error');
          setMessage('Image size should be less than 5MB');
          setAlert(true);
          return;
        }
      }
    }
    
    setData(prev => ({
      ...prev,
      [name]: name === 'profile' ? files[0] : value,
    }));
  };

  const inputIcon = {
    name: <FaUser />,
    email: <FaEnvelope />,
    age: <FaBirthdayCake />,
    password: <FaLock />,
    profile: <FaUpload />,
  };

  const renderInput = (field, type, placeholder, accept = '') => (
    <div className="mb-4 relative">
      <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 z-10">
        {inputIcon[field]}
      </div>
      <input
        name={field}
        type={field === 'password' ? (showPassword ? 'text' : 'password') : type}
        value={field !== 'profile' ? data[field] : undefined}
        onChange={handleChange}
        onFocus={() => setFocusedField(field)}
        onBlur={() => setFocusedField('')}
        accept={accept}
        required
        className={`w-full pl-10 pr-10 py-3 rounded-xl border-2 text-sm transition-all duration-200
          ${focusedField === field ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}
          focus:outline-none focus:ring-2 focus:ring-teal-300 hover:border-gray-300`}
        placeholder={placeholder}
      />
      {field === 'password' && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 z-10"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      )}
      {field === 'profile' && data.profile && (
        <div className="mt-2 text-sm text-gray-600">
          Selected: {data.profile.name}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-teal-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl flex w-full max-w-5xl overflow-hidden">
        {/* Left side - Welcome section */}
        <div className="w-1/2 bg-gradient-to-br from-green-500 to-teal-500 p-8 flex flex-col justify-center text-white">
          <div className="text-center">
            <div className="text-5xl mb-4 flex justify-center"><FaUser /></div>
            <h2 className="text-3xl font-bold mb-2">Welcome!</h2>
            <p className="text-teal-100">Sign up to start your health journey</p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-1/2 p-8 bg-white">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h3>
            
            {alerts && (
              <Alert type={type} message={message} onClose={() => setAlert(false)} />
            )}
            
            <div className="space-y-4">
              {renderInput("name", "text", "Your full name")}
              {renderInput("email", "email", "Your email address")}
              {renderInput("age", "number", "Your age")}
              {renderInput("password", "password", "Create a password")}
              {renderInput("profile", "file", "Upload profile photo", "image/*")}

              <button
                type="button"
                onClick={fetchUser}
                disabled={loading}
                className={`w-full py-3 rounded-xl font-bold text-white transition duration-300 
                  ${loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 hover:shadow-lg'
                  }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Already have an account?
                <span className="ml-1 text-teal-600 font-semibold cursor-pointer hover:underline">
                  Sign In
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;