import React from 'react';
import { Link } from 'react-router-dom';

class SearchLogin extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.isSignedIn) {
      return(
    <div>
    <section>
      <h1>Hello, {this.props.username}</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <Link to='/new-listing'>
              <img className="ctabuttons float-right" src="img/post.png" />
            </Link>
          </div>
          <div className="col">
            <a onClick={this.props.handleLogOut}>Logout
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
);
    } else {
    return(
    <div>
    <section>
      <div className="container">
        <div className="row">
          <div className="col">
            <Link to='/new-listing'>
              <img className="ctabuttons float-right" src="img/post.png" />
            </Link>
            <Link to="/sign-in">
              <img className="ctabuttons float-right" src="img/login.png" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  </div>
);
  }
  }

}

export default SearchLogin;
