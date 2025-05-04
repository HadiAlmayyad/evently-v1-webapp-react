import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, ListGroup, Modal, Form, Container } from "react-bootstrap";
import './VenuesPage.css';
import NavbarComponent from "../../components/AdminDashboardComponents/NavbarComponent";
import Navbar from "../../components/Navbar";

function VenuesPage() {

  const [venues, setVenues] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/venues")
      .then(res => res.json())
      .then(data => setVenues(data))
      .catch(err => console.error("Failed to fetch venues:", err));
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);  // For editing
  const [venueData, setVenueData] = useState({ name: '', capacity: '', availability: '', location: '' });

  const handleShowModal = (venue = null) => {
    if (venue) {
      setSelectedVenue(venue);
      setVenueData({
        name: venue.name || '',
        capacity: venue.capacity || '',
        availability: venue.availability || 'Available',
        location: venue.location || ''
      });
    } else {
      setSelectedVenue(null);
      setVenueData({ name: '', capacity: '', availability: 'Available', location: '' });
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
    const method = selectedVenue ? "PUT" : "POST";
    const url = selectedVenue
      ? `http://localhost:5000/api/venues/${selectedVenue._id}`
      : "http://localhost:5000/api/venues";
  
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(venueData),
    })
      .then(res => res.json())
      .then(savedVenue => {
        if (method === "POST") {
          setVenues(prev => [...prev, savedVenue]); // use backend _id
        } else {
          setVenues(prev =>
            prev.map(v => (v._id === savedVenue._id ? savedVenue : v))
          );
        }
        handleCloseModal();
      })
      .catch(err => {
        console.error("Failed to save venue:", err);
        alert("Venue save failed.");
      });
  };
  
  

  const handleDelete = (id) => {
    if (!window.confirm("Delete this venue?")) return;
  
    fetch(`http://localhost:5000/api/venues/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(() => {
        setVenues(prev => prev.filter(v => v._id !== id));
      })
      .catch(err => console.error("Failed to delete venue:", err));
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
                <Card key={venue._id} className="venue-card mb-3 shadow-sm" style={{ backgroundColor: '#261D41' }}>
                <Card.Body>
                    <Row className="align-items-center">
                    {/* Venue Details */}
                    <Col md={8}>
                        <h5>{venue.name}</h5>
                        <p><strong>Location:</strong> {venue.location}</p>
                        <p><strong>Capacity:</strong> {venue.capacity}</p>
                        <p><strong>Status:  </strong> 
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
                        onClick={() => handleDelete(venue._id)}>
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
