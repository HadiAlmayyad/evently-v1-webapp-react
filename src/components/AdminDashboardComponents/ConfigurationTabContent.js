import React, { useState } from 'react';
import { Form, Button, Row, Col, Tabs, Tab, Card, Container } from 'react-bootstrap';
import usersList from '../../util/dUsers.json'
import categoriesList from '../../util/dCategories.json'

export default function ConfigurationTabContent() {
  const [users, setUsers] = useState(usersList);  // List of users
  const [categories, setCategories] = useState(categoriesList);  // List of categories
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserRole, setSelectedUserRole] = useState("Atendee");
  const [newCategory, setNewCategory] = useState("");
  const [disableEvents, setDisableEvents] = useState(false);

  // Users Handlers
  const handleUserChange = (e) => {
    setSelectedUserId(e.target.value);
  };

  const handleRoleChange = (e) => {
    setSelectedUserRole(e.target.value);
  };

  const handleSave = () => { 
    
  }


  // Categories Handlers
  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const addCategory = () => {
    setCategories([...categories, newCategory]);
    setNewCategory(""); // Clear input after adding
  };

  // Events Handlers
  const handleEventToggle = () => {
    setDisableEvents(!disableEvents);
  };


  // Print Report Handlers
  const generateReport = () => {
    console.log("Generating report...");
    // Here, you can generate a PDF, download it, or simply show a preview.
  };

  return (
    <Container>
        <Tabs defaultActiveKey="userSettings" id="system-settings-tabs" className="mb-3 ev-tabs">
        <Tab eventKey="userSettings" title="User Settings">
            <Form className="mt-4">

            {/* User Role Section */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4} className='custom-form-label'>Select User</Form.Label>
                <Col sm={8}>

                <Form.Select value={selectedUserId} onChange={handleUserChange} className="custom-form-select">
                    {users.map((user) => (  
                    <option key={user.id} value={user.id}>{user.fullName}</option>
                    ))}

                </Form.Select>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4} className='custom-form-label'>Change Role</Form.Label>
                <Col sm={8}>
                <Form.Select value={selectedUserRole} onChange={handleRoleChange} className="custom-form-select">
                    <option value="Atendee">Atendee</option>
                    <option value="Organizer">Organizer</option>
                    <option value="Admin">Admin</option>
                </Form.Select>
                </Col>
            </Form.Group>

            <Button className="btn-app" onClick={handleSave}>Save Changes</Button>
            </Form>
        </Tab>

                {/* Events Categories Section */}   
        <Tab eventKey="eventCategories" title="Event Categories">
            <Form className="mt-4">
            {/* Add Event Categories */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4} className='custom-form-label'>Event Categories</Form.Label>
                <Col sm={8}>
                <Form.Control
                    type="text"
                    value={newCategory}
                    onChange={handleCategoryChange}
                    placeholder="Enter new category"
                    className='custom-form-control'
                />
                <Button onClick={addCategory} className="mt-2 btn-app">
                    Add Category
                </Button>
                </Col>
            </Form.Group>

            <Col xl={3}>
                <ul>
                    {categories.map((category) => (
                        <Card className='align-items-center mt-1 btn-app'>
                            {category.title}
                        </Card>
                    ))}
                </ul>
            </Col>
            </Form>
        </Tab>

                {/* Events Registeration Section */}
        <Tab eventKey="eventRegistration" title="Event Registration">
            <Form className="mt-4">
            {/* Disable Event Registration */}
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4} className='custom-form-label'>Disable Event Registration</Form.Label>
                <Col sm={8}>
                <Form.Check 
                    type="switch"
                    id="disableEventsSwitch"
                    label={disableEvents? "Disabled" : "Active"}
                    checked={disableEvents}
                    onChange={handleEventToggle}
                    className='custom-form-label'
                />
                </Col>
            </Form.Group>

            <Button className='btn-app'>Save Changes</Button>
            </Form>
        </Tab>

                {/* Reports Section */}
        <Tab eventKey="reports" title="Reports">
            <Form className="mt-4">
            {/* Generate Report */}
            <Button variant="success" onClick={generateReport} size="lg">
                Print Report
            </Button>
            </Form>
        </Tab>
        </Tabs>
    </Container>
  );
}
