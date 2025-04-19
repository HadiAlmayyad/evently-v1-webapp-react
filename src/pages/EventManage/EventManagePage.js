import "./EventManagePage.css";
import React, { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Modal, Placeholder, Row } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import FooterEv from "../../components/FooterEv";

function EventManagePage()
{
	const [ showPreview, setShowPreview ] = useState( false );
	const [ registrationMethodEnabled, setRegistrationMethodEnabled ] = useState( false );

	const openPreview = function()
	{
		setShowPreview( true )
	};

	const closePreview = function()
	{
		setShowPreview( false )
	};

	return (
		<div>
			<Navbar showLogout={true}/>
			<Container fluid="md" data-bs-theme="dark">
				<Form>
					<h1>Create an Event</h1>
					<br/>
					<Row>
						<Form.Group>
							<FloatingLabel label="Title">
								<Form.Control required/>
							</FloatingLabel>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Form.Group>
							<Form.Label>Thumbnail</Form.Label>
							<Form.Control type="file"/>
							<Form.Text>Upload an image</Form.Text>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Form.Group>
							<FloatingLabel label="Description">
								<Form.Control as="textarea"/>
							</FloatingLabel>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Form.Group>
							<Form.Label>Venue</Form.Label>
							<Form.Select required>
								<option>Select Venue</option>
							</Form.Select>
							<Form.Text>Where will the event be held?</Form.Text>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Form.Group>
							<Form.Label required>Date & Time</Form.Label>
							<Form.Control type="datetime-local" required/>
							<Form.Text>When will the event take place?</Form.Text>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Form.Group>
							<FloatingLabel label="Organiser">
								<Form.Control/>
							</FloatingLabel>
							<Form.Text>Who is organising the event?</Form.Text>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Form.Group>
							<Form.Check type="checkbox" label="Registration required" onChange={ ( event ) => setRegistrationMethodEnabled( event.target.checked )}/>
							<Form.Text>Are attendees required to register to attend the event?</Form.Text>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Form.Group>
							<FloatingLabel label="Method of registration">
								<Form.Control as="textarea" required disabled={!registrationMethodEnabled}/>
							</FloatingLabel>
							<Form.Text>How will the attendees register to attend the event?</Form.Text>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Col><Button variant="secondary">Cancel</Button> <Button onClick={openPreview} variant="outline-light">Preview</Button> <Button variant="outline-info">Draft</Button> <Button variant="primary" type="submit">Submit</Button></Col>
					</Row>
				</Form>
				<Modal show={showPreview} size="xl" onHide={closePreview}>
					<Modal.Header closeButton={true}>
						<Modal.Title>Preview</Modal.Title>
					</Modal.Header>
					<Placeholder as={Modal.Body} animation="wave">
						<Placeholder xs={12}/>
					</Placeholder>
					<Modal.Footer>
						<Button variant="secondary" onClick={closePreview}>Exit Preview</Button>
					</Modal.Footer>
				</Modal>
			</Container>
			<FooterEv/>
		</div>
	);
}

export default EventManagePage;
