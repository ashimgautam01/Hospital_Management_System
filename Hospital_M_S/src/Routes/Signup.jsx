import React, { useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBirthdayCake,
  FaUpload,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';

const Signup = () => {
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

  // Alert component (green/teal theme)
  const Alert = ({ type, message, onClose }) => (
    <div
      className={`p-4 rounded-2xl border-2 text-sm flex items-center justify-between transform transition-all duration-300 animate-in slide-in-from-top-2
      ${
        type === 'error'
          ? 'bg-gradient-to-r from-red-50 to-teal-50 border-red-300 text-red-800 shadow-red-100'
          : 'bg-gradient-to-r from-green-50 to-teal-50 border-green-300 text-green-800 shadow-green-100'
      } shadow-lg`}
    >
      <div className="flex items-center space-x-2">
        {type === 'error' ? (
          <FaExclamationCircle className="text-red-500" />
        ) : (
          <FaCheckCircle className="text-green-500" />
        )}
        <span className="font-medium">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-xl font-bold opacity-70 hover:opacity-100 transform hover:scale-110 transition-all duration-200"
      >
        ×
      </button>
    </div>
  );

  const fetchUser = async () => {
    setLoading(true);
    const { name, email, age, password } = data;

    if (!name || !email || !age || !password) {
      setType('error');
      setMessage('Please fill in all fields.');
      setAlert(true);
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      setType('success');
      setMessage('Account created successfully! Welcome aboard! 🎉');
      setAlert(true);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData({ ...data, [name]: name === 'profile' ? files[0] : value });
  };

  // Green/teal icons and focus
  const getFieldIcon = (field) => {
    const iconProps = {
      className: `text-lg transition-all duration-300 ${
        focusedField === field ? 'text-teal-500 scale-110' : 'text-gray-400'
      }`,
    };

    switch (field) {
      case 'name':
        return <FaUser {...iconProps} />;
      case 'email':
        return <FaEnvelope {...iconProps} />;
      case 'age':
        return <FaBirthdayCake {...iconProps} />;
      case 'password':
        return <FaLock {...iconProps} />;
      case 'profile':
        return <FaUpload {...iconProps} />;
      default:
        return null;
    }
  };

  // Input field with green/teal focus
  const InputField = ({ field, type, placeholder, accept }) => (
    <div className="mb-6 group">
      <label
        className={`text-sm font-bold block mb-3 transition-all duration-300 ${
          focusedField === field ? 'text-teal-600 transform scale-105' : 'text-gray-700'
        }`}
      >
        {field.charAt(0).toUpperCase() + field.slice(1)}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          {getFieldIcon(field)}
        </div>
        <input
          name={field}
          onChange={handleChange}
          onFocus={() => setFocusedField(field)}
          onBlur={() => setFocusedField('')}
          type={field === 'password' ? (showPassword ? 'text' : 'password') : type}
          accept={accept}
          required
          className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl text-gray-800 placeholder-gray-400 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none transform hover:-translate-y-0.5 ${
            focusedField === field
              ? 'border-teal-400 bg-teal-50/50 ring-4 ring-teal-100 scale-[1.02]'
              : 'border-gray-200 bg-white hover:border-teal-300'
          } ${
            field === 'profile'
              ? 'file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-teal-100 file:text-teal-700 hover:file:bg-teal-200'
              : ''
          }`}
          placeholder={placeholder}
        />
        {field === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-teal-500 transition-all duration-200 transform hover:scale-110"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
        {/* Floating accent line */}
        <div
          className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-400 to-teal-400 transition-all duration-300 ${
            focusedField === field ? 'w-full' : 'w-0'
          }`}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-teal-100 flex items-center justify-center p-4 relative overflow-hidden">
     
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-300/25 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
 
      <div className="absolute top-10 left-10 w-4 h-4 bg-green-400 rounded-full animate-bounce opacity-60"></div>
      <div className="absolute top-32 right-16 w-3 h-3 bg-teal-400 rounded-full animate-bounce delay-200 opacity-60"></div>
      <div className="absolute bottom-20 left-32 w-5 h-5 bg-teal-400 rounded-full animate-bounce delay-700 opacity-60"></div>

      <div className="relative z-10 w-full max-w-4xl"> 
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-0 md:p-8 flex flex-col md:flex-row items-center md:items-stretch transition-all duration-300">
        
          <div className="md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-teal-500 rounded-3xl md:rounded-r-none md:rounded-l-3xl p-8 text-white text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-600 to-teal-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <FaUser className="text-white text-2xl" />
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-green-200 via-teal-200 to-teal-100 bg-clip-text text-transparent mb-2">
              Join Us Today
            </h1>
            <p className="text-teal-100 font-medium">Create your account and start your journey</p>
            <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mx-auto"></div>
          </div>
          {/* Right: Form */}
          <div className="md:w-1/2 w-full p-8">
            {alerts && (
              <div className="mb-6">
                <Alert type={type} message={message} onClose={() => setAlert(false)} />
              </div>
            )}
            <div className="space-y-2">
              <InputField field="name" type="text" placeholder="Enter your full name" />
              <InputField field="email" type="email" placeholder="Enter your email address" />
              <InputField field="age" type="number" placeholder="Enter your age" />
              <InputField field="password" type="password" placeholder="Create a strong password" />
              <InputField field="profile" type="file" accept="image/*" placeholder="Upload profile picture" />

              <div className="pt-6">
                <button
                  onClick={fetchUser}
                  type="button"
                  disabled={loading}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-green-600 via-teal-600 to-teal-700 hover:from-green-700 hover:via-teal-700 hover:to-teal-800 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-lg">Creating Your Account...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10 text-lg font-bold">Create Account</span>
                      <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-2xl"></div>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-8">
                <p className="text-gray-700 font-medium">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="text-transparent bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text font-bold hover:from-green-700 hover:to-teal-700 transition-all duration-200 hover:scale-105 inline-block transform"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-green-400 to-teal-400 rounded-lg rotate-45 opacity-80"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-teal-400 to-green-400 rounded-full opacity-60"></div>
      </div>
    </div>
  );
};

export default Signup;
