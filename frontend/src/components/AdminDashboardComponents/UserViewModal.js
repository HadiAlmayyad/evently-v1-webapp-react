import React, { useState } from 'react';
import { Modal, Badge, Image, ListGroup, Collapse, Row, Col } from 'react-bootstrap';
import events from '../../util/dEvAll.json'
import registerdEvents from "../../util/dUserRegisteredEvents.json"

export default function UserViewModal({ user, show, onHide }) {

  if (!user) return null; // Early return to avoid accessing undefined user

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{user.fullName}</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {UserInfo(user)}
        
        <hr />

        <h6 className="mb-3">Registered Events</h6>

        {RegisteredEventsListView(user)}

      </Modal.Body>
    </Modal>
  );
}

function UserInfo(user) { 

  return ( 
    <div className="d-flex align-items-center mb-4">
        <Image
        src={user.photoUrl || "/images/default-user.png"}
        roundedCircle
        width="100"
        height="100"
        className="me-3"
      />
      <div>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Student ID:</strong> {user.stuId}</p>
        <p><strong>Major:</strong> {user.major}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <Badge bg={user.role === "Organizer" ? "primary" : "secondary"} className="me-2">
          {user.role}
        </Badge>
        <Badge
          bg={user.accountState === "active" ? "success" : user.accountState === "suspended" ? "warning" : "danger"}
        >
          {user.accountState}
        </Badge>
      </div>
    </div>


  )

       
}

function RegisteredEventsListView(user) {

  const [openEventId, setOpenEventId] = useState(null);

  if (!user || !user.registeredEvents || user.registeredEvents.length === 0) {
    return <p>No registered events for this user</p>;
  }

  return (
    <ListGroup className='ev-list'>
      {user.registeredEvents.map((regEvent) => {
        const event = regEvent.eventId;
        const feedback = regEvent.feedback || {};

        if (!event) return null; // Skip if event is not populated

        return (
          <div key={event._id}>
            <ListGroup.Item
              action
              className="btn-app ev-list-item rounded"
              onClick={() =>
                setOpenEventId(openEventId === event._id ? null : event._id)
              }
            >
              <Row>
                <Col xs={6}>{event?.title}</Col>
                <Col>
                  <small style={{ color: 'var(--ev-unfocused-element)' }}>
                    registered on:
                  </small>{' '}
                  {new Date(regEvent.registeredAt).toLocaleDateString()}
                </Col>
              </Row>
            </ListGroup.Item>

            <Collapse in={openEventId === event._id}>
              <div className="p-3 border border-secondary rounded-bottom">
                {Object.keys(feedback).length > 0 ? (
                  <>
                    <p>
                      <strong>What did you like most about the event?</strong>{' '}
                      {feedback.comment_1 || 'N/A'}
                    </p>
                    <p>
                      <strong>What things can be improved?</strong>{' '}
                      {feedback.comment_2 || 'N/A'}
                    </p>
                    <p>
                      <strong>Ratings:</strong>
                    </p>
                    <ul>
                      <li>Location: {feedback.location || 'N/A'}/10</li>
                      <li>Date: {feedback.date || 'N/A'}/10</li>
                      <li>Time: {feedback.time || 'N/A'}/10</li>
                      <li>Food: {feedback.food || 'N/A'}/10</li>
                      <li>
                        <strong>Overall: {feedback.overall || 'N/A'}/10</strong>
                      </li>
                    </ul>
                  </>
                ) : (
                  <p>No feedback provided !</p>
                )}
              </div>
            </Collapse>
          </div>
        );
      })}
    </ListGroup>
  );
}
