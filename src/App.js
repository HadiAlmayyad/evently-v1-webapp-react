import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyEventsPage from "./pages/MyEvents/MyEventsPage";

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<MyEventsPage />} />
    </Routes>
   </Router>
  );
}

export default App;
