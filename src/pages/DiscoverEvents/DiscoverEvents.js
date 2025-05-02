import '../MyEvents/MyEventsPage.css';
import React from 'react';
import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import { Button, Modal, Form } from 'react-bootstrap';

import EventViewModal from '../../components/AdminDashboardComponents/EventViewModal';
import FilterButtons from '../../components/MyEventsPageComponents/FliterButtons';
import Navbar from '../../components/Navbar';
import allEv from '../../util/dEvAll.json';
import CardsGridDiscover from '../../components/CardsGridDiscover';



function DiscoverEvents() {

  const [events, setEvents] = useState([]);
  const [user, setUser] = useState();
  const [eventsLoading, setEventsLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  
  const [filter, setFilter] = useState('all'); // Stroes the type of events displayed 

  const [showViewModal, setShowViewModal] = useState(false); // Controls modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Stores the event to be displayed in the modal


  // Backend Fetching //
  // Fetch events
  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setEventsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEventsLoading(false);
      });
  }, []);
  
  // Fetch user
  useEffect(() => {
    fetch("http://localhost:5000/api/users/68142fa8ea61f232732c762b")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setUserLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setUserLoading(false);
      });
  }, []);


  // Handle Register for Event
  const handleRegister = (event) => {
    const userId = user?._id;
    if (!userId || !event?._id) return alert("User or event missing");
  
    fetch(`http://localhost:5000/api/users/${userId}/register/${event._id}`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((err) => {
            throw new Error(err.error);
          });
        return res.json();
      })
      .then(() => {
        alert("Successfully registered!");
  
        return fetch(`http://localhost:5000/api/users/${userId}`);
      })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUser(updatedUser); // backend-refreshed state
      })
      .catch((err) => {
        console.error("Registration failed:", err.message);
        alert(err.message || "Failed to register for event.");
      });
  };
  

  const handleView = (event) => {
    setSelectedEvent(event);
    setShowViewModal(true); // Show the modal when the "View" button is clicked
  };

  const handleClosVieweModal = () => {
    setShowViewModal(false);
    setSelectedEvent(null); 
  };

  // Handles Toggle Buttons (All, Upcoming, Past)
  const handleChange = (val) => {
    if (val === 1) setFilter('all');
    else if (val === 2) setFilter('upcoming');
    else setFilter('past');
  };

  const filteredEvents = events.filter(event => {
    const now = new Date();
    const eventDate = new Date(event.date);

    if (event.adminStatus !== 'approved') return false;

    if (filter === 'upcoming') return eventDate > now;
    if (filter === 'past') return eventDate < now;
    return true;
  });


  if (eventsLoading || userLoading) return <div>Loading...</div>;
 
  return (
  <div className='my-events-page'>
            
  
    {/* Navbar */}
    {/* <NavbarComponent activePage='my-events' userRole='Attendee' /> */}
    <Navbar showLogout={true} />

    <Container expand="md" className='mt-5'>

    {/* Button for Events Selection All, Upcoming, Past */}
          <div className='d-flex justify-content-between align-items-center'>
              <FilterButtons handleChange={handleChange} />
          </div>

    {/* Events Cards */}
        <CardsGridDiscover 
        filteredEvents={filteredEvents} 
        handleRegister={handleRegister} 
        handleView={handleView}
        user = {user}
        />

    </Container>

        {/* View Modal */}
    {selectedEvent && (
        <EventViewModal
            show={showViewModal}
            onHide={handleClosVieweModal}
            event={selectedEvent} // Pass selected event to the modal
    />
    )}

  </div>
  
  );
}

export default DiscoverEvents;
