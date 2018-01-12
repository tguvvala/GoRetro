import React from 'react';
import UserListingEntry from './UserListingEntry.jsx';
var xuserListings = [];
const UserListings = ({userListings}) => (
  <div>
      <table className="table">
        <tbody>
          { xuserListings.map(userListing => <UserListingEntry userListing={userListing} key={userListing.created_at} />) }
        </tbody>
      </table>
  </div>
)

export default UserListings;
