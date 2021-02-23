import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        SteeL
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            <NavDropdown.Item href="/category/electronics">
              Electronics
            </NavDropdown.Item>
            <NavDropdown.Item href="/category/jewelery">
              Jewelery
            </NavDropdown.Item>
            <NavDropdown.Item href="/category/men clothing">
              Men Clothing
            </NavDropdown.Item>
            <NavDropdown.Item href="/category/women clothing">
              Women Clothing
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavBar;
