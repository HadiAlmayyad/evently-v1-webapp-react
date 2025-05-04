import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Tabs, Tab, Card, Container } from 'react-bootstrap';

export default function ConfigurationTabContent() {
  const [users, setUsers] = useState([]);  // List of users
  const [categories, setCategories] = useState([]);  // List of categories
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserRole, setSelectedUserRole] = useState("Atendee");
  const [newCategory, setNewCategory] = useState("");
  const [disableEvents, setDisableEvents] = useState(false);

  // Fetich Users
  useEffect(() => {
    fetch('https://evently-webapp-react-api.vercel.app/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        if (data.length > 0) {
          setSelectedUserId(data[0]._id);
          setSelectedUserRole(data[0].role);
        }
      })
      .catch(err => console.error("Failed to fetch users:", err));
  }, []);

  // Users Handlers
  const handleUserChange = (e) => {
    const id = e.target.value;
    setSelectedUserId(id);
  
    const user = users.find(u => u._id === id);
    if (user) setSelectedUserRole(user.role);
  };
  
  const handleRoleChange = (e) => {
    setSelectedUserRole(e.target.value);
  };

  const handleSave = () => {

    if (!selectedUserId || !selectedUserRole) return;

    fetch(`https://evently-webapp-react-api.vercel.app/api/users/${selectedUserId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: selectedUserRole }),
    })
      .then(res => res.json())
      .then(updatedUser => {
        setUsers(prev =>
          prev.map(user =>
            user._id === updatedUser._id ? updatedUser : user
          )
        );
        alert("Role updated successfully!");
      })
      .catch(err => {
        console.error("Failed to update role:", err);
        alert("Failed to update role.");
      });
  };


  // Categories Handlers
    // Load categories from backend
    useEffect(() => {
        fetch('https://evently-webapp-react-api.vercel.app/api/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Failed to fetch categories", err));
    }, []);

    // Add new category
    const addCategory = () => {
        if (!newCategory.trim()) return alert("Category title required");

        fetch('https://evently-webapp-react-api.vercel.app/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newCategory }),
        })
            .then(res => res.json())
            .then(added => {
            setCategories(prev => [...prev, added]);
            setNewCategory('');
            })
            .catch(err => console.error("Failed to add category", err));
    };

    // Handle inline editing
    // Enable editing
    const enableEditCategory = (id) => {
        setCategories(prev =>
        prev.map(cat =>
            cat._id === id ? { ...cat, editing: true } : cat
        )
        );
    };
    
    // Cancel editing
    const cancelEditCategory = (id) => {
        fetch(`https://evently-webapp-react-api.vercel.app/api/categories/${id}`)
        .then(res => res.json())
        .then(fresh => {
            setCategories(prev =>
            prev.map(cat => (cat._id === id ? { ...fresh, editing: false } : cat))
            );
        })
        .catch(err => console.error("Failed to revert category", err));
    };
    
    // Edit live input value
    const handleEditCategory = (id, newTitle) => {
        setCategories(prev =>
        prev.map(cat =>
            cat._id === id ? { ...cat, title: newTitle } : cat
        )
        );
    };
    
    // Save update
    const saveCategory = (id) => {
        const category = categories.find(cat => cat._id === id);
        fetch(`https://evently-webapp-react-api.vercel.app/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: category.title }),
        })
        .then(res => res.json())
        .then(updated => {
            setCategories(prev =>
            prev.map(cat =>
                cat._id === updated._id ? { ...updated, editing: false } : cat
            )
            );
        })
        .catch(err => console.error("Failed to update category", err));
    };

    // Delete category
    const deleteCategory = (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        fetch(`https://evently-webapp-react-api.vercel.app/api/categories/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
            setCategories(prev => prev.filter(cat => cat._id !== id));
            })
            .catch(err => console.error("Failed to delete category", err));
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

                <Form.Select
                    value={selectedUserId}
                    onChange={handleUserChange}
                    className="custom-form-select"
                    >
                    {users.map(user => (
                        <option key={user._id} value={user._id}>
                        {user.fullName}
                        </option>
                    ))}
                </Form.Select>

                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={4} className='custom-form-label'>Change Role</Form.Label>
                <Col sm={8}>
                <Form.Select value={selectedUserRole} onChange={handleRoleChange} className="custom-form-select">
                    <option value="Atendee">Atendee</option>
                    <option value="Organiser">Organiser</option>
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
                <Form.Label column sm={4} className="custom-form-label">New Category</Form.Label>
                <Col sm={8}>
                    <Form.Control
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category"
                    className="custom-form-control"
                    />
                    <Button onClick={addCategory} className="mt-2 btn-app">Add Category</Button>
                </Col>
                </Form.Group>
                    
                    {/* Row that renders the categories */}
                <Row className="mt-3">
                    {categories.map((category) => (
                        <Col key={category._id} xl={3} md={4} sm={6} xs={12}>
                        <Card className="mt-2 p-3 d-flex flex-column align-items-center ev-category text-center">
                            {category.editing ? (
                            <>
                                <Form.Control
                                type="text"
                                value={category.title}
                                onChange={(e) => handleEditCategory(category._id, e.target.value)}
                                className="text-center mb-2 white"
                                />
                                <div className="d-flex justify-content-center">
                                <Button
                                    variant="outline-success"
                                    size="sm"
                                    onClick={() => saveCategory(category._id)}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    className="ms-2"
                                    onClick={() => cancelEditCategory(category._id)}
                                >
                                    Cancel
                                </Button>
                                </div>
                            </>
                            ) : (
                            <>
                                <h6 className="mb-2">{category.title}</h6>
                                <div className="d-flex justify-content-center">
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => enableEditCategory(category._id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="ms-2"
                                    onClick={() => deleteCategory(category._id)}
                                >
                                    Delete
                                </Button>
                                </div>
                            </>
                            )}
                        </Card>
                        </Col>
                    ))}
                </Row>

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
