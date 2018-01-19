import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import App from './components/App.jsx';
import {StripeProvider} from 'react-stripe-elements';

ReactDOM.render((
  <Router>
    <App />
  </Router>
), document.getElementById('app'));
