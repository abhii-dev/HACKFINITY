import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BlobCursor from '../components/MetaBalls.jsx';

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
      <BlobCursor className="absolute inset-0" fillColor="#493D9E" />
      <form onSubmit={handleRegister} className="bg-[#DAD2FF] p-8 rounded-lg w-[90rem] h-[30rem] shadow-lg z-10 mr-[45rem]">
        <h2 className="text-2xl font-semibold mb-4 mt-5 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="w-full p-2 mb-3 rounded bg-[#DAD2FF]  text-black border"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="w-full p-2 mb-3 rounded  bg-[#DAD2FF]  text-black border"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full p-2 mb-3 rounded  bg-[#DAD2FF]  text-black border"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          className="w-full p-2 mb-4 rounded  bg-[#DAD2FF]  text-black border"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="player">Player</option>
          <option value="coach">Coach</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-[#493D9E] hover:bg-[#352F7A] text-white p-2 rounded">
          Register
        </button>
        <p className="text-sm mt-4 flex justify-center items-center">
          Already have an account? <a href="/" className="text-blue-400">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
