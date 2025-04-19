import React from "react";
import { Modal, Row, Col, Badge } from "react-bootstrap";

function EventViewModal({ show, onHide, event }) {
  if (!event) return null;

  // Determine badge color
  const statusColor = {
    approved: "success",
    rejected: "danger",
    pending: "warning",
  }[event.adminStatus] || "secondary";

  
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="event-details-modal"
      className="custom-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{event.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4">
        <Row className="mb-3">
          <Col xs={6}><strong>Date & Time:</strong></Col>
          <Col xs={6}>{event.datetime}</Col>
        </Row>

        <Row className="mb-3">
          <Col xs={6}><strong>Venue:</strong></Col>
          <Col xs={6}>{event.venue}</Col>
        </Row>

        <Row className="mb-3">
          <Col xs={6}><strong>Organiser:</strong></Col>
          <Col xs={6}>{event.organiser}</Col>
        </Row>

        <Row className="mb-3">
          <Col xs={6}><strong>Status:</strong></Col>
          <Col xs={6}>
            <Badge bg={statusColor} className="px-3 py-1 text-uppercase">
              {event.adminStatus}
            </Badge>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12}>
            <strong>Description:</strong>
            <div className="mt-2 text-dark   border rounded p-3 bg-dark-subtle">
              {event.description || "No description provided."}
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default EventViewModal;
