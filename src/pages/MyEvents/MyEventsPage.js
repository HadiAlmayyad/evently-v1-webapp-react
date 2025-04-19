import './MyEventsPage.css';
import React from 'react';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import { Button, Modal, Form } from 'react-bootstrap';

import FilterButtons from '../../components/MyEventsPageComponents/FliterButtons';
import NavbarComponent from '../../components/MyEventsPageComponents/NavbarComponent';
import CardsGrid from '../../components/MyEventsPageComponents/CardsGrid';
import Navbar from '../../components/Navbar';
import allEv from '../../util/dEvAll.json';



export default function MyEventsPage() {

  const [events, setEvents] = useState(allEv); // Stores events displayed 
  const [filter, setFilter] = useState('all'); // Stroes the type of events displayed 

  // Handles Toggle Buttons (All, Upcoming, Past)
  const handleChange = (val) => {
    if (val === 1) setFilter('all');
    else if (val === 2) setFilter('upcoming');
    else setFilter('past');
  };

  // Used by CardsGrid to delete/cancel Events
  const handleDelete = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
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
              <Button className='btn-app' size="lg" href="#link">New Event</Button>
          </div>

    {/* Events Cards */}
    {/* The Grid contains RateForm Comp.*/}
        <CardsGrid 
        filteredEvents={filteredEvents} 
        handleDelete={handleDelete} 
        />

    </Container>

  </div>
  
  );
}
