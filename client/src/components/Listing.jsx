import React from 'react';
import { Link } from 'react-router-dom';

class Listing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div class="container">
          <div className="row">
            <div className="col">
              <Link to='/view-listing'>
                <img className="productimg" src="https://brickshow.com/wp-content/uploads/2017/10/10256_alt1.jpg"/>
                <div className="overlay">
                  <p class="info">{this.props.listing.title}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Listing;
