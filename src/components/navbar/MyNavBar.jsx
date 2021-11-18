import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Link className="navbar-brand" to="/">
          Inicio
        </Link>
        <Nav className="me-auto">
          <Link to="/new" className="nav-link">
            Nuevo
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
