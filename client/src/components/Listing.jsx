import React from 'react';
import { Link } from 'react-router-dom';

class Listing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-sm-6">
        <Link to='/view-listing'>
          <img className="productimg" src={ this.props.listing.imageUrl }/>
          <div className="overlay">
            <p className="info">{this.props.listing.title}</p>
          </div>
        </Link>
      </div>
    );
  }
}


export default Listing;
