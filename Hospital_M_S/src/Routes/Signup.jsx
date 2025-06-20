import React, { useState } from 'react';
import {
  FaUser, FaEnvelope, FaLock, FaBirthdayCake,
  FaUpload, FaEye, FaEyeSlash, FaCheckCircle, FaExclamationCircle,
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

  const Alert = ({ type, message, onClose }) => (
    <div className={`p-3 rounded-xl flex items-center justify-between shadow-md border
      ${type === 'error' ? 'bg-red-100 border-red-300 text-red-800' : 'bg-green-100 border-green-300 text-green-800'}`}>
      <div className="flex items-center gap-2">
        {type === 'error' ? <FaExclamationCircle /> : <FaCheckCircle />}
        <span>{message}</span>
      </div>
      <button onClick={onClose} className="text-xl font-bold">&times;</button>
    </div>
  );

  const fetchUser = () => {
    const { name, email, age, password } = data;
    setLoading(true);
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
      setMessage('Account created successfully!');
      setAlert(true);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
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
      <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
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
        className={`w-full pl-10 pr-10 py-3 rounded-xl border-2 text-sm
          ${focusedField === field ? 'border-teal-500 bg-teal-50' : 'border-gray-200'}
          focus:outline-none focus:ring-2 focus:ring-teal-300`}
        placeholder={placeholder}
      />
      {field === 'password' && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-50 to-teal-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl flex w-full max-w-5xl overflow-hidden">
       
        <div className="w-1/2 bg-gradient-to-br from-green-500 to-teal-500 p-8 flex flex-col justify-center text-white">
          <div className="text-center">
            <div className="text-5xl mb-4 ml-52"><FaUser /></div>
            <h2 className="text-3xl font-bold mb-2">Welcome!</h2>
            <p className="text-teal-100">Sign up to start your health journey</p>
          </div>
        </div>

        <div className="w-1/2 p-8 bg-white">
          {alerts && (
            <div className="mb-4">
              <Alert type={type} message={message} onClose={() => setAlert(false)} />
            </div>
          )}
          <form className="space-y-3">
            {renderInput("name", "text", "Your full name")}
            {renderInput("email", "email", "Your email")}
            {renderInput("age", "number", "Your age")}
            {renderInput("password", "password", "Password")}
            {renderInput("profile", "file", "", "image/*")}

            <button
              type="button"
              onClick={fetchUser}
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 transition duration-300 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?
              <span className="ml-1 text-teal-600 font-semibold cursor-pointer hover:underline">Sign In</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
