import React from 'react';
import { Link } from 'react-router-dom';
import Listings from './Listings.jsx';
import { Item } from 'semantic-ui-react';

const SellerProfile = (props) => (
  <div>
    <div className="media">
      <div>
        <img className="media-object" width="150" src="https://i.imgur.com/MbWdmgj.jpg" />
      </div>
      <div className="media-body">
        <dl className="dl-horizontal">
          <dt>Display name</dt><dd className="clearfix">Zay</dd>
          <dt>Email</dt><dd>Lee</dd>
          <button className="pull-right btn-danger"><a id="email" href="mailto:kzay91@gmail.com">Contact Me</a></button>
        </dl>
      </div>
    </div>
    <Listings listings={ props.listings } setSelectedListing={ props.setSelectedListing } />
  </div>
);

export default SellerProfile;
