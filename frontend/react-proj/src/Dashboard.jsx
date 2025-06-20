import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [secret, setSecret] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const expiry = localStorage.getItem('token_expiry');
    if (Date.now() > expiry) {
      alert('Session Expired. Please Login again');
      localStorage.clear();
      navigate('/login');
    }
  }, [navigate]);

  const fetchSecrets = () => {
    axios.get('http://localhost:8000/api/secret', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setSecret(res.data))
    .catch(err => {
      console.error('Error fetching secrets:', err);
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    });
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/secret', form, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setForm({ title: '', content: '' });
      fetchSecrets(); // refresh secrets after adding
    })
    .catch(err => {
      console.error('Add secret error:', err);
      if (err.response) console.log('Error response:', err.response.data);
      alert('Failed to add secret');
    });
  };

  const handleDelete = title => {
    axios.delete(`http://localhost:8000/api/secret/${title}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => fetchSecrets())
    .catch(err => console.error('Error deleting secret:', err));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="cont">
      <h2>My Vault</h2>
      <button className="logout" onClick={handleLogout}>Logout</button>
      <button onClick={fetchSecrets}>View My Messages</button>

      <form onSubmit={handleSubmit}>
        <input 
          name="title" 
          placeholder="Title" 
          value={form.title}
          onChange={handleChange} 
          required 
        />
        <input 
          name="content" 
          placeholder="Secret" 
          value={form.content}
          onChange={handleChange} 
          required 
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {secret.map(sec => (
          <li key={sec.title}>
            <strong>{sec.title}</strong>: {sec.content}
            <button onClick={() => handleDelete(sec.title)} style={{ marginLeft: '10px' }}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
