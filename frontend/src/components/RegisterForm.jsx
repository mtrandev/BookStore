import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    city: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5555/register', form);
      setSuccessMessage('Registration successful! Redirecting to login...');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/old-wall.png')] p-4 bg-dark-gray">
      <div className="bg-[#f4f1eb]/90 border border-[#d1c9b6] rounded-3xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-4xl font-serif text-center text-[#3d3b29] mb-6 border-b-4 border-[#6b5f47] pb-2">
          Register
        </h2>

        {error && <div className="text-red-500 mb-4 text-sm text-center">{error}</div>}

        {successMessage && (
          <div className="text-[#6c9e46] mb-4 text-sm text-center flex items-center justify-center">
            <FaCheckCircle className="mr-2 text-2xl" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <FiUser className="absolute top-3 left-3 text-[#5f5748]" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#d1c9b6] focus:ring-2 focus:ring-[#6b5f47] focus:outline-none transition"
              required
            />
          </div>
          <div className="relative">
            <FiMail className="absolute top-3 left-3 text-[#5f5748]" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#d1c9b6] focus:ring-2 focus:ring-[#6b5f47] focus:outline-none transition"
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute top-3 left-3 text-[#5f5748]" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#d1c9b6] focus:ring-2 focus:ring-[#6b5f47] focus:outline-none transition"
              required
            />
          </div>
          <div className="relative">
            <FiPhone className="absolute top-3 left-3 text-[#5f5748]" />
            <input
              type="text"
              name="phone"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#d1c9b6] focus:ring-2 focus:ring-[#6b5f47] focus:outline-none transition"
            />
          </div>
          <div className="relative">
            <FiMapPin className="absolute top-3 left-3 text-[#5f5748]" />
            <input
              type="text"
              name="city"
              placeholder="City (optional)"
              value={form.city}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#d1c9b6] focus:ring-2 focus:ring-[#6b5f47] focus:outline-none transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-gradient-to-r from-[#8b7d60] to-[#bfae8a] text-white font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-[#6b5f47]">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-[#8b7d60] font-semibold hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
