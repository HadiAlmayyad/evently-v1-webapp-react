import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MyEventsPage from "./pages/MyEvents/MyEventsPage";
import Login from "./pages/Login";      
import Profile from "./pages/Profile";  
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import './styles/ev-theme.css'
import VenuesPage from "./pages/Venues/VenuesPage";
import MyOrgEventsPage from "./pages/MyOrganisedEvents/MyOrgEvents";
import DiscoverEvents from './pages/DiscoverEvents/DiscoverEvents'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />     
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-events" element={<MyEventsPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> 
        <Route path="/venues" element={<VenuesPage />} />      
        <Route path="/my-org-events" element={<MyOrgEventsPage />} />      
        <Route path="/discover" element={<DiscoverEvents />} />   
      </Routes>
    </Router>
  )
}



export default App;

