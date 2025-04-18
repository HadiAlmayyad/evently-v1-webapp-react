import React, { useState } from "react";
import { Card, Row, Col, Badge, Dropdown } from "react-bootstrap";
import users from "../../util/dUsers.json"; 
import UserViewModal from "./UserViewModal";

export default function UsersTabContent() {

  const [selectedUser, setSelectedUser] = useState(null);
  const [userList, setUserList] = useState(users); // from JSON

  const handleView = (user) => setSelectedUser(user);

  const handleClose = () => setSelectedUser(null);


  const handleAction = (userId, action) => {
    const newState =
      action === "suspend" ? "suspended" :
      action === "delete" ? "deleted" :
      action === "restore" ? "active":
      "active";
  
    setUserList((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, accountState: newState } : user
      )
    );
  };

  return (
    <>

      {/* Users List */}
      {userList.map((user) => (

        // Container of each user
        <Card
          key={user.id}
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
                  Manage
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleAction(user.id, "suspend")}>
                        Suspend Account
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleAction(user.id, "delete")}>
                        Delete Account
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleAction(user.id, "restore")}>
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
