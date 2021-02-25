import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './ProductDetail.scss';
import { connect } from 'react-redux';

function ProductDetail(props) {
  const [alert, setAlert] = useState(true);
  const [data, setData] = useState([]);
  const [tab, setTab] = useState(0);
  const [animSwitch, setAnimSwitch] = useState(false);

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
    let res = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => console.error(err));
    setData(res.data);
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
          <p>${data.price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              props.dispatch({
                type: 'addToCart',
                payload: {
                  id: data.id,
                  name: data.title,
                  qty: 1,
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
        <TabContent tab={tab} setAnimSwitch={setAnimSwitch} />
      </CSSTransition>
    </div>
  );
}
function TabContent(props) {
  useEffect(() => {
    props.setAnimSwitch(true);
  });
  if (props.tab === 0) {
    return <div>first tab</div>;
  } else if (props.tab === 1) {
    return <div>second tab</div>;
  } else if (props.tab === 2) {
    return <div>third tab</div>;
  }
}

function stateToProps(state) {
  return {
    state: state.reducer,
    alertState: state.alertReducer,
  };
}
export default connect(stateToProps)(ProductDetail);
