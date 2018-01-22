import React from 'react';
import { Link } from 'react-router-dom';
import Listings from './Listings.jsx';
import { Item } from 'semantic-ui-react';

const SellerProfile = (props) => (
  <div>
    <div className="media">
      <div className="profilePic">
        <h1>My Store</h1>
        <img className="media-object" width="250" src="https://i.imgur.com/MbWdmgj.jpg" />
      </div>
    </div>
    <Listings
      listings={ props.listings }
      category={ props.category }
      subCategory={ props.subCategory }
      setSelectedListing={ props.setSelectedListing }
      isSearchResults={ props.isSearchResults }
      getUserListings={ props.getUserListings }
      username={ props.username }
    />
  </div>
);

export default SellerProfile;
