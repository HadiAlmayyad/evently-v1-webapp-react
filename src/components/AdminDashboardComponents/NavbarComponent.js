
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

function NavbarComponent({ activePage, userRole }) {
  return (
    <Navbar expand="md" style={{ backgroundColor: '#261D41' }} data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/" style={{ color: '#5120E3', fontWeight: 'bold' }}>
          Evently
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/profile" active={activePage === 'profile'}>Profile</Nav.Link>
            <Nav.Link href="/discover" active={activePage === 'discover'}>Discover Events</Nav.Link>
            <Nav.Link href="/dashboard" active={activePage === 'dashboard'} style={activePage === 'dashboard' ? { color: '#5120E3' } : {}}>
              Dashboard
            </Nav.Link>
            <Nav.Link href="/venues" active={activePage === 'venues'} style={activePage === 'venues' ? { color: '#5120E3' } : {}}>
              Venues
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed In As {userRole} | <a href="/logout">Logout</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;