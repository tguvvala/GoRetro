import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = (props) => (
  <div className="container">
    <ol className="breadcrumb">
      <li className="breadcrumb-item active"><Link to="/">Home</Link></li>
    </ol>
    <div className="col col-lg-4">
      <h3 className="contact-header">Please sign in with Facebook</h3>
     <a href="/login/facebook">Login</a>
    </div>
  </div>
);

export default SignIn;
