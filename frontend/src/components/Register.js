import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import './register.css'


function Register() {
    const [formData, setFormData] = useState({
        name: '', email:'', bio: '', password: ''
    })
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch("http://localhost:3000/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  const result = await response.json();

  if (response.ok) {
    toast.success("User Registered!");
    
    // Save user manually or call login API here
    const loginRes = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    const result = await loginRes.json();

    if (loginRes.ok) {
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/feed"); // ✅ Redirect to feed
    }
  } else {
    toast.error(result.message);
  }
};

    return(
        <div className='register-container'>

        <form onSubmit={handleSubmit}>
            <h1> Register </h1>
            <input name="name" placeholder="Name" onChange={handleChange} required/>
            <input name="email" placeholder="email" onChange={handleChange} required/>
            <input name="bio" placeholder="bio" onChange={handleChange} required/>
            <input name="password" type="password" placeholder='Password' onChange={handleChange} required/>
            <button type="submit"> Register </button>
        </form>
                    
        </div>
    )
}

export default Register;
