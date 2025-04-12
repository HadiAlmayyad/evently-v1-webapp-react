import './MyEventsPage.css';
import React from 'react';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import { Button, Modal, Form } from 'react-bootstrap';

import FilterButtons from '../../components/FliterButtons';
import NavbarComponent from '../../components/NavbarComponent';
import CardsGrid from '../../components/CardsGrid';

import allEv from '../../util/dEvAll.json';


export default function MyEventsPage() {

  const [events, setEvents] = useState(allEv); // Stores events displayed 
  const [filter, setFilter] = useState('all'); // Stroes the type of events displayed 
  const [lgShow, setLgShow] = useState(false); // Stroes the state of Moda (Rate Form)
  // Related the form and its ranges
  const [ranges, setRanges] = useState({
    Location: 5,
    Date: 5,
    Time: 5,
    Food: 5,
    Overall: 5,
  });


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

  const handleRateForm = (id) => {
    setLgShow(true)
  }

  const handleRangeChange = (key) => (e) => {
    setRanges((prev) => ({
      ...prev,
      [key]: Number(e.target.value),
    }));
  };

  return (
  <div className='my-events-page'>
            
  
    {/* Navbar */}
    <NavbarComponent activePage='my-events' userRole='Attendee' />

    <Container expand="md" className='mt-5'>

    {/* Button for Events Selection All, Upcoming, Past */}
          <div className='d-flex justify-content-between align-items-center'>
              <FilterButtons handleChange={handleChange} />
              <Button className='btn-app' size="lg" href="#link">New Event</Button>
          </div>

    {/* Events Cards */}
        <CardsGrid 
        filteredEvents={filteredEvents} 
        handleDelete={handleDelete} 
        handleRate={handleRateForm} />

    </Container>
    

    <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)} // Close Modal
        aria-labelledby="example-modal-sizes-title-lg"
        className='custom-modal' 
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            You Opinion - 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form> 
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>What did you like about the event?</Form.Label>
              <Form.Control as="textarea" placeholder="Share your thoughts, so KFUPM becomes greater !" rows={2} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>What things can be improved?</Form.Label>
              <Form.Control as="textarea" placeholder="Share your thoughts, so KFUPM becomes greater !" rows={3} /> 
            </Form.Group>

            {Object.entries(ranges).map(([key, value]) => (
              <Form.Group key={key} className="mb-3">
                <Form.Label>
                  {key.charAt(0).toUpperCase() + key.slice(1)} {value} / 10
                </Form.Label>
                <Form.Range
                  min={0}
                  max={10}
                  step={1}
                  value={value}
                  onChange={handleRangeChange(key)}
                />
              </Form.Group>
            ))}

            {/* Done Button */}
            <div className="d-grid gap-2">
              <Button className='btn-app' size="lg">
                Done
              </Button>
            </div>
          </Form>
        
        </Modal.Body>
    </Modal>


  </div>
  
  );
}
