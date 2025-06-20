import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import Alert from '../Components/Alert';

const Login = ({ setShowLogin }) => {
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [alerts, setAlert] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/v1/users/login', data, { withCredentials: true });
      if (res.status === 200) {
        setType('success');
        setMessage('Login successful! 🎉');
        setAlert(true);
        setTimeout(() => {
          setShowLogin(false);
          window.location.reload();
        }, 1500);
      }
    } catch (err) {
      setType('error');
      setMessage(err?.response?.status >= 400 ? 'Invalid Credentials' : 'Something went wrong');
      setAlert(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justi  fy-center bg-black/50 px-4">
      <div
        data-aos="zoom-in"
        className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-3xl flex flex-col md:flex-row"
      >
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-3 right-3 text-teal-600 hover:text-red-500 transition"
        >
          ✕
        </button>
 
        <div className="md:w-1/2 bg-gradient-to-br from-teal-500 to-green-400 p-6 flex items-center justify-center">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-hospital-reception-scene_23-2148837407.jpg?t=st=1721718240~exp=1721721840~hmac=7e95c8c0b40864a72b20729bf1ab983eb568f78791e56271779974e5749d63bc&w=740"
            alt="Login Visual"
            className="rounded-2xl shadow-lg"
          />
        </div>
 
        <div className="md:w-1/2 bg-white p-8">
          <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">Welcome Back!</h2>
          {alerts && (
            <div className="mb-4">
              <Alert type={type} message={message} onClose={() => setAlert(false)} />
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={data.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="mt-1 w-full px-4 py-3 rounded-xl border border-teal-300 focus:ring-4 focus:ring-teal-100 focus:outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={data.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="mt-1 w-full px-4 py-3 rounded-xl border border-teal-300 focus:ring-4 focus:ring-teal-100 focus:outline-none transition"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <span className="text-teal-600 hover:underline cursor-pointer">Forgot password?</span>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-600 to-green-500 hover:from-teal-700 hover:to-green-600 text-white py-3 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-600">
            Don’t have an account?
            <span className="text-teal-600 font-semibold cursor-pointer hover:underline ml-1">
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
