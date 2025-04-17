import "./EventManagePage.css";
import React, { useState } from "react";
import { Button, Modal, Placeholder } from "react-bootstrap";
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
			<Modal show={showPreview} size="xl" onHide={closePreview}>
				<Modal.Header closeButton={true}>
					<Modal.Title>Preview</Modal.Title>
				</Modal.Header>
				<Placeholder as={Modal.Body} animation="wave">
					<Placeholder xs={12}/>
				</Placeholder>
				<Modal.Footer>
					<Button variant="secondary" onClick={closePreview}>Exit Preview</Button> <Button>Submit</Button>
				</Modal.Footer>
			</Modal>
			<Button variant="secondary">Cancel</Button> <Button onClick={openPreview} variant="outline-light">Preview</Button> <Button>Submit</Button>
		</div>
	);
}

export default EventManagePage;
