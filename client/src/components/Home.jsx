import React from 'react';
import Listings from './Listings.jsx';
import SearchLogin from './SearchLogin.jsx';
import Categories from './Categories.jsx';

const Home = (props) => (
  <div>
    <main role="main">
      <Categories category={ props.category } handleCategoryClick={ props.handleCategoryClick } handleSubCategoryClick={ props.handleSubCategoryClick} resetListings ={props.resetListings}  />
      <Listings listings={ props.listings } category={props.category} subCategory={props.subCategory} setSelectedListing={ props.setSelectedListing } />
    </main>
  </div>
);

export default Home;
