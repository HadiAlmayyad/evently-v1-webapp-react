import '../MyEvents/MyEventsPage.css';
import React from 'react';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import { Button, Modal, Form } from 'react-bootstrap';

import CreateEventModal from '../../components/MyOrgEventsComponents/CreateEventModal';
import EditEventModal from '../../components/MyOrgEventsComponents/EditEventModal'; 
import EventViewModal from '../../components/AdminDashboardComponents/EventViewModal';
import FilterButtons from '../../components/MyEventsPageComponents/FliterButtons';
import CardsGrid from '../../components/MyOrgEventsComponents/CardsGrid';
import Navbar from '../../components/Navbar';
import allEv from '../../util/dEvAll.json';



export default function MyOrgEvents() {

  const [events, setEvents] = useState(allEv); // Stores events displayed 
  const [filter, setFilter] = useState('all'); // Stroes the type of events displayed 

  const [showViewModal, setShowViewModal] = useState(false); // Controls modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Stores the event to be displayed in the modal
  const [showEditModal, setShowEditModal] = useState(false); // Controls edit modal visibility
  const [showCreateModal, setShowCreateModal] = useState(false); // Controls create modal visibility

  // Handles Toggle Buttons (All, Upcoming, Past)
  const handleChange = (val) => {
    if (val === 1) setFilter('all');
    else if (val === 2) setFilter('upcoming');
    else setFilter('past');
  };


  // Opens the modal to create a new event
  const handleCreateEvent = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  // Save the new event to the state
  const handleSaveNewEvent = (newEvent) => {

    // Assign a unique ID and initial status (e.g., "pending")

    const eventWithId = { ...newEvent, id: Date.now(), status: 'pending' };
    setEvents((prevEvents) => [...prevEvents, eventWithId]);
  };

  const handleView = (event) => {
    setSelectedEvent(event);
    setShowViewModal(true); // Show the modal when the "View" button is clicked
  };

  const handleClosVieweModal = () => {
    setShowViewModal(false);
    setSelectedEvent(null); 
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedEvent(null); // Reset 
  };

// Used by CardsGrid to edit Events
    const handleEdit = (event) => {
        setSelectedEvent(event);
        setShowEditModal(true); // Show the modal when the "Edit" button is clicked
    };


  const handleSaveEditedEvent = (editedEvent) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === editedEvent.id ? { ...event, ...editedEvent } : event
      )
    );
  };

  const filteredEvents = filter === 'all' ? events : events.filter((e) => e.type === filter);


  return (
  <div className='my-events-page'>
            
  
    {/* Navbar */}
    {/* <NavbarComponent activePage='my-events' userRole='Attendee' /> */}
    <Navbar showLogout={true} />

    <Container expand="md" className='mt-5'>

    {/* Button for Events Selection All, Upcoming, Past */}
          <div className='d-flex justify-content-between align-items-center'>
              <FilterButtons handleChange={handleChange} />
              <Button className='btn-app' size="lg" onClick={handleCreateEvent}>New Event</Button>
          </div>

    {/* Events Cards */}
        <CardsGrid 
        filteredEvents={filteredEvents} 
        handleEdit={handleEdit} 
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

        {/* Edit Modal */}
    {selectedEvent && (
        <EditEventModal
            show={showEditModal}
            onHide={handleCloseEditModal}
            event={selectedEvent}
            onSave={handleSaveEditedEvent} // Handle save event
        />
        )}

            {/* Create Event Modal */}
      <CreateEventModal
        show={showCreateModal}
        onHide={handleCloseCreateModal}
        onCreate={handleSaveNewEvent} // Save new event
      />
  </div>
  
  );
}
