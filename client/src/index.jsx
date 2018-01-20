import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import App from './components/App.jsx';
import {StripeProvider} from 'react-stripe-elements';

ReactDOM.render((
  <Router>
    <StripeProvider apiKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh">
      <App />
    </StripeProvider>
  </Router>
), document.getElementById('app'));
