
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

function NavbarComponent({ activePage, userRole = "Attendee" }) {
  return (
    <Navbar expand="md" style={{ backgroundColor: '#261D41'}} data-bs-theme="dark" className='navbar-dark bg-dark'>
      <Container>
        <Navbar.Brand href="/" style={{ color: "#A259FF", fontSize: "24px", fontWeight: 'bold'}}>
          Evently
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='text-white' href="/profile" active={activePage === 'profile'}>Profile</Nav.Link>
            <Nav.Link href="/my-events" active={activePage === 'my-events'} style={activePage === 'my-events' ? { color: '#9884C4' } : {}}>
              My Events
            </Nav.Link>
            <Nav.Link className='text-white' href="/discover" active={activePage === 'discover'}>Discover Events</Nav.Link>
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