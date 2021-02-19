import { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Jumbotron, Button } from 'react-bootstrap';
import './App.css';
import axios from 'axios';
// import fetchedData from './data';
// import fetchedData from './fakeData';

// const fetchedData = axios
//   .get('https://fakestoreapi.com/products?limit=10')
//   .then((res) => console.log(res.data))
//   .catch((err) => {
//     console.log(err);
//   });

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products?limit=10')
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          {data
            ? data.map((d, i) => {
                console.log(d);
                return <ProductCard data={d} index={i} key={d.id} />;
              })
            : 'Loading'}
        </div>
      </div>
    </div>
  );
}

function ProductCard(props) {
  return (
    <div className="col-md-4">
      <img src={props.data.image} alt="" width="100%" />
      <h4>{props.data.title}</h4>
      <p>
        {props.data.content} Price:{props.data.price}
      </p>
    </div>
  );
}
export default App;
