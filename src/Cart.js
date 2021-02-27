import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {
  const getPriceOfProduct = (price, qty) => {
    (Math.round(price * qty * 100) / 100).toFixed(2);
  };
  return (
    <div>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {props.state.map((data, i) => {
            return (
              <tr key={i}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{getPriceOfProduct(data.price, data.qty)}</td>
                <td>{data.qty}</td>
                <td>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      props.dispatch({ type: 'decrease', payload: data.id });
                    }}
                  >
                    -
                  </button>
                  <button
                    className="btn btn-secondary ml-2"
                    onClick={() => {
                      props.dispatch({ type: 'increase', payload: data.id });
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {props.alertState === true ? (
        <div className="alert">
          <p>order now and get 20% off</p>
          <button
            onClick={() => {
              props.dispatch({ type: 'close' });
            }}
          >
            close
          </button>
        </div>
      ) : null}
    </div>
  );
}
function stateToProps(state) {
  return {
    state: state.reducer,
    alertState: state.alertReducer,
  };
}

export default connect(stateToProps)(Cart);
// export default Cart;
