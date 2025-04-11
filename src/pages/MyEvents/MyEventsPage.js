import React from 'react';
import './MyEventsPage.css';


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
  <div className='my-events-page'>
    <div className="container">
        
        <button className='btn btn-primary'>
          Button
        </button>
        {/* // Navbar */}
        
        {/* Button for Events Selection All, Upcoming, Past */}

        {/* Events Cards */}

        {/* Button / Card for Adding a new one */}


        </div>
  </div>
  
  );
}
