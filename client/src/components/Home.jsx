import React from 'react';
import Listings from './Listings.jsx';
import SearchLogin from './SearchLogin.jsx';
import Categories from './Categories.jsx';

const Home = (props) => (
  <div>
    <main role="main">
      <SearchLogin isSignedIn={props.isSignedIn} userId={props.userId} username={props.username} handleLogOut={props.handleLogOut}/>
      <Categories category={ props.category } handleCategoryClick={ props.handleCategoryClick } handleSubCategoryClick={ props.handleSubCategoryClick} />
      <Listings listings={ props.listings } setSelectedListing={ props.setSelectedListing } />
    </main>
  </div>
);

export default Home;
