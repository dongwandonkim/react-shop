import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './ProductDetail.scss';
import { connect } from 'react-redux';

function ProductDetail(props) {
  const [alert, setAlert] = useState(true);
  const [data, setData] = useState([]); //fetched data
  const [tab, setTab] = useState(0); //bottom tab nav
  const [animSwitch, setAnimSwitch] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [btnAble, setBtnAble] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    fetchSingleItem(id);
    let timer = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [id]);

  const fetchSingleItem = async (id) => {
    try {
      let res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      console.log(res);
      // setData(res.data);
      setData({
        category: res.data.category,
        description: res.data.description,
        id: res.data.id,
        image: res.data.image,
        price: res.data.price.toFixed(2),
        title: res.data.title,
      });
      setBtnAble(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  let history = useHistory();

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          {data.image ? (
            <img src={data.image} width="100%" alt="img" />
          ) : (
            'loading image...'
          )}
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{data.title}</h4>
          <p>{data.description}</p>
          <p>$ {data.price}</p>
          <div className="quantity-wrapper">
            <label>Qty: {quantity}</label>
            <button
              className="btn btn-secondary"
              onClick={() => {
                if (quantity <= 1) {
                  setQuantity(1);
                } else {
                  setQuantity(quantity - 1);
                }
              }}
            >
              -
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              +
            </button>
          </div>
          <div className="btn-wrapper">
            <button
              disabled={btnAble}
              className="btn btn-danger mx-2"
              onClick={() => {
                props.dispatch({
                  type: 'addToCart',
                  payload: {
                    id: data.id,
                    name: data.title,
                    qty: quantity,
                    price: data.price,
                  },
                });
                history.push('/cart');
              }}
            >
              Add to Cart
            </button>
            <button
              className="btn btn-info mx-2"
              onClick={() => {
                history.goBack();
              }}
            >
              Back
            </button>
          </div>
          {alert === true ? <div className="alert mt-3">stocks low</div> : null}
        </div>
      </div>
      <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              setAnimSwitch(false);
              setTab(0);
            }}
          >
            Product Info
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              setAnimSwitch(false);
              setTab(1);
            }}
          >
            Shipping Info
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={animSwitch} classNames="wow" timeout={500}>
        <TabContent data={data} tab={tab} setAnimSwitch={setAnimSwitch} />
      </CSSTransition>
    </div>
  );
}
function TabContent(props) {
  useEffect(() => {
    props.setAnimSwitch(true);
  });
  if (props.tab === 0) {
    return (
      <div className="tab-content">
        <div>{props.data.description}</div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias,
          consectetur. Molestias aspernatur consequuntur culpa cupiditate sunt
          tenetur quam nulla nesciunt voluptatum pariatur alias praesentium
          veritatis, sint eos iusto, reiciendis molestiae.
        </p>
      </div>
    );
  } else if (props.tab === 1) {
    return (
      <div className="tab-content">
        <div>FREE Shipping on orders over $100</div>
      </div>
    );
  }
}

function stateToProps(state) {
  return {
    state: state.reducer,
    alertState: state.alertReducer,
  };
}
export default connect(stateToProps)(ProductDetail);
