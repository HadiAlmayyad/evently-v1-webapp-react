import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import './styles/ev-theme.css'

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
    </Routes>
   </Router>
  );
}

export default App;
