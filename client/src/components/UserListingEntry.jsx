import React from 'react';

const UserListingEntry = (props) => (
  <tr>
    <td>{ props.title }</td>
    <td>{ props.createdAt }</td>
    <td>Delete somehow</td>
  </tr>
)

export default UserListingEntry;
