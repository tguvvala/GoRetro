import React from 'react';
import Listings from './Listings.jsx';
import SearchLogin from './SearchLogin.jsx';
import Categories from './Categories.jsx';
import SearchBar from './SearchBar.jsx';

const Home = (props) => (
  <div>
    <main role="main">
      <Categories category={ props.category } handleCategoryClick={ props.handleCategoryClick } handleSubCategoryClick={ props.handleSubCategoryClick} resetListings ={props.resetListings}  />
      <SearchBar searchByUserInput = {props.searchByUserInput}/>
      <Listings listings={ props.listings } category={props.category} subCategory={props.subCategory} setSelectedListing={ props.setSelectedListing } isSearchResults={props.isSearchResults} />
    </main>
  </div>
);

export default Home;
