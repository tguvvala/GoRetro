import React from 'react';
import { Link } from 'react-router-dom';

class Listing extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-sm-12 listing-area">
        {/* <Link to='/view-listing'> */}
        <Link to='#'>

          <h2>{this.props.listing.title}</h2>
          <img className="productimg mx-auto d-block" src="https://brickshow.com/wp-content/uploads/2017/10/10256_alt1.jpg"/>

        </Link>
      </div>
    );
  }
}


export default Listing;
