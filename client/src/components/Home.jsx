import React from 'react';
import Listings from './Listings.jsx';
import SearchLogin from './SearchLogin.jsx';
import Categories from './Categories.jsx';

const Home = (props) => (
  <div>
    <div className="primary-header">
      <img className="mainheaderimage" src="https://i.imgur.com/Gyi0M6Q.jpg"/>
    </div>
    <Categories
      category={ props.category }
      handleCategoryClick={ props.handleCategoryClick }
      handleSubCategoryClick={ props.handleSubCategoryClick}
      resetListings ={ props.resetListings }
      searchByUserInput={ props.searchByUserInput }
    />
    <Listings
      listings={ props.listings }
      category={ props.category }
      subCategory={ props.subCategory }
      setSelectedListing={ props.setSelectedListing }
      isSearchResults={ props.isSearchResults }
      getUserListings={ props.getUserListings }
      username={ props.username }
      deleteListing={ props.deleteListing }
    />
  </div>
);

export default Home;
