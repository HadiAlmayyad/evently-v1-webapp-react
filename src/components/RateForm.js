import React from "react";
import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

function RateForm({show, onHide, event}) { 

    const [ranges, setRanges] = useState({
        Location: 5,
        Date: 5,
        Time: 5,
        Food: 5,
        Overall: 5,
    });

    const handleRangeChange = (key) => (e) => {
        setRanges((prev) => ({
            ...prev,
            [key]: Number(e.target.value),
        }));
    };

    if(!event) return null;

    return( 
        <Modal
            size="lg"
            show={show}
            onHide={onHide} // Close Modal
            aria-labelledby="example-modal-sizes-title-lg"
            className='custom-modal' 
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
                You Opinion - {event.title}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            <Form> 
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>What did you like about the event?</Form.Label>
                <Form.Control as="textarea" placeholder="Share your thoughts, so KFUPM becomes greater !" rows={2} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>What things can be improved?</Form.Label>
                <Form.Control as="textarea" placeholder="Share your thoughts, so KFUPM becomes greater !" rows={3} /> 
                </Form.Group>

                {Object.entries(ranges).map(([key, value]) => (
                <Form.Group key={key} className="mb-3">
                    <Form.Label>
                        {key.charAt(0).toUpperCase() + key.slice(1)} {value} / 10
                    </Form.Label>
                    <Form.Range
                        min={0}
                        max={10}
                        step={1}
                        value={value}
                        onChange={handleRangeChange(key)}
                    />
                </Form.Group>
                ))}

                {/* Done Button */}
                <div className="d-grid gap-2">
                <Button className='btn-app' size="lg" onClick={() => {/* handle submit */}}>
                    Done
                </Button>
                </div>
            </Form>
            
            </Modal.Body>
        </Modal>
    )
}

export default RateForm;