import React, { useState } from 'react';
import { Button, Card, Row, Col, Badge } from 'react-bootstrap';
import events from '../../util/dEvAll.json';
import EventViewModal from './EventViewModal';

export default function EventsTabContent() {
  const [eventList, setEventList] = useState(events);
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Stores the event to be displayed in the modal

  const handlePublish = (id) => {
    setEventList((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, adminStatus: 'pending' } : event
      )
    );
  };

  const handleDraft = (id) => {
    setEventList((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, adminStatus: 'draft' } : event
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
      <Row><Col><Button variant="primary" href="/create-event">Create Event</Button></Col></Row>
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
                      : event.adminStatus === 'draft'
                      ? 'secondary'
                      : 'warning'
                  }
                >
                  {event.adminStatus}
                </Badge>

                <div className="event-actions mt-3">
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => handlePublish(event.id)}
                    disabled={event.adminStatus === 'pending' || event.adminStatus === 'approved'}
                  >
                    {( event.adminStatus === 'pending' || event.adminStatus === 'approved' ) ? 'Published' : 'Publish'}
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleRemove(event.id)}
                  >
                    Remove
                  </Button>

                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleDraft(event.id)}
                    disabled={event.adminStatus === 'draft'}
                  >
                    {event.adminStatus === 'draft' ? 'Drafted' : 'Draft'}
                  </Button>

                  <Button
                    variant="outline-info"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleView(event)} // Open the modal on "View" button click
                  >
                    View
                  </Button>
                  
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="ms-2"
                    href={`/event-manage/${event.id}`}
                  >
                    Edit
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
