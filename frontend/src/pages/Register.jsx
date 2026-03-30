import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import '../App.css';

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <button onClick={handleRegister}>Register</button>

      <div className="link">
        <Link to='/login'> Already have an account? Login </Link>
      </div>
    </div>
  );
}