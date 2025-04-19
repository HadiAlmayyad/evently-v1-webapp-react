import React, { useState } from 'react';
import { Button, Card, Row, Col, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import events from '../../util/dEvAll.json';
import EventViewModal from './EventViewModal';

export default function EventsTabContent() {
  const [eventList, setEventList] = useState(events);
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Stores the event to be displayed in the modal

  const handleApprove = (id) => {
    setEventList((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, adminStatus: 'approved' } : event
      )
    );
  };

  const handleReject = (id) => {
    setEventList((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, adminStatus: 'rejected' } : event
      )
    );
  };

  const handleRemove = (id) => {
    setEventList((prev) => prev.filter((event) => event.id !== id));
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
          <Col xs={12} sm={12} md={6} lg={6} xl={4} key={event.id}>
            <Card className="event-card">
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>
                  <strong>Organizer:</strong> {event.organizer}
                </Card.Text>
                <Card.Text>
                  <strong>Venue:</strong> {event.venue}
                </Card.Text>
                <Card.Text>
                  <strong>Date & Time:</strong> {event.datetime}
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
                    onClick={() => handleApprove(event.id)}
                    disabled={event.adminStatus === 'approved'}
                  >
                    {event.adminStatus === 'approved' ? 'Approved' : 'Approve'}
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleReject(event.id)}
                    disabled={event.adminStatus === 'rejected'}
                  >
                    {event.adminStatus === 'rejected' ? 'Rejected' : 'Reject'}
                  </Button>

                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleRemove(event.id)}
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
