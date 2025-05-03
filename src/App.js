import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MyEventsPage from "./pages/MyEvents/MyEventsPage";
import Login from "./pages/Login";      
import Profile from "./pages/Profile";  
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard/OrganizerDashboard";
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
            <ProtectedRoute allowedRoles={["Attendee", "Organizer", "Admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/my-events"
          element={
            <ProtectedRoute allowedRoles={["Attendee", "Organizer"]}>
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
            <ProtectedRoute allowedRoles={["Attendee", "Organizer", "Admin"]}>
              <DiscoverEvents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organizer-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Organizer"]}>
              <OrganizerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-event"
          element={
            <ProtectedRoute allowedRoles={["Organizer"]}>
              <EventManagePage/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/event-manage"
          element={
            <ProtectedRoute allowedRoles={["Organizer"]}>
              <Navigate to="/organizer-dashboard"/>
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

