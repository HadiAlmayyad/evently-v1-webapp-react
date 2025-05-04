import React, { useState, useEffect } from 'react';
import { Button, Card, Row, Col, Badge, OverlayTrigger, Tooltip, Spinner} from 'react-bootstrap';
import EventViewModal from './EventViewModal';

export default function EventsTabContent() {
  const [eventList, setEventList] = useState([]);
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Stores the event to be displayed in the modal
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(data => setEventList(data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  const handleApprove = (id) => {
    setLoadingId(id); // start loading
    fetch(`http://localhost:5000/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminStatus: 'approved' }),
    })
      .then(res => res.json())
      .then(updated => {
        setEventList(prev =>
          prev.map(event =>
            event._id === updated._id ? updated : event
          )
        );
      })
      .catch(err => console.error('Approve failed:', err))
      .finally(() => setLoadingId(null)); // stop loading
  };


  const handleReject = (id) => {
    setLoadingId(id); // start loading
    fetch(`http://localhost:5000/api/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminStatus: 'rejected' }),
    })
      .then(res => res.json())
      .then(updated => {
        setEventList(prev =>
          prev.map(event =>
            event._id === updated._id ? updated : event
          )
        );
      })
      .catch(err => console.error('Reject failed:', err))
      .finally(() => setLoadingId(null)); // stop loading
  };

  const handleRemove = (id) => {
    fetch(`http://localhost:5000/api/events/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error('Delete failed');
        setEventList(prev => prev.filter(event => event._id !== id));
      })
      .catch(err => console.error('Delete failed:', err));
  };

  const handleView = (event) => {
    setSelectedEvent(event);
    setShowModal(true); // Show the modal when the "View" button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null); // Reset selected event when the modal is closed
  };

  return (
    <div className="events-tab-content">
      <Row className="g-3">
        {eventList.map((event) => (
          <Col xs={12} sm={12} md={6} lg={6} xl={4} key={event._id}>
            <Card className="event-card">
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>
                  <strong>Organiser:</strong> {event.organiser}
                </Card.Text>
                <Card.Text>
                  <strong>Venue:</strong> {event.venue}
                </Card.Text>
                <Card.Text>
                  <strong>Date & Time:</strong> {event.date}
                </Card.Text>
                <Badge
                  bg={
                    event.adminStatus === 'approved'
                      ? 'success'
                      : event.adminStatus === 'rejected'
                      ? 'danger'
                      : 'warning'
                  }
                >
                  {event.adminStatus}
                </Badge>

                <div className="event-actions mt-3">
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handleApprove(event._id)}
                    disabled={event.adminStatus === 'approved' || loadingId === event._id}
                  >
                    {loadingId === event._id
                      ? <Spinner animation="border" size="sm" />
                      : event.adminStatus === 'approved'
                        ? 'Approved'
                        : 'Approve'}
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleReject(event._id)}
                    disabled={event.adminStatus === 'rejected' || loadingId === event._id}
                  >
                    {loadingId === event._id
                      ? <Spinner animation="border" size="sm" />
                      : event.adminStatus === 'rejected'
                        ? 'Rejected'
                        : 'Reject'}
                  </Button>

                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleRemove(event._id)}
                    disabled={event.adminStatus === 'pending'}
                  >
                    Remove
                  </Button>

                  <Button
                    variant="outline-info"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleView(event)} // Open the modal on "View" button click
                  >
                    View
                  </Button>
                  
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

            {/* View Modal */}
      {selectedEvent && (
        <EventViewModal
          show={showModal}
          onHide={handleCloseModal}
          event={selectedEvent} // Pass selected event to the modal
        />
      )}
    </div>
  );
}
