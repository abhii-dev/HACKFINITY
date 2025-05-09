import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'player' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="bg-gray-800 p-8 rounded-lg w-80 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="player">Player</option>
          <option value="coach">Coach</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 p-2 rounded">
          Register
        </button>
        <p className="text-sm mt-4">
          Already have an account? <a href="/" className="text-blue-400">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
