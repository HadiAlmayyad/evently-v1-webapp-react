import React, { useState, useEffect } from "react";
import { Card, Row, Col, Badge, Dropdown } from "react-bootstrap";
import users from "../../util/dUsers.json"; 
import UserViewModal from "./UserViewModal";

export default function UsersTabContent() {

  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loadingUserId, setLoadingUserId] = useState(null);

  // Fetch users on mount
  useEffect(() => {
    fetch('https://evently-webapp-react-api.vercel.app/api/users')
      .then(res => res.json())
      .then(data => setUserList(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleView = (user) => {
    fetch(`https://evently-webapp-react-api.vercel.app/api/users/${user._id}`)
      .then(res => res.json())
      .then(fullUser => setSelectedUser(fullUser))
      .catch(err => console.error('Error fetching user details:', err));
  };
  const handleClose = () => setSelectedUser(null);


  const handleAction = (userId, action) => {
    const newState =
      action === "suspend" ? "suspended" :
      action === "delete" ? "deleted" :
      action === "restore" ? "active" :
      "active";
  

      setLoadingUserId(userId); // start spinner

    fetch(`https://evently-webapp-react-api.vercel.app/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountState: newState }),
    })
      .then(res => res.json())
      .then(updatedUser => {
        setUserList(prev =>
          prev.map(user =>
            user._id === updatedUser._id ? updatedUser : user
          )
        );
      })
      .catch(err => console.error("Failed to update user state:", err))
      .finally(() => setLoadingUserId(null)); // stop spinner
  };
  

  return (
    <>

      {/* Users List */}
      {userList.map((user) => (

        // Container of each user
        <Card
          key={user._id}
          className="mb-3 p-3 custom-user-card"
          style={{ cursor: "pointer" }}
          onClick={() => handleView(user)}
        >
          <Row>
            <Col xs={12} md={3}>
              <h6 className="mb-1">{user.fullName}</h6>
              <small className="user-email">{user.email}</small>
            </Col>

            <Col xs={6} md={2}>
              <div><strong>ID:</strong> {user.stuId}</div>
              <div><strong>Gender:</strong> {user.gender}</div>
            </Col>

            <Col xs={6} md={3}>
              <div><strong>Major:</strong> {user.major}</div>
              <div>
                <strong>Role:</strong>{" "}
                <Badge bg={user.role === "Organiser" ? "primary" : "secondary"}>
                  {user.role}
                </Badge>
              </div>
            </Col>

            <Col xs={6} md={2}>
              <strong>Status:</strong>{" "}
              <Badge
                bg={
                    user.accountState === "active"
                    ? "success"
                    : user.accountState === "suspended"
                    ? "warning"
                    : "danger"
                }
                >
                {user.accountState}
                </Badge>
            </Col>
                

                {/* Manage button */}
            <Col xs={6} md={2} className="text-end">
              <Dropdown className="user-dropdown" onClick={(e) => e.stopPropagation()}>
                <Dropdown.Toggle variant="outline-light" size="sm">
                {loadingUserId === user._id ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Updating...
                  </span>
                ) : (
                  'Manage'
                )}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleAction(user._id, "suspend")}>
                        Suspend Account
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleAction(user._id, "delete")}>
                        Delete Account
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleAction(user._id, "restore")}>
                        Restore Account
                    </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card>
      ))}

      {/* This comoponent is shown when clicking on a user card */}
      <UserViewModal 
        user={selectedUser} 
        show={!!selectedUser} 
        onHide={handleClose} 
        />

    </>
  );
}
