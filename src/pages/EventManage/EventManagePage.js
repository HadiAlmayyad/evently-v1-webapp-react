import "./EventManagePage.css";
import React, { useState } from "react";
import { Button, Container, FloatingLabel, Form, Modal, Placeholder } from "react-bootstrap";
import NavbarComponent from "../../components/MyEventsPageComponents/NavbarComponent";

function EventManagePage()
{
	const [ showPreview, setShowPreview ] = useState( false );

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
			<NavbarComponent/>
			<Container fluid="md">
				<Form>
					<Form.Group>
						<Form.Label>Thumbnail</Form.Label>
						<Form.Control type="file"/>
						<Form.Text>Upload an image</Form.Text>
					</Form.Group>
					<br/>
					<Form.Group>
						<FloatingLabel label="Description">
							<Form.Control as="textarea"/>
						</FloatingLabel>
					</Form.Group>
					<br/>
					<Form.Group>
						<Form.Label>Location</Form.Label>
						<Form.Select>
							<option>Select location</option>
						</Form.Select>
						<Form.Text>Where will the event be held?</Form.Text>
					</Form.Group>
					<br/>
					<Form.Group>
						<Form.Label>Date</Form.Label>
						<Form.Control placeholder="What day is the event taking place?"/>
					</Form.Group>
					<br/>
					<Form.Group>
						<Form.Label>Time</Form.Label>
						<Form.Control placeholder="What time is the event taking place?"/>
					</Form.Group>
					<br/>
					<Button variant="secondary">Cancel</Button> <Button onClick={openPreview} variant="outline-light">Preview</Button> <Button variant="primary">Submit</Button>
				</Form>
				<Modal show={showPreview} size="xl" onHide={closePreview}>
					<Modal.Header closeButton={true}>
						<Modal.Title>Preview</Modal.Title>
					</Modal.Header>
					<Placeholder as={Modal.Body} animation="wave">
						<Placeholder xs={12}/>
					</Placeholder>
					<Modal.Footer>
						<Button variant="secondary" onClick={closePreview}>Exit Preview</Button> <Button variant="primary">Submit</Button>
					</Modal.Footer>
				</Modal>
			</Container>
		</div>
	);
}

export default EventManagePage;
