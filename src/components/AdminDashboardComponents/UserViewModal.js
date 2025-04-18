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
        <Badge bg={user.role === "Organiser" ? "primary" : "secondary"} className="me-2">
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

  const [openEventId, setOpenEventId] = useState(null); // controls which feedback is shown

  if (!user) return null; // Early return to avoid accessing undefined user

  // Safely find the user’s registration entry
  const userEntry = registerdEvents.find((entry) => entry.userId === user.id);

  // If no entry is found, handle that gracefully
  if (!userEntry) return <p className="text-muted">No registered events found for this user.</p>;


  const eventTitle = (id) => {
    
    const event = events.find((event) => event.id === id);
    return event ? event.title : "Event not found"; // Fallback if event not found
  };

  const eventDate = (id) => {
    
    const event = events.find((event) => event.id === id);
    return event ? event.rge : "Event not found"; // Fallback if event not found
  };

  return ( 
    <ListGroup className='ev-list'>
        {userEntry.registeredEvents.length > 0 ? (
          userEntry.registeredEvents.map((regEvent) => (
            <div key={regEvent.eventId}>
              <ListGroup.Item
                action
                className="btn-app ev-list-item rounded"
                onClick={() =>
                  setOpenEventId(openEventId === regEvent.eventId ? null : regEvent.eventId)
                }
              >
                <Row>
                    <Col xs={6} sm ={6} md={6} lg={6} >
                    {eventTitle(regEvent.eventId)} 
                    </Col>

                    <Col >
                      <small style={{color: 'var(--ev-unfocused-element)'}}>registered on:</small> {regEvent.registrationDate}
                    </Col>
                </Row>
              </ListGroup.Item>

              <Collapse  in={openEventId === regEvent.eventId}>
                <div className="p-3 border border-secondary rounded-bottom">
                  {regEvent.feedback.map((fb, index) => (
                    <div key={index} >
                      <p><strong>What did you like most about the event?</strong> {fb.comment_1}</p>
                      <p><strong>What things can be improved?</strong> {fb.comment_2}</p>
                      <p><strong>Ratings:</strong></p>
                      <ul>
                        <li>Location: {fb.location}/10</li>
                        <li>Date: {fb.date}/10</li>
                        <li>Time: {fb.time}/10</li>
                        <li>Food: {fb.food}/10</li>
                        <li><strong>Overall: {fb.overall}/10</strong></li>
                      </ul>
                    </div>
                  ))}
                </div>
              </Collapse>
            </div>
          ))
        ) : (
          <p className="text-muted">No events registered.</p>
        )}
    </ListGroup>
  )
}
