import './MyEventsPage.css';
import React from 'react';
import { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import { Button, Modal, Form } from 'react-bootstrap';

import FilterButtons from '../../components/MyEventsPageComponents/FliterButtons';
import NavbarComponent from '../../components/MyEventsPageComponents/NavbarComponent';
import CardsGrid from '../../components/MyEventsPageComponents/CardsGrid';
import Navbar from '../../components/Navbar';
import allEv from '../../util/dEvAll.json';



export default function MyEventsPage() {

  const [events, setEvents] = useState([]);
  const [user, setUser] = useState();
  const [eventsLoading, setEventsLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [filter, setFilter] = useState("all");

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

  // Handles Toggle Buttons (All, Upcoming, Past)
  const handleChange = (val) => {
    if (val === 1) setFilter('all');
    else if (val === 2) setFilter('upcoming');
    else setFilter('past');
  };

  // Used by CardsGrid to delete/cancel Events
  const handleDelete = (eventId) => {
    fetch(`http://localhost:5000/api/events/${eventId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to delete event');
        setEvents(prev => prev.filter(ev => ev._id !== eventId));
      })
      .catch(err => console.error('Delete error:', err));
  };

  // Filter registered Events for the user, then filter by time
  // Step 1: Get registered event IDs
  const registeredEventIds = user?.registeredEvents.map(e => String(e.eventId?._id || e.eventId)) || [];

  // Step 2: Filter events that are registered
  const registeredEventsOnly = events.filter(event =>
    registeredEventIds.includes(String(event._id))
  );

  console.log(registeredEventsOnly)


  const filteredEvents = registeredEventsOnly.filter(event => {
    const now = new Date();
    const eventDate = new Date(event.date);
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
              <Button className='btn-app' size="lg" href="#link">New Event</Button>
          </div>

    {/* Events Cards */}
    {/* The Grid contains RateForm Comp.*/}
        <CardsGrid 
        filteredEvents={filteredEvents} 
        onDelete={handleDelete} 
        user = {user}
        />

    </Container>

  </div>
  
  );
}
