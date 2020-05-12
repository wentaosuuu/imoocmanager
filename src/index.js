import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import  './style.js';
import {Provider} from 'react-redux';
import configureStore from './redux/store/configureStore';

// const mock = true;
// if (mock){
//   require('./mock/index');
// }
const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Router/>
  </Provider>,
  document.getElementById('root')
);
