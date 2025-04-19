import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyEventsPage from "./pages/MyEvents/MyEventsPage";
import EventManagePage from "./pages/EventManage/EventManagePage";

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<MyEventsPage />} />
      <Route path="/event-manage/create" element={<EventManagePage/>} />
    </Routes>
   </Router>
  );
}

export default App;
