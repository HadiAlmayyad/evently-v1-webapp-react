import React from "react";
import { useState } from "react";
import {Row, Col, Card, Button} from 'react-bootstrap';

export default function CardsGridDiscover({filteredEvents, handleRegister, handleView, user}) { 

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
                            {new Date(event.date).toISOString().split('T')[0]}
                            <br />
                            {new Date(event.date).toTimeString().split(' ')[0].slice(0, 5)}
                        </Card.Text>

                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <span className="fw-bold" style={{ fontSize: "14px"}}>{event.venue}</span>
                            <span className="fw-bold" style={{ fontSize: "14px"}}>{event.organiser}</span>
                        </div>

                    </Card.Body>

                    <Card.Footer>

                        <Button variant='success' size="sm" 
                            // Disable button if already registered
                            disabled={user?.registeredEvents?.some(e => String(e.eventId?._id) === String(event._id))} 
                            onClick={() => handleRegister(event)}
                        >
                            {user?.registeredEvents?.some(e => 
                                String(e.eventId?._id) === String(event._id)) ? 
                                "Registered" : 
                                "Register"}
                        </Button>

                        <Button className='btn-app' size="sm" onClick={() => handleView(event)}>
                            View
                            
                        </Button>
                        
                        
                    </Card.Footer>
                    </Card>

                </Col>
            
            ))}


        </Row>


    )
}

