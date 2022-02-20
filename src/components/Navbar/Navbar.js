import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import AuthContext from "../store/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function HeadNavbar() {
  const authctx = useContext(AuthContext);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Library Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link style={{ textDecoration: "none" }} to="/"><Nav.Link>Features</Nav.Link></Link>
            <Link style={{ textDecoration: "none" }} to="/about"><Nav.Link>Pricing</Nav.Link></Link>
          </Nav>
          {authctx.isLoggedIn ? (
            <NavDropdown title={authctx.username} id="collasible-nav-dropdown">
              <Link to="/" style={{ textDecoration: "none" }}>
                <NavDropdown.Item>My Profile</NavDropdown.Item>
              </Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                <NavDropdown.Item>Books Borrowed</NavDropdown.Item>
              </Link>
              {!authctx.isAdmin && (
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <NavDropdown.Item>Register the new Admin</NavDropdown.Item>
                </Link>
              )}
              <Link to="/" style={{ textDecoration: "none" }}>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  authctx.logout();
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav>
              <Nav.Link href="/register">Register/Login</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeadNavbar;
