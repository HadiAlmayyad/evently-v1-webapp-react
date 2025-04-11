// src/pages/MyEvents/MyEventsPage.jsx
import React from 'react';
import './MyEventsPage.css';
import { Container, Navbar, Nav } from 'react-bootstrap'
import EventCard from '../../components/EventCard';
import FloatingAddButton from '../../components/FloatingAddButton';

const dummyEvents = [
  {
    id: 1,
    title: 'Event title ...',
    datetime: 'Date & Time',
    description: 'Description .........',
    venue: 'Venue',
    organiser: 'Organiser',
  },
  {
    id: 2,
    title: 'Event title ...',
    datetime: 'Date & Time',
    description: 'Description .........',
    venue: 'Venue',
    organiser: 'Organiser',
  },
];

export default function MyEventsPage() {
  return (
<div className="container">

     {/* // Navbar */}
     
     {/* Button for Events Selection All, Upcoming, Past */}

     {/* Events Cards */}

     {/* Button / Card for Adding a new one */}


    </div>
  );
}
