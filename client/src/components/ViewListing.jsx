import React from 'react';
import { Link } from 'react-router-dom';

var xprops = {
        "_id": "5a590b8868bfac731cec4d85",
        "title": "Star Wars Boba Fett",
        "description": "Brand new. My kid wanted Batman.",
        "condition": "New",
        "category": "Star Wars",
        "username": "SuburbanDad",
        "email": "bob@bob.com",
        "zipCode": "52645",
        "legoSetCode": "4D1F56",
        "imageUrl": "http://aws.com/bucket/images/listing/1/3.jpg",
        "__v": 0,
        "createdAt": "2018-01-12T19:24:56.463Z"
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