import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

let defaultState = [
  { id: 0, name: 'shoes', qty: 2, price: 99.99 },
  { id: 1, name: 'jean', qty: 5, price: 113.99 },
  { id: 2, name: 'shirt', qty: 9, price: 79.99 },
  { id: 3, name: 'socks', qty: 1, price: 12.99 },
];

function reducer(state = defaultState, action) {
  if (action.type === 'increase') {
    let copyState = [...state];
    copyState[0].qty++;
    return copyState;
  } else if (action.type === 'decrease') {
    let copyState = [...state];
    if (copyState[0].qty <= 0) {
      copyState[0].qty = 0;
      return copyState;
    }
    copyState[0].qty--;
    return copyState;
  } else {
    return state;
  }
}

let store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
