import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Badge } from 'react-bootstrap';
import EditEventModal from './EditEventModal'; 
import EventViewModal from './EventViewModal';

export default function EventsTabContent() {
  const eventlyAPI = "http://localhost:5000/api";
  const [eventList, setEventList] = useState([]);
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [selectedEvent, setSelectedEvent] = useState(null); // Stores the event to be displayed in the modal
  const [showEditModal, setShowEditModal] = useState(false); // Controls edit modal visibility

  useEffect(() =>
  {
    fetch( `${eventlyAPI}/events`)
    .then( ( response ) => response.json() )
    .then( function( data )
    {
      setEventList( data.filter( ( dataElem ) => dataElem.organiser === JSON.parse( localStorage.getItem("user") ).fullName ) );
    })
    .catch( function( error )
    {
      console.log( "Error:", error.message );
    });
  }, [] );

  const handlePublish = (id) => {
    try
    {
      fetch( `${eventlyAPI}/events/${id}`,
      {
        method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify( { adminStatus: "pending" } ),
      })
      .then( function( response )
      {
        if ( response.ok )
        {
          alert( "Event published sucessfully!" );
          setEventList((prev) =>
            prev.map((event) =>
              event._id === id ? { ...event, adminStatus: 'pending' } : event
            )
          );
        }
        else
        {
          throw new Error( "There was a problem publishing the event." );
        }
      })
      .catch( function( error )
      {
        alert( "Error: ", error.message );
      });
    }
    catch ( error )
    {
      alert( "There was a problem connecting to the server." );
    }
  };

  const handleRemove = (id) =>
  {  
    try
    {
      fetch( `${eventlyAPI}/events/${id}`,
      {
        method: "DELETE",
      })
      .then( function( response )
      {
        if ( response.ok )
        {
          alert( "Event removed sucessfully!" );
          setEventList((prev) => prev.filter((event) => event._id !== id));
        }
        else
        {
          throw new Error( "There was a problem removing the event." );
        }
      })
      .catch( function( error )
      {
        alert( "Error: ", error.message );
      });
    }
    catch ( error )
    {
      alert( "There was a problem connecting to the server." );
    }
  };

  const handleView = (event) => {
    setSelectedEvent(event);
    setShowModal(true); // Show the modal when the "View" button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null); // Reset selected event when the modal is closed
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedEvent(null); // Reset 
  };

// Used by CardsGrid to edit Events
    const handleEdit = (event) => {
        setSelectedEvent(event);
        setShowEditModal(true); // Show the modal when the "Edit" button is clicked
    };


  const handleSaveEditedEvent = (editedEvent) => {
    setEventList((prev) =>
      prev.map((event) =>
        event._id === editedEvent._id ? { ...event, ...editedEvent } : event
      )
    );
  };

  return (
    <div className="events-tab-content">
      <Row><Col><Button variant="app" size="lg" href="/create-event">Create Event</Button></Col></Row>
      <Row className="g-3 mt-2">
        {eventList.map((event) => (
          <Col xs={12} sm={12} md={6} lg={6} xl={4} key={event._id}>
            <Card className="event-card">
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Text>
                  <strong>Organiser:</strong> {event.organiser}
                </Card.Text>
                <Card.Text>
                  <strong>Category:</strong> {event.category}
                </Card.Text>
                <Card.Text>
                  <strong>Venue:</strong> {event.venue}
                </Card.Text>
                <Card.Text>
                  <strong>Date & Time:</strong> {( new Date( event.date ) ).toLocaleString()}
                </Card.Text>
                <Card.Text>
                  <strong>Registration required:</strong> {event.registrationRequired==="on" ? "Yes" : "No"}
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
                    onClick={() => handlePublish(event._id)}
                    disabled={event.adminStatus === 'pending' || event.adminStatus === 'approved'}
                  >
                    {( event.adminStatus === 'pending' || event.adminStatus === 'approved' ) ? 'Published' : 'Publish'}
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleRemove(event._id)}
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
                  
                  <Button
                    variant="outline-light"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleEdit(event)}
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

          {/* Edit Modal */}
      {selectedEvent && (
        <EditEventModal
          show={showEditModal}
          onHide={handleCloseEditModal}
          event={selectedEvent}
          onSave={handleSaveEditedEvent} // Handle save event
        />
      )}
    </div>
  );
}