import React from 'react';
import { Link } from 'react-router-dom';

class Listing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <Link to='/view-listing'>
              <div className="card" >
                <div id="f1_container">
                  <div id="f1_card" className="shadow">
                    <div className="front face">
                      <img className="card-img-top productimg" src="https://brickshow.com/wp-content/uploads/2017/10/10256_alt1.jpg"/>
                    </div>
                    <div className="back face center">
                      <p>{this.props.listing.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}


export default Listing;
