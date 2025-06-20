import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Updated import
import axios from 'axios';

function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/auth/login', form);
            const { token } = res.data;
            const decoded = jwtDecode(token); // Updated function call
            const expiry = decoded.exp * 1000;

            localStorage.setItem('token', token);
            localStorage.setItem('token_expiry', expiry);
            alert('Login Successful!');
            navigate('/dashboard', { replace: true })
        }
        catch (err) {
            console.error('Login error:', err);
            alert('Error in logging in');
        }
    }

    return (
        <div className='cont'>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder='Email' onChange={handleChange} required />
                <input name="password" type="password" placeholder='Password' onChange={handleChange} required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/" onClick={(e) => {e.preventDefault(); navigate('/');}}>Register here</a></p>
        </div>
    );
}

export default Login;