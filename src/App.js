import { useState, useEffect, lazy, Suspense } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import './App.css';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Category from './Category';
import Cart from './Cart';

let ProductDetail = lazy(() => import('./ProductDetail'));
let ProductCard = lazy(() => import('./ProductCard'));

function App() {
  const [data, setData] = useState([]);
  const [productIndex, setProductIndex] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(false);
    // console.log(productIndex);
  }

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Jumbotron className="text-center">
            <h1>20% OFF on all orders above $100</h1>
            <p>
              Get the best deal for this spring! We offer free shipping and
              little gifts for your order!
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="container">
              <div className="row">
                {data
                  ? data.map((d, i) => {
                      return (
                        <ProductCard
                          data={d}
                          index={d.id}
                          key={i}
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
                    setIsLoading(true);
                  }}
                  disabled={isLoading}
                >
                  {isLoading === true ? 'Loading..' : 'Show more..'}
                </button>
              ) : (
                <div>All products are loaded</div>
              )}
            </div>
          </Suspense>
        </Route>
        <Route exact path="/detail/:id">
          <Suspense fallback={<div> Loading... </div>}>
            <ProductDetail data={data} />
          </Suspense>
        </Route>
        <Route exact path="/category/:categoryName">
          <Category></Category>
        </Route>
        <Route exact path="/cart">
          <Cart></Cart>
        </Route>
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </div>
  );
}

export default App;
