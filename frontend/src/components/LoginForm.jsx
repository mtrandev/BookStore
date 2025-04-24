import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/login', { email, password });
      localStorage.setItem('token', response.data.token);

      setSuccessMessage('Login successful! Redirecting...');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/old-wall.png')] p-4 bg-dark-gray">
      <div className="bg-[#f4f1eb]/90 border border-[#d1c9b6] rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-4xl font-serif text-center text-[#3d3b29] mb-6 border-b-4 border-[#6b5f47] pb-2">
          Book Store Login
        </h2>

        {error && <div className="text-red-500 mb-4 text-sm text-center">{error}</div>}

        {successMessage && (
          <div className="text-[#6c9e46] mb-4 text-sm text-center flex items-center justify-center">
            <FaCheckCircle className="mr-2 text-2xl" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-[#5f5748]" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#d1c9b6] focus:ring-2 focus:ring-[#6b5f47] focus:outline-none transition"
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-[#5f5748]" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#d1c9b6] focus:ring-2 focus:ring-[#6b5f47] focus:outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-gradient-to-r from-[#8b7d60] to-[#bfae8a] text-white font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-[#6b5f47]">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-[#8b7d60] font-semibold hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
