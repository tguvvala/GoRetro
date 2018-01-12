import React from 'react';
import { Link } from 'react-router-dom';

const NewListing = (props) => (
  <div>
    <div className="container">
      <ol className="breadcrumb">
        <li className="breadcrumb-item active"><Link to="/">Home</Link></li>
      </ol>
      <form>
        <img src="imagePlaceholder.png" className="img-photo img-thumbnail rounded" alt="Photo" />
        <div className="form-group">
          <input type="file" className="form-control-file" id="selectImage" />
        </div>

        <div className="form-group">
          <input type="text" className="form-control form-control-lg" id="titleInput" placeholder="Lego Title" />
        </div>

        <div className="form-group">
          <textarea className="form-control form-control-lg" id="descriptionInput" rows="3"  placeholder="Description"></textarea>
        </div>

        <div className="form-group">
          <select className="form-control form-control-lg" id="exampleFormControlSelect1">
            <option>-- CATEGORY --</option>
            <option>Star Wars</option>
            <option>Cityscapes</option>
            <option>Farmers</option>
          </select>
        </div>

        <div className="form-group">
          <input type="text" className="form-control form-control-lg" id="nameInput" placeholder="Your Name" />
        </div>

        <div className="form-group">
          <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" />
        </div>

        <div className="form-group">
          <input type="text" className="form-control form-control-lg" id="zipInput" placeholder="ZIP Code" />
        </div>

        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/">
              <button className="btn">
                Cancel
               </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
    <Link to="/user-listings">user listings</Link>
    <Link to="/sign-up">sign-up</Link>
  </div>
);

export default NewListing;