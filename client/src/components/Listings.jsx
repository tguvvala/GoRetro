import React from 'react';
import { Link } from 'react-router-dom';
import Listing from './Listing.jsx';
import { Item } from 'semantic-ui-react';

const Listings = (props) => (
  <div className="container">
    <h3>{(props.category && props.subCategory) ? `${props.category} > ${props.subCategory}` : props.category ? props.category : 'Most Recent Listings'}</h3>
    <Item.Group>
      { props.listings.map(listing => <Listing listing={ listing } key={ listing._id }/>) }
    </Item.Group>
  </div>
);

export default Listings;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import Listing from './Listing.jsx';
//
// const Listings = (props) => (
//   <div className="container">
//     <div className="row">
//       { props.listings.map(listing => <Listing listing={ listing } key={ listing._id }/>) }
//     </div>
//   </div>
// );
//
// export default Listings;
