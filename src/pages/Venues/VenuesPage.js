import React, { useState } from "react";
import { Button, Card, Row, Col, ListGroup, Modal, Form, Container } from "react-bootstrap";
import './VenuesPage.css';
import NavbarComponent from "../../components/AdminDashboardComponents/NavbarComponent";
import Navbar from "../../components/Navbar";

function VenuesPage() {


  const [venues, setVenues] = useState([
    { id: 1, name: 'Auditorium A', capacity: 200, availability: 'Available', location: 'Building 1, Room 101' },
    { id: 2, name: 'Conference Room B', capacity: 50, availability: 'Unavailable', location: 'Building 2, Room 205' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);  // For editing
  const [venueData, setVenueData] = useState({ name: '', capacity: '', availability: '', location: '' });

  const handleShowModal = (venue = null) => {
    if (venue) {
      setSelectedVenue(venue);
      setVenueData(venue);
    } else {
      setSelectedVenue(null);
      setVenueData({ name: '', capacity: '', availability: '', location: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData({ ...venueData, [name]: value });
  };

  const handleSave = () => {
    if (selectedVenue) {
      setVenues(venues.map((venue) => venue.id === selectedVenue.id ? { ...venue, ...venueData } : venue));
    } else {
      setVenues([...venues, { id: Date.now(), ...venueData }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setVenues(venues.filter((venue) => venue.id !== id));
  };

  return (
    <div className="venues-page">

        {/* <NavbarComponent activePage="" userRole="Admin"/>  */}

        <Navbar showLogout={true} />
       

        <Container>

            <h2 className="mb-4 mt-4 venues-header">Manage Venues</h2>
            
            
            <Button className="btn-app" onClick={() => handleShowModal()}>Add New Venue</Button>


            <div className="venues-list mt-3">
            {venues.map((venue) => (
                <Card key={venue.id} className="venue-card mb-3 shadow-sm" style={{ backgroundColor: '#261D41' }}>
                <Card.Body>
                    <Row className="align-items-center">
                    {/* Venue Details */}
                    <Col md={8}>
                        <h5>{venue.name}</h5>
                        <p><strong>Location:</strong> {venue.location}</p>
                        <p><strong>Capacity:</strong> {venue.capacity}</p>
                        <p><strong>Status:</strong> 
                        <span className={`badge ${venue.availability === 'Available' ? 'bg-success' : 'bg-danger'}`}>
                            {venue.availability}
                        </span>
                        </p>
                    </Col>

                    {/* Action Buttons */}
                    <Col md={4} className="text-end">
                        <Button 
                        variant="warning" 
                        size="sm" 
                        onClick={() => handleShowModal(venue)} 
                        className="me-2">
                        Edit
                        </Button>
                        <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleDelete(venue.id)}>
                        Delete
                        </Button>
                    </Col>
                    </Row>
                </Card.Body>
                </Card>
            ))}
            </div>

            {/* Modal for Add/Edit Venue */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>{selectedVenue ? 'Edit Venue' : 'Add New Venue'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                    <Form.Label>Venue Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={venueData.name}
                        onChange={handleChange}
                        placeholder="Enter venue name"
                    />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                        type="number"
                        name="capacity"
                        value={venueData.capacity}
                        onChange={handleChange}
                        placeholder="Enter capacity"
                    />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Availability</Form.Label>
                    <Form.Control
                        as="select"
                        name="availability"
                        value={venueData.availability}
                        onChange={handleChange}
                    >
                        <option>Available</option>
                        <option>Unavailable</option>
                    </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        value={venueData.location}
                        onChange={handleChange}
                        placeholder="Enter location (building, room)"
                    />
                    </Form.Group>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    </div>
  );
}

export default VenuesPage;
