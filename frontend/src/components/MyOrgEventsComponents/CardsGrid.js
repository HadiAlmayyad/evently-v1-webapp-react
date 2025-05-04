import React from "react";
import { useState } from "react";
import {Row, Col, Card, Button} from 'react-bootstrap';

function CardsGrid({filteredEvents, handleEdit, handleView}) { 

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
                            <span className="fw-bold" style={{ fontSize: "14px"}}>{event.organiser}</span>
                        </div>

                    </Card.Body>

                    <Card.Footer>
                        <Button variant='warning' size="sm" disabled={event.type === "past"} onClick={() => handleEdit(event)}>
                            Edit
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

export default CardsGrid;