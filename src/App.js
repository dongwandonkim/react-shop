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

  // function getProductIndex() {
  //   let lastProductIndex = Math.max.apply(
  //     Math,
  //     data.map(function (o) {
  //       return o.id;
  //     })
  //   );
  //   // setProductIndex(lastProductIndex);
  //   // console.log(productIndex);
  //   loadMoreProduct(lastProductIndex);
  // }

  async function loadMoreProduct(idx) {
    let newItem = [];
    for (let i = idx; i < idx + 4; i++) {
      await axios
        .get(`https://fakestoreapi.com/products/${i + 1}`)
        .then((res) => {
          newItem.push(res.data);
        });
    }
    setData([...data, ...newItem]);
    setProductIndex(idx + 4);
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/">Nana's Bowl</Link>
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
                    return <ProductCard data={d} index={i} key={d.id} />;
                  })
                : 'Loading'}
            </div>
            <button
              className="btn btn-info"
              onClick={() => {
                loadMoreProduct(productIndex);
              }}
            >
              Show more..
            </button>
          </div>
        </Route>
        <Route exact path="/detail/:id">
          <ProductDetail data={data} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
