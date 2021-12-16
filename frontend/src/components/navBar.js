import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

export default function NavBar() {
  return (
    <header className="App-header">
      <Navbar expand="sm" bg="light" variant="light">
        <Navbar.Collapse className="justify-content-center">
          <Navbar.Text className="nav-text">
            <Nav className="mr-auto">
              <Link to="/" className="link">
                Home
              </Link>
              <Link to="/music" className="link">
                Music
              </Link>
              <Link to="/videos" className="link">
                Videos
              </Link>
              <Link to="/movies" className="link">
                Movies
              </Link>
              <Link to="/audiobooks" className="link">
                Audio Books
              </Link>
            </Nav>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <div className="welcome-text">
        <h1>iTunes search API</h1>
      </div>
    </header>
  );
}

