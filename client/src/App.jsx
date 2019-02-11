import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import 'bootstrap/dist/css/bootstrap.css';
import 'styles/app.scss';
import Router from 'routes/Router';
import ScrollToTop from './components/ScrollToTop';


const App = () => (
  <BrowserRouter>
    <ScrollToTop>
      <div>
        <Router />
      </div>
    </ScrollToTop>
  </BrowserRouter>
);


export default hot(App);
