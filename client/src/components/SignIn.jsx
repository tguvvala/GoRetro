import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = (props) => (
  <div className="container">
    <ol className="breadcrumb">
      <li className="breadcrumb-item active"><Link to="/">Home</Link></li>
    </ol>
    <div className="col col-lg-4">
      <h3 className="contact-header">Please sign in</h3>
      <form>
        <div className="form-group">
          <input type="email" id="inputEmail" className="form-control form-control-lg" placeholder="Email address" required autoFocus />
        </div>

        <div className="form-group">
          <input type="password" id="inputPassword" className="form-control form-control-lg" placeholder="Password" required />
        </div>

        <div className="form-group row">
          <div className="col-sm-10">
            <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default SignIn;