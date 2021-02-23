import { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Jumbotron, Button } from 'react-bootstrap';
import './App.css';
import axios from 'axios';
import { Link, Route, Switch } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import ProductCard from './ProductCard';

function App() {
  const [data, setData] = useState([]);
  const [productIndex, setProductIndex] = useState(4);
  // const [] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let res = await axios
        .get('https://fakestoreapi.com/products?limit=4')
        .catch((err) => {
          console.error(err);
        });
      if (res.data === undefined) return 'Loding';
      setData(res.data);
    };
    fetchData();
  }, []);

  async function loadMoreProduct() {
    let newItem = [];
    for (let i = productIndex; i < productIndex + 4; i++) {
      await axios
        .get(`https://fakestoreapi.com/products/${i + 1}`)
        .then((res) => {
          newItem.push(res.data);
        });
    }
    setProductIndex(productIndex + 4);
    setData([...data, ...newItem]);

    console.log(productIndex);
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Nana's Bowl
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/detail">
              Detail
            </Nav.Link>
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
      <Switch>
        <Route exact path="/">
          <Jumbotron className="jumbotron">
            <h1>20% OFF on all orders above $100</h1>
            <p>
              Get the best deal for this spring! We offer free shipping and
              little gifts for your pet
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          <div className="container">
            <div className="row">
              {data
                ? data.map((d, i) => {
                    return (
                      <ProductCard
                        data={d}
                        index={d.id}
                        key={d.id}
                        className="product-card"
                      />
                    );
                  })
                : 'Loading'}
            </div>
            {productIndex <= 16 ? (
              <button
                className="btn btn-info mt-3 mb-3"
                onClick={() => {
                  loadMoreProduct();
                }}
              >
                Show more..
              </button>
            ) : null}
          </div>
        </Route>
        <Route exact path="/detail/:id">
          <ProductDetail data={data} />
        </Route>
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </div>
  );
}

export default App;
