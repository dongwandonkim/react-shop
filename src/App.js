import { Navbar, Nav, NavDropdown, Jumbotron, Button } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Nana's Bowl</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Jumbotron>
        <h1>20% OFF on all orders above $100</h1>
        <p>
          Get the best deal for this spring! We offer free shipping and little
          gifts for your pet
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img
              src="https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg"
              alt=""
              width="100%"
            />
            <h4>Product Name</h4>
            <p>desc / price</p>
          </div>
          <div className="col-md-4">
            <img
              src="https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg"
              alt=""
              width="100%"
            />
            <h4>Product Name</h4>
            <p>desc / price</p>
          </div>
          <div className="col-md-4">
            <img
              src="https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg"
              alt=""
              width="100%"
            />
            <h4>Product Name</h4>
            <p>desc / price</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
