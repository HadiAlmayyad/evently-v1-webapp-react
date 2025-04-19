import '../MyEvents/MyEventsPage.css';
import React from 'react';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import { Button, Modal, Form } from 'react-bootstrap';

import EventViewModal from '../../components/AdminDashboardComponents/EventViewModal';
import FilterButtons from '../../components/MyEventsPageComponents/FliterButtons';
import Navbar from '../../components/Navbar';
import allEv from '../../util/dEvAll.json';
import CardsGridDiscover from '../../components/CardsGridDiscover';



function DiscoverEvents() {

  const [events, setEvents] = useState(allEv); // Stores events displayed 
  const [filter, setFilter] = useState('all'); // Stroes the type of events displayed 

  const [showViewModal, setShowViewModal] = useState(false); // Controls modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Stores the event to be displayed in the modal

  // Handles Toggle Buttons (All, Upcoming, Past)
  const handleChange = (val) => {
    if (val === 1) setFilter('all');
    else if (val === 2) setFilter('upcoming');
    else setFilter('past');
  };



  // Handle Register for Event
  const handleRegister = (event) => {
    const updatedEvents = events.map((e) => {
      if (e.id === event.id && e.status !== "Registered") { // Only change if not already registered
        return { ...e, status: 'Registered' };
      }
      return e;
    });
    setEvents(updatedEvents); // Update events state
  };

  const handleView = (event) => {
    setSelectedEvent(event);
    setShowViewModal(true); // Show the modal when the "View" button is clicked
  };

  const handleClosVieweModal = () => {
    setShowViewModal(false);
    setSelectedEvent(null); 
  };


  const filteredEvents = filter === 'all' ? events : events.filter((e) => e.type === filter);


  return (
  <div className='my-events-page pt-5'>
            
  
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
