import { useState } from "react";
import API, { setToken } from "../services/api";
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

export default function Login({setIsAuth}) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setIsAuth(true);
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input 
        placeholder="email" 
        onChange={e => setForm({...form, email: e.target.value})}
      />
      <input 
        placeholder="password" 
        type="password" 
        onChange={e => setForm({...form, password: e.target.value})}
      />
      <button onClick={handleLogin}>Login</button>
      
      <p className="link">
        <Link to="/register">Don't have an account? Register here</Link>
      </p>
    </div>
  );
}