import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyEventsPage from "./pages/MyEvents/MyEventsPage";
import Login from "./pages/Login";      
import Profile from "./pages/Profile";  
import LandingPage from "./pages/LandingPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />     
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

