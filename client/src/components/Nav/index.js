import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Navigation extends React.Component {

    render() {
        return (
            <Container>
              <Navbar expand="lg" fixed="top" className="nav-bar ml-auto" bg="transparent" >
              <Navbar.Brand href="/">Remote Social</Navbar.Brand>
    
                <Navbar.Toggle className="border-0" aria-controls="navbar-toggle" />
                <Navbar.Collapse id="navbar-toggle">
                  
                    <Nav className="ml-auto">
                      <Link className="nav-link" to="/browse">Browse</Link>
                      <Link className="nav-link" to="/library">Library</Link>
                      <Link className="nav-link" to="/account">Account</Link>
                    </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Container>
        );
    }
}

export default Navigation;