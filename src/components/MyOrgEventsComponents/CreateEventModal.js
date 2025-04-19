import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function CreateEventModal({ show, onHide, onCreate }) {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    datetime: "",
    venue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call onCreate with the new event data
    onCreate(newEvent);
    onHide(); // Close the modal after creation
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Create New Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={newEvent.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date and Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="datetime"
              value={newEvent.datetime}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Venue</Form.Label>
            <Form.Control
              type="text"
              name="venue"
              value={newEvent.venue}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Create Event
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateEventModal;
