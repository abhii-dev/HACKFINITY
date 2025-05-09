import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg w-80 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded">
          Login
        </button>
        <p className="text-sm mt-4">
          Don't have an account? <a href="/register" className="text-blue-400">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
