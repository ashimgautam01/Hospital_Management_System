import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    doctorid: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/v1/doctor/login', data);
      if (response.status === 200) {
        sessionStorage.setItem('doctor-token', response.data.data.id);
        sessionStorage.setItem('photo', response.data.data.photo);
        navigate('/doctor/doctorpage');
      }
    } catch (err) {
      setError('Invalid ID or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-50 to-green-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-teal-100">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center tracking-tight">Doctor Login</h1>
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-teal-800 mb-1">ID</label>
            <input
              type="text"
              id="doctorid"
              name="doctorid"
              value={data.doctorid}
              onChange={handleChange}
              className="block w-full border border-teal-200 rounded-md p-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-teal-800 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="block w-full border border-teal-200 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-teal-600 to-green-600 text-white font-semibold rounded-md shadow hover:from-teal-700 hover:to-green-700 transition focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
