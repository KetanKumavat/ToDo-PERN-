import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ToDoApp from "./components/Todo";
import Home from "./components/Home";

const Registered: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/register", { replace: true });
    }
  }, [navigate]);

  return <Home />;
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Registered />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todos" element={<ToDoApp />} />
    </Routes>
  );
};

export default App;
