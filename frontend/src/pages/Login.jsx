import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BlobCursor from '../components/MetaBalls.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden">
      {/* Animated MetaBalls Background */}
      <BlobCursor className="absolute inset-0" fillColor="#493D9E" />

      {/* Login Form */}
      <form onSubmit={handleLogin} className="bg-[#DAD2FF] p-8 rounded-lg w-[80rem] h-[20rem] shadow-lg z-10 mr-[45rem]">
        <h2 className="text-2xl font-semibold mb-4 text-black text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-[#DAD2FF] text-black border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-[#DAD2FF] text-black border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-[#493D9E] hover:bg-[#352F7A] p-2 rounded text-white">
          Login
        </button>
        <p className="text-sm mt-4 text-black text-center">
          Don't have an account? <a href="/register" className="text-blue-400">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
