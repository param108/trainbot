import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import appReducers from './reducers'

const sagaMiddleware = createSagaMiddleware();
var store = createStore(appReducers, applyMiddleware(sagaMiddleware));

ReactDOM.render(
  <Provider  store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
);
