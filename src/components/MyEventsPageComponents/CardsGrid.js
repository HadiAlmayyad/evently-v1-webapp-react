import React from "react";
import { useState } from "react";
import {Row, Col, Card, Button} from 'react-bootstrap';
import RateForm from "./RateForm";

function CardsGrid({filteredEvents, handleDelete}) { 

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

        <Row sm={1} md={2} lg={3} className='mt-2 g-3'>

            {filteredEvents.map((event) => (
            
                <Col sm={12} md={6} lg={4} key={event.id}>
                    
                    {/* Card Event */}
                    <Card className='h-100 Ev-OnBackground rounded-4 p-1'>
                    <Card.Body>
                        <Card.Title>{event.title}</Card.Title>
                        
                        <Card.Text className="ev-description">
                        {event.description === "" ? ".........." : event.description}                
                        </Card.Text>
                        
                        <Card.Text style={{fontSize: "14px", fontWeight: "bold"}}>
                        {event.datetime}
                        </Card.Text>

                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <span className="fw-bold" style={{ fontSize: "14px"}}>{event.venue}</span>
                            <span className="fw-bold" style={{ fontSize: "14px"}}>{event.organizer}</span>
                        </div>

                    </Card.Body>

                    <Card.Footer>
                        <Button variant='danger' size="sm" onClick={() => handleDelete(event.id)}>
                            {event.type === "upcoming" ? "Cancel" : "Remove"}
                        </Button>

                        <Button className='btn-app' size="sm" disabled={event.type === "upcoming"} onClick={() => handleOpenModal(event)}>
                            Rate
                        </Button>
                        
                    </Card.Footer>
                    </Card>

                </Col>
            
            ))}

            <RateForm 
                show={showModal}
                onHide={handleCloseModal}
                event={selectedEvent} 
            />
        </Row>


    )
}

export default CardsGrid;