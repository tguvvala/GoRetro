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
          <dt>Contact Me</dt><dd><a href="https://i.imgur.com/MbWdmgj.jpg">link go here</a></dd>
          <button className="pull-right btn-danger" id="sendTracks"><a id="email" href="mailto:kzay91@gmail.com">send tracks</a></button>
        </dl>
      </div>
    </div>
    <Listings listings={ props.listings } setSelectedListing={ props.setSelectedListing } />
  </div>
);

export default SellerProfile;
