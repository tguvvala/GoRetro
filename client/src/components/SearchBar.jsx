import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'semantic-ui-react';
import $ from 'jquery';
import _ from 'underscore';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTitle: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.debounceFunc = _.debounce(this.handleSearchBar, 500);
    this.handleSearchBar = this.handleSearchBar.bind(this);
  }

  handleChange(e) {
    console.log('changed value', e.target.value);
    this.setState({
      searchTitle: e.target.value
    });
    this.debounceFunc();
  }

  handleSearchBar() {
    var that = this;
    $.ajax({
      url: `/searchListings?title=${that.state.searchTitle}`,
      success: function(response) {
        console.log('RESPONSE IN SearchBar', response);
        that.props.searchByUserInput(response);
      },
      error: function() {
        console.log('check access token error');
      }
    });
  }

  render() {
    return (
      <div className="container">
        <Input size='small' icon='search' placeholder='Search...' onChange={ this.handleChange} />
      </div>
    );
  }

}

export default SearchBar;

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
