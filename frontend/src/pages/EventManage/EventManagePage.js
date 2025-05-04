import "./EventManagePage.css";
import React, { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, /* Modal, Placeholder, */ Row } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import FooterEv from "../../components/FooterEv";
import { useNavigate } from "react-router-dom";

function EventManagePage()
{
	const navigate = useNavigate();
	// const [ showPreview, setShowPreview ] = useState( false );
	const [ registrationMethodEnabled, setRegistrationMethodEnabled ] = useState( false );
	const [ disableSubmit, setDisableSubmit ] = useState( false );
	// const [ thumbnailURL, setThumbnailURL ] = useState( null );
	const eventlyAPI = "http://localhost:5000/api";

/*
	const openPreview = function()
	{
		setShowPreview( true )
	};

	const closePreview = function()
	{
		setShowPreview( false )
	};
*/
/*
	const uploadImage = function( event )
	{
		try
		{
			fetch( `${eventlyAPI}/images`,
			{
				method: "POST",
				body: event.target.value,
			})
			.then( function( response )
			{
				if ( response.ok )
				{
					setThumbnailURL( response.text );
				}
				else
				{
					throw new Error( "There was an error uploading the image." );
				}
			})
			.catch( function( error ) 
			{
				throw error;
			});
		}
		catch( error )
		{
			alert( "Error uploading image:", error.message );
		}
	}
*/

	const populateCategories = function()
	{

		fetch( `${eventlyAPI}/categories` )
		.then( async function( response )
		{
			const categories = await response.json();
			const categorySelection = document.getElementById( "category-selection" );
			categorySelection.innerHTML = "";

			categories.forEach( function( category )
			{
				var opt = document.createElement( "option" );
				opt.innerHTML = category.title;
				categorySelection.appendChild( opt );
			});
		})
		.catch( function( error )
		{
			setDisableSubmit( true );
			console.log( "Error fetching categories: ", error.message );
			const categorySelection = document.getElementById( "category-selection" );
			categorySelection.innerHTML = "";
			var opt = document.createElement( "option" );
			opt.innerHTML = "There was a problem fetching the categories.";
			categorySelection.appendChild( opt );
		});
	};

	const populateVenues = function()
	{
		fetch( `${eventlyAPI}/venues` )
		.then( async function( response )
		{
			const venues = await response.json();
			const venueSelection = document.getElementById( "venue-selection" );
			venueSelection.innerHTML = "";

			venues.forEach( function( venue )
			{
				var opt = document.createElement( "option" );
				opt.disabled = venue.availability !== "Available";
				opt.innerHTML = `${venue.name} | ${venue.location} | Capacity: ${venue.capacity} | ` + ( venue.availability === "Available" ? "Available" : "Unavailable" );
				venueSelection.appendChild( opt );
			});
		})
		.catch( function( error )
		{
			setDisableSubmit( true );
			console.log( "Error fetching venues: ", error.message );
			const venueSelection = document.getElementById( "venue-selection" );
			venueSelection.innerHTML = "";
			var opt = document.createElement( "option" );
			opt.innerHTML = "There was a problem fetching the venues.";
			venueSelection.appendChild( opt );
		});
	};

	const onEventSubmit = async function( event )
	{
		event.preventDefault();

		try
		{
			const formData = new FormData( event.target );
			// const response = await fetch( `${eventlyAPI}/events` );
			// const eventlyEvents = await response.json();

			fetch( `${eventlyAPI}/events`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(
				{
					// id: eventlyEvents.length,
					title: formData.get( "title" ),
					thumbnail: null, //formData.get( "thumbnail" ),
					description: formData.get( "description" ),
					category: formData.get( "category" ),
					venue: formData.get( "venue" ).replace( / \| (un)?available$/i, "" ),
					date: formData.get( "datetime" ),
					registrationRequired: formData.get( "registrationRequired" ),
					registrationMethod: formData.get( "registrationMethod" ),
					organiser: JSON.parse( localStorage.getItem("user") ).fullName,
				}),
			})
			.then( function( response )
			{
				if ( response.ok )
				{
					alert( "Event submitted sucessfully!" );
					navigate("/organiser-dashboard")
				}
				else
				{
					throw new Error( "There was a problem submitting the event." );
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
					{/* <Row>
						<Form.Group>
							<Form.Label>Thumbnail</Form.Label>
							<Form.Control name="thumbnail" type="file" onChange={uploadImage}/>
							<Form.Text>Upload an image</Form.Text>
						</Form.Group>
					</Row>
					<br/> */}
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
							<Form.Select id="category-selection" name="category" required>
								{ populateCategories() }
							</Form.Select>
							<Form.Text>What category does the event fall under?</Form.Text>
						</Form.Group>
					</Row>
					<br/>
					<Row>
						<Form.Group>
							<Form.Label>Venue</Form.Label>
							<Form.Select id="venue-selection" name="venue" required>
								{ populateVenues() }
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
						<Col><Button variant="secondary" href="/organiser-dashboard">Cancel</Button> {/* <Button onClick={openPreview} variant="outline-light">Preview</Button> <Button variant="outline-info">Draft</Button> */} <Button variant="primary" type="submit" disabled={disableSubmit}>Submit</Button></Col>
					</Row>
				</Form>
				{/* <Modal show={showPreview} size="xl" onHide={closePreview}>
					<Modal.Header closeButton={true}>
						<Modal.Title>Preview</Modal.Title>
					</Modal.Header>
					<Placeholder as={Modal.Body} animation="wave">
						<Placeholder xs={12}/>
					</Placeholder>
					<Modal.Footer>
						<Button variant="secondary" onClick={closePreview}>Exit Preview</Button>
					</Modal.Footer>
				</Modal> */}
			</Container>
			<FooterEv/>
		</div>
	);
}

export default EventManagePage;
