import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MyEventsPage from "./pages/MyEvents/MyEventsPage";
import Login from "./pages/Login";      
import Profile from "./pages/Profile";  
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import OrganiserDashboard from "./pages/OrganiserDashboard/OrganiserDashboard";
import './styles/ev-theme.css'
import VenuesPage from "./pages/Venues/VenuesPage";
import DiscoverEvents from './pages/DiscoverEvents/DiscoverEvents';
import EventManagePage from "./pages/EventManage/EventManagePage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["Attendee", "Organiser", "Admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/my-events"
          element={
            <ProtectedRoute allowedRoles={["Attendee", "Organiser"]}>
              <MyEventsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/venues"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <VenuesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/discover"
          element={
            <ProtectedRoute allowedRoles={["Attendee", "Organiser", "Admin"]}>
              <DiscoverEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organiser-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Organiser"]}>
              <OrganiserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-event"
          element={
            <ProtectedRoute allowedRoles={["Organiser"]}>
              <EventManagePage/>
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />


      </Routes>
    </Router>
  )
}



export default App;

