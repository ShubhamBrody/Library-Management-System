import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import AuthContext from "../store/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function HeadNavbar() {
  const authctx = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("authctx", authctx);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
          <Navbar.Brand href='/'>Library Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href='/about'>About</Nav.Link>
          </Nav>
          {authctx.isLoggedIn ? (
            <NavDropdown
              title={authctx.user.username}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href={!authctx.isAdmin ? '/myprofilepage' : '/addbook'}>
                {!authctx.isAdmin ? 'My Profile' : 'Add book to library'}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onClick={() => {
                  authctx.logout();
                  window.localStorage.removeItem("LMS_LOGINTIME");
                  window.localStorage.removeItem("LMS_USER");
                  window.localStorage.removeItem("LMS_ISADMIN");
                  navigate("/register");
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
