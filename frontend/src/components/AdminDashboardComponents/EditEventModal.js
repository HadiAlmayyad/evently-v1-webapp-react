import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function EditEventModal({ show, onHide, event, onSave }) {
  const eventlyAPI = "https://evently-webapp-react-api.vercel.app/api"
  const [editedEvent, setEditedEvent] = useState({});
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [venuesFetched, setVenuesFetched] = useState(false);
  const [registrationMethodEnabled, setRegistrationMethodEnabled] = useState(false);

	const populateCategories = function()
	{
		fetch( `${eventlyAPI}/categories` )
		.then( async function( response )
		{
			const categories = await response.json();
			const categorySelection = document.getElementById( "edit-category-selection" );
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
			const categorySelection = document.getElementById( "edit-category-selection" );
			categorySelection.innerHTML = "";
			var opt = document.createElement( "option" );
			opt.innerHTML = "There was a problem fetching the categories.";
			categorySelection.appendChild( opt );
		});
	};

	const populateVenues = function()
	{
    if ( venuesFetched )
    {
      return;
    }

		fetch( `${eventlyAPI}/venues` )
		.then( async function( response )
		{
			const venues = await response.json();
			const venueSelection = document.getElementById( "edit-venue-selection" );
      const prevVenue = venueSelection.value;
      venueSelection.innerHTML = "";

			venues.forEach( function( venue )
			{
				var opt = document.createElement( "option" );
				opt.disabled = ( prevVenue.split(" | ")[0] === venue.name ) ? false : ( venue.availableDates !== "Available" );
				opt.innerHTML = ( prevVenue.split(" | ")[0] === venue.name ) ? prevVenue : ( `${venue.name} | ${venue.location} | Capacity: ${venue.capacity} | ` + ( venue.availableDates === "Available" ? "Available" : "Unavailable" ) );
				venueSelection.appendChild( opt );
			});

      setVenuesFetched( true );
		})
		.catch( function( error )
		{
			setDisableSubmit( true );
			console.log( "Error fetching venues: ", error.message );
			const venueSelection = document.getElementById( "edit-venue-selection" );
			venueSelection.innerHTML = "";
			var opt = document.createElement( "option" );
			opt.innerHTML = "There was a problem fetching the venues.";
			venueSelection.appendChild( opt );
		});
	};

  // Pre-populate the form with the current event details
  useEffect(() => {
    if (event) {
      setEditedEvent({
        ...event,
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

		try
		{
			const formData = new FormData( e.target );
			// const response = await fetch( `${eventlyAPI}/events` );
			// const eventlyEvents = await response.json();

			fetch( `${eventlyAPI}/events/${event._id}`,
			{
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(
				{
					title: formData.get( "title" ),
					description: formData.get( "description" ),
					category: formData.get( "category" ),
					venue: formData.get( "venue" ).replace( / \| (un)?available$/i, "" ),
					date: formData.get( "date" ),
					registrationRequired: formData.get( "registrationRequired" ),
					registrationMethod: formData.get( "registrationMethod" ),
				}),
			})
			.then( function( response )
			{
				if ( response.ok )
				{
					alert( "Event submitted sucessfully!" );
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

    onSave(editedEvent);
    onHide(); // Close the modal after saving
  };

  var minimumDate = new Date();
  minimumDate.setDate( minimumDate.getDate() + 1 );
  minimumDate = minimumDate.toISOString();

  return (
    <Modal show={show} onHide={onHide} size="lg" className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Event - {event ? event.title : ""}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form data-bs-theme="dark" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={event.title || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={event.description || ""}
              onChange={handleChange}
              rows={3}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select
              id="edit-category-selection"
              name="category"
              defaultValue={event.category || ""}
              onChange={handleChange}
              onFocus={populateCategories}
              required
            >
              <option>{event.category || ""}</option>
            </Form.Select>
            <Form.Text>What category does the event fall under?</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Venue</Form.Label>
            <Form.Select
              id="edit-venue-selection"
              name="venue"
              defaultValue={event.venue || ""}
              onChange={handleChange}
              onFocus={populateVenues}
              required
            >
              <option>{event.venue || ""}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date & Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="date"
              defaultValue={event.date.slice( 0, -8 )}
              min={ minimumDate > event.date ? `${minimumDate.split( "T" )[0]}T00:00` : event.date.slice( 0, -8 )}
              step={300}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              name="registrationRequired"
              type="checkbox"
              label="Registration required"
              defaultChecked={event.registrationRequired==="on"}
              onChange={( e ) => {setRegistrationMethodEnabled( e.target.checked ); handleChange( e )}}
            />
            <Form.Text>Are attendees required to register to attend the event?</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Method of registration</Form.Label>
              <Form.Control
                name="registrationMethod"
                as="textarea"
                defaultValue={event.registrationMethod || ""}
                onChange={handleChange}
                placeholder={event.registrationMethod || ""}
                required
                disabled={!registrationMethodEnabled}
              />
            <Form.Text>How will the attendees register to attend the event?</Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={disableSubmit}>
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditEventModal;
