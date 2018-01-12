import React from 'react';
import Listings from './Listings.jsx';
import SearchLogin from './SearchLogin.jsx';
import Banner from './Banner.jsx';

const Home = (props) => (
  <div>
    <main role="main">
      <SearchLogin />
      <Listings />
    </main>
  </div>
)

export default Home;