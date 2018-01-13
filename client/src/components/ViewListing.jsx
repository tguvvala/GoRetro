import React from 'react';
import { Link } from 'react-router-dom';

var xprops = {
      "userId": "1000",
      "listingId": "1",
      "title": "Death Star",
      "legoSetCode": "75159",
      "condition": "New",
      "description": "Re-enact amazing scenes from the Star Wars saga with the Empires ultimate planet-zapping weapon the Death Star! With over 4000 pieces, this fantastic model has a galaxy of intricate and authentic environments, including a super laser control room, Imperial conference chamber, hangar bay with moving launch rack and Lord Vader's TIE Advanced with space for Vader inside, Emperor Palpatine's throne room, Droid maintenance room, detention block, trash compactor, tractor beam, cargo area, turbo laser with spring-loaded shooters and seats for the 2 death star gunners, and 2 movable turbo laser towers. This fantastic set also includes 23 iconic minifigures and 2 Droids to ensure hours of Star Wars battle fun. Age: 14+ Over 4,000 Pieces.",
      "imageUrl": "http://aws.com/bucket/images/listing/1/1.jpg",
      "category": "Star Wars",
      "zipCode": "2030",
      "email": "me@example.com"
    };

const ViewListing = (props) => (
  <div>

    <div className="container">
      <ol className="breadcrumb">
        <li className="breadcrumb-item active"><Link to="/">Home</Link></li>
      </ol>
      <div className="row">
        <div className="col">
          <img src="deathstar.jpg" className="img-photo img-view-listing rounded" alt="Photo" />
          <h2 className="post-title">{ props.title }</h2>
          <p>Code: <b>{ props.legoSetCode }</b></p>
          <p>Condition: <b>{ props.condition }</b></p>
          <p>{ props.description }</p>
          <p>Category: <b>{ props.category }</b></p>
          <p>ZIP Code: <b>{ props.zipCode }</b></p>
        </div>

        <div className="col col-lg-4">
          <h3 className="contact-header">Contact the owner</h3>
          <form>
            <div className="form-group">
              <input type="text" className="form-control form-control-lg" id="nameInput" placeholder="Your Name" />
            </div>

            <div className="form-group">
              <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Email" />
            </div>

            <div className="form-group">
              <textarea className="form-control form-control-lg" id="descriptionInput" rows="3" placeholder="Your message"></textarea>
            </div>

            <div className="form-group row">
              <div className="col-sm-10">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default ViewListing;