import React from 'react';
import Listings from './Listings.jsx';
import SearchLogin from './SearchLogin.jsx';
import Categories from './Categories.jsx';

const Home = (props) => (
  <div>
    <main role="main">
      <SearchLogin />
      <Categories />
      <Listings />
    </main>
  </div>
)

export default Home;