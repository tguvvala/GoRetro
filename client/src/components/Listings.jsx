import React from 'react';
import InfiniteGrid from 'react-infinite-grid';
import { Link } from 'react-router-dom';
import Listing from './Listing.jsx';

var tempProps = [{
  'title': 'Star Wars Boba Fett',
  'description': 'Brand new. My kid wanted Batman.',
  'condition': 'New',
  'category': 'Star Wars',
  'username': 'SuburbanDad',
  'email': 'bob@bob.com',
  'zipCode': '52645',
  'legoSetCode': '4D1F56',
  'imageUrl': 'http://aws.com/bucket/images/listing/1/3.jpg',
  'id': '12345'
},
{
  'title': 'Star Wars Boba Fett',
  'description': 'Brand new. My kid wanted Batman.',
  'condition': 'New',
  'category': 'Star Wars',
  'username': 'SuburbanDad',
  'email': 'bob@bob.com',
  'zipCode': '52645',
  'legoSetCode': '4D1F56',
  'imageUrl': 'http://aws.com/bucket/images/listing/1/3.jpg',
  'id': '12545'
},
{
  'title': 'Star Wars Boba Fett',
  'description': 'Brand new. My kid wanted Batman.',
  'condition': 'New',
  'category': 'Star Wars',
  'username': 'SuburbanDad',
  'email': 'bob@bob.com',
  'zipCode': '52645',
  'legoSetCode': '4D1F56',
  'imageUrl': 'http://aws.com/bucket/images/listing/1/3.jpg',
  'id': '12685'
}];

const Listings = (props) => (
  <div className="container">
    { tempProps.map(listing => <Listing listing={listing} key={listing.id}/>) }
  </div>

);



export default Listings;
