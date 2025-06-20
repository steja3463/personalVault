import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register(){
   const [form, setForm] = useState({name: '', email: '',password: ''});
   const navigate = useNavigate();

   const handleChange = e => setForm({...form,[e.target.name]: e.target.value});

   const handleSubmit = async e => {
    e.preventDefault();
    try{
        await axios.post('http://localhost:8000/api/auth/register', form);
        alert('Registration Successful');
        navigate('/login');
    }
    catch(err){
        console.error('Registration error:', err);
        alert('Error in registering user');
    }
   };
   return(
    <div className='cont'>
        <h2>Register</h2>
        <form onSubmit = {handleSubmit}>
            <input name = "name" placeholder='Name' onChange={handleChange} required/>
            <input name = "email" placeholder='Email' onChange={handleChange} required/>
            <input name = "password" placeholder='Password' onChange={handleChange} required/>
            <button type = "submit">Register</button>
        </form>
    </div>
   );
}
export default Register;