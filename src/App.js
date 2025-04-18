import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import './styles/ev-theme.css'
import VenuesPage from "./pages/Venues/VenuesPage";

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/venues" element={<VenuesPage />} />
    </Routes>
   </Router>
  );
}

export default App;
