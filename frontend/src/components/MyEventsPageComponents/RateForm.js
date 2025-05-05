import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function RateForm({ show, onHide, event, user }) {

  const [ranges, setRanges] = useState({
    Location: 5,
    Date: 5,
    Time: 5,
    Food: 5,
    Overall: 5,
  });

  const [comments, setComments] = useState({
    comment_1: "",
    comment_2: "",
  });

  useEffect(() => {
    if (event && user) {

        console.log("RegisteredEvents:", user.registeredEvents);

        const fb = user.registeredEvents.find(e =>
            String(e.eventId) === String(event._id)
        )?.feedback;

        if (fb) {
        setComments({
            comment_1: fb.comment_1 || "",
            comment_2: fb.comment_2 || "",
        });
  
        setRanges({
          Location: Number(fb.location || 5),
          Date: Number(fb.date || 5),
          Time: Number(fb.time || 5),
          Food: Number(fb.food || 5),
          Overall: Number(fb.overall || 5),
        });
      } else {
        setComments({ comment_1: "", comment_2: "" });
        setRanges({ Location: 5, Date: 5, Time: 5, Food: 5, Overall: 5 });
      }
    }
  }, [event, user]);
  

  const handleRangeChange = (key) => (e) => {
    setRanges((prev) => ({
      ...prev,
      [key]: Number(e.target.value),
    }));
  };

  const handleSubmit = async () => {
    const userId = user._id // Replace with your actual user ID logic
    if (!userId || !event?._id) return alert("Missing user or event ID.");

    const feedback = {
      comment_1: document.querySelector("#like").value,
      comment_2: document.querySelector("#improve").value,
      location: String(ranges.Location),
      date: String(ranges.Date),
      time: String(ranges.Time),
      food: String(ranges.Food),
      overall: String(ranges.Overall),
    };

    try {
      const res = await fetch(
        `https://evently-webapp-react-api.vercel.app/api/users/${userId}/feedback/${event._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ feedback }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert("Thank you for your feedback!");
        onHide(); // close modal
      } else {
        alert(result.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback");
    }
  };

  if (!event) return null;

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
      className="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Your Opinion – {event.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>What did you like about the event?</Form.Label>
            <Form.Control
              as="textarea"
              id="like"
              placeholder="Share your thoughts"
              rows={2}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea2">
            <Form.Label>What things can be improved?</Form.Label>
            <Form.Control
              as="textarea"
              id="improve"
              placeholder="We're always improving!"
              rows={3}
            />
          </Form.Group>

          {Object.entries(ranges).map(([key, value]) => (
            <Form.Group key={key} className="mb-3">
              <Form.Label>
                {key}: {value} / 10
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

          <div className="d-grid gap-2">
            <Button className="btn-app" size="lg" onClick={handleSubmit}>
              Done
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RateForm;
