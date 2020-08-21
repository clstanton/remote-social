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
                      <Link className="nav-link" to="/about">Browse</Link>
                      <Link className="nav-link" to="/projects">Library</Link>
                      <Link className="nav-link" to="/resume">Account</Link>
                    </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Container>
        );
    }
}

export default Navigation;