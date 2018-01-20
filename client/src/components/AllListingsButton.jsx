import React from 'react';
import { Button } from 'semantic-ui-react';

const AllListingsButton = (props) => (
  <Button size='small' onClick={props.handleClick}>All Listings</Button>
);

export default AllListingsButton;