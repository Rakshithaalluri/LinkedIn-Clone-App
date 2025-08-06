import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './login.css'

function Login({setUser}) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success("Login successful");
      localStorage.setItem("user", JSON.stringify(result.user));
      setUser(result.user);
      navigate("/feed"); // ✅ REDIRECT to /feed
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="login-container">
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
     
    </form>
        </div>
  );
}

export default Login;
