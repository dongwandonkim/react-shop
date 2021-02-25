import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

import { connect, Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

let alertDefaultState = true;
function alertReducer(alertState = alertDefaultState, action) {
  if (action.type === 'close') {
    return !alertState;
  } else return alertState;
}

let defaultState = [];

function reducer(state = defaultState, action) {
  if (action.type === 'addToCart') {
    let sameProductIndex = state.findIndex((d) => {
      return d.id === action.payload.id;
    });
    if (sameProductIndex >= 0) {
      let copyState = [...state];
      copyState[sameProductIndex].qty++;
      return copyState;
    } else {
      let copyState = [...state];
      copyState.push(action.payload);
      return copyState;
    }
  } else if (action.type === 'increase') {
    let sameProductIndex = state.findIndex((d) => {
      return d.id === action.payload;
    });
    if (sameProductIndex >= 0) {
      let copyState = [...state];
      copyState[sameProductIndex].qty++;
      return copyState;
    } else {
      return state;
    }
  } else if (action.type === 'decrease') {
    let sameProductIndex = state.findIndex((d) => {
      return d.id === action.payload;
    });
    if (sameProductIndex >= 0) {
      let copyState = [...state];
      if (copyState[sameProductIndex].qty <= 0) {
        copyState[sameProductIndex].qty = 0;
        return copyState;
      }
      copyState[sameProductIndex].qty--;
      return copyState;
    } else {
      return state;
    }
  } else {
    return state;
  }
}

let store = createStore(combineReducers({ reducer, alertReducer }));

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
