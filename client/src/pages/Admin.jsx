import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css'; // Make sure this exists in the same folder

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', { username, password });

      if (response.data.message === 'Login successful') {
        alert('✅ Login successful!');
        navigate('/dashboard');
      } else {
        alert('❌ Login failed!');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Login</h2>
      <form className="admin-form" onSubmit={handleLogin}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Admin;
