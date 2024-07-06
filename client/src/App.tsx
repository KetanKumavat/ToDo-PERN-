import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ToDoApp from "./components/Todo";
// import Home from "./components/Home";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todos" element={<ToDoApp />} />
    </Routes>
  );
};

export default App;
