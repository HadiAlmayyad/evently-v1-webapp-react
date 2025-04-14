import React, { useState } from "react";
import { Button, Card, ListGroup, Row, Col, Container } from "react-bootstrap";
import initialEvents from "../../util/dEvAll.json";
import EventViewModal from "./EventViewModal";

function EventsTabContent() {
  const [eventList, setEventList] = useState(initialEvents);

  const handleApprove = (id) => {
    setEventList((prev) =>
      prev.map((ev) =>
        ev.id === id ? { ...ev, adminStatus: "approved" } : ev
      )
    );
  };

  const handleReject = (id) => {
    setEventList((prev) =>
      prev.map((ev) =>
        ev.id === id ? { ...ev, adminStatus: "rejected" } : ev
      )
    );
  };

  const handleRemove = (id) => {
    setEventList((prev) => prev.filter((ev) => ev.id !== id));
  };

  // EventViewModals 
  const [selectedEvent, setSelectedEvent] = useState(null); // holds data for modal
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <ListGroup className="ev-list">
        {eventList.map((event) => (
            <ListGroup.Item 
                key={event.id} 
                action onClick={()=> {handleOpenModal(event)}}
                className="ev-list-item"
                >
                <Row className="align-items-center">
                <Col>{event.title}</Col>

                <Col
                    xs={11}
                    sm={8}
                    md={6}
                    lg={4}
                    className="d-flex justify-content-between align-items-center"
                >
                    <Button
                    className="btn-app"
                    onClick={() => handleApprove(event.id)}
                    disabled={event.adminStatus === "approved"}
                    >
                        {event.adminStatus === "approved" ? "Approved" : "Approve"}
                    </Button>

                    <Button
                    className="btn btn-danger me-1"
                    onClick={() => handleReject(event.id)}
                    disabled={event.adminStatus === "rejected"}
                    >
                        {event.adminStatus === "rejected" ? "Rejected" : "Reject"}
                    </Button>

                    <Button
                    className="btn btn-secondary"
                    onClick={() => handleRemove(event.id)}
                    disabled={event.adminStatus === "pending"}
                    >
                        Remove
                    </Button>
                </Col>
                </Row>
            </ListGroup.Item>
        ))}

        <EventViewModal 
            show={showModal}
            onHide={handleCloseModal}
            event={selectedEvent}
        />

    </ListGroup>
  );
}

export default EventsTabContent;
