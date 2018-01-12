import React from 'react';
import { Link } from 'react-router-dom';

const SearchLogin = (props) => (
  <div>
    <section>
      <div className="container">
        <div className="row">
           <div className="col">
            <Link to='/new-listing'>
              <img className="ctabuttons float-right" src="post.png" />
            </Link>
            <img className="ctabuttons float-right" src="login.png" />
          </div>

        </div>

      </div>
    </section>
  </div>
);

export default SearchLogin;
