import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { setToken } from "./services/api";
import { useEffect, useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsAuth(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;