import React from 'react';
import { Link } from 'react-router-dom';
import Listing from './Listing.jsx';

const Listings = (props) => (

  <div className="container">
    <div className="row">
      { props.listings.map(listing => <Listing listing={ listing } key={ listing._id }/>) }
    </div>
  </div>

);



export default Listings;
