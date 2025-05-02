import "./EventManagePage.css";
import React, { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Modal, Placeholder, Row } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import FooterEv from "../../components/FooterEv";

function EventManagePage()
{
	const [ showPreview, setShowPreview ] = useState( false );
	const [ registrationMethodEnabled, setRegistrationMethodEnabled ] = useState( false );
	const eventlyEventsAPI = "http://localhost:8000/api/events";

	const openPreview = function()
	{
		setShowPreview( true )
	};

	const closePreview = function()
	{
		setShowPreview( false )
	};

	const onEventSubmit = async function( event )
	{
		event.preventDefault();
		const formData = new FormData( event.target );
		const response = await fetch( eventlyEventsAPI );
		const eventlyEvents = await response.json();

		fetch( eventlyEventsAPI,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(
			{
				id: eventlyEvents.length,
				title: formData.get( "title" ),
				thumbnail: null, //formData.get( "thumbnail" ),
				description: formData.get( "description" ),
				category: formData.get( "category" ),
				venue: formData.get( "venue" ),
				datetime: formData.get( "datetime" ),
				registrationRequired: formData.get( "registrationRequired" ),
				registrationMethod: formData.get( "registrationMethod" ),
				organizer: JSON.parse( localStorage.getItem("user") )["fullName"],
			}),
		})
		.then( function( response )
		{
			if ( response.status === 201 )
			{
				alert( "Event submitted sucessfully!" );
			}
			else
			{
				alert( "There was an error submitting the event." );
			}
		})
		.catch( function( error )
		{
			alert( "There was an error connecting to the server." );
		});
	};

	var minimumDate = new Date();
	minimumDate.setDate( minimumDate.getDate() + 1 ); // Set the minimum date to the day after the current date

	return (
		<div>
			<Navbar showLogout={true}/>
			<Container fluid="md" data-bs-theme="dark">
				<Form className="eventManageForm" onSubmit={onEventSubmit}>
					<h1>Create an Event</h1>
					<br/>
					<Row>
						<Form.Group>
							<FloatingLabel label="Title">
								<Form.Control name="title" required/>
							</FloatingLabel>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Form.Group>
							<Form.Label>Thumbnail</Form.Label>
							<Form.Control name="thumbnail" type="file"/>
							<Form.Text>Upload an image</Form.Text>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Form.Group>
							<FloatingLabel label="Description">
								<Form.Control name="description" as="textarea"/>
							</FloatingLabel>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Form.Group>
							<Form.Label>Category</Form.Label>
							<Form.Select name="category" required>
								<option>Select Category</option>
							</Form.Select>
							<Form.Text>What category does the event fall under?</Form.Text>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Form.Group>
							<Form.Label>Venue</Form.Label>
							<Form.Select name="venue" required>
								<option>Select Venue</option>
							</Form.Select>
							<Form.Text>Where will the event be held?</Form.Text>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Form.Group>
							<Form.Label required>Date & Time</Form.Label>
							<Form.Control name="datetime" type="datetime-local" min={`${minimumDate.toISOString().split( "T" )[0]}T00:00`} step={300} required/>
							<Form.Text>When will the event take place?</Form.Text>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Form.Group>
							<Form.Check name="registrationRequired" type="checkbox" label="Registration required" onChange={ ( event ) => setRegistrationMethodEnabled( event.target.checked )}/>
							<Form.Text>Are attendees required to register to attend the event?</Form.Text>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Form.Group>
							<FloatingLabel label="Method of registration">
								<Form.Control name="registrationMethod" as="textarea" required disabled={!registrationMethodEnabled}/>
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
