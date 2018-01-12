import React from 'react';
import { Link } from 'react-router-dom';

const ViewListing = (props) => (
  <div>
    <div className="container">
      <div className="row">
        <div className="col">
          <img src="deathstar.jpg" className="img-photo img-view-listing rounded" alt="Photo" />
          <h2 className="post-title">Death Star</h2>
          <p>Code: <b>75159</b></p>
          <p>Condirion: <b>New</b></p>
          <p>Re-enact amazing scenes from the Star Wars saga with the Empires ultimate planet-zapping weapon the Death Star!
            With over 4000 pieces, this fantastic model has a galaxy of intricate and authentic environments, including a super laser control room,

            Imperial conference chamber, hangar bay with moving launch rack and Lord Vader's TIE Advanced with space for Vader inside, Emperor Palpatine's throne room, Droid maintenance room, detention block, trash compactor, tractor beam, cargo area, turbo laser with spring-loaded shooters and seats for the 2 death star gunners, and 2 movable turbo laser towers.

            This fantastic set also includes 23 iconic minifigures and 2 Droids to ensure hours of Star Wars battle fun.

            Age: 14+
          Over 4,000 Pieces.</p>

          <p>Category: <b>Star Wars</b></p>
          <p>ZIP Code: <b>2000</b></p>
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