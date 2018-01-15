import React from 'react';
import RouteProps from 'react-route-props';
import { Link } from 'react-router-dom';

class Listing extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-sm-12 listing-area">
        <Link to='/view-listing'>
          <h2>{this.props.listing.title}</h2>
          <img className="productimg mx-auto d-block" src={ this.props.listing.imageUrl }/>
        </Link>
      </div>
    );
  }
}


export default Listing;
