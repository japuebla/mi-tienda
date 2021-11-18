import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store/store'; 
import Router from './routes/Router';

//importando css de bootstrap
import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);


