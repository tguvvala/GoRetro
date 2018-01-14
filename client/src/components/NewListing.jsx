import React from 'react';
import $ from 'jquery';
import { Link, Redirect, Route } from 'react-router-dom';
import { ValidatorComponent } from 'react-form-validator-core';

class NewListing extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      category: '',
      username: '',
      email: '',
      zipCode: '',
      condition: '',
      legoSetCode: '',
      imageUrl: '',
      isValid: () => {
        return this.state.title.isValid;
      }
    };

    this.defaults = {
      title: {
        value: 'Title of your listing',
        isValid: () => {
          return this.state.title.length > 0;
        }
      }
    };
    // this.isValid = (
    //   this.state.title.validator &&
    //   this.state.category.validator &&
    //   this.state.email.validator &&
    //   this.state.zipCode.validator
    // );

    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.postListing = this.postListing.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.state.isValid = this.state.isValid.bind(this);
  }

  nonState(field) {
    console.log('length: ', this.state[field].length);
    return this.defaults[field].isValid();
  }

  handleBlur(event) {
    let e = event.nativeEvent.target;
    let prop = e.name;
    let next = e.nextSibling;

    console.log('default2', this.defaults[prop]);
    console.log('nonState', this.nonState(prop));

    if (!this.nonState(prop)) {
      next.textContent = 'REQUIRED';
    } else {
      next.textContent = this.defaults[prop].value;
    }
  }

  handleSubmitClick(e) {
    e.preventDefault();
    this.postListing(() => {
      this.clearFields();
    });
  }

  handleChange (event) {
    let name = event.nativeEvent.target.name;
    let value = event.nativeEvent.target.value;
    this.setState({
      [name]: value
    });
  }

  clearFields() {
    // console.log('Clearing fields');
    this.setState({
      listing: {
        title: '',
        description: '',
        category: '',
        username: '',
        email: '',
        zipCode: '',
        condition: '',
        legoSetCode: '',
        imageUrl: ''
      }
    });
  }

  postListing(callback) {
    $.ajax({
      type: 'POST',
      url: '/listings',
      data: this.state,
      success: function() {
        console.log('Succes on react side');
        // figure out how to do this the React Router way
        // window.location.href = '/';
        callback();
      }.bind(this),
      error: function(err) {
        console.log('Post listing errors', err);
      }
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active"><Link to="/">Home</Link></li>
          </ol>
          <form>
            <img
              src="imagePlaceholder.png"
              className="img-photo img-thumbnail rounded"
              alt="Photo" />
            <div className="form-group">
              <input
                type="file"
                className="form-control-file"
                id="selectImage"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                id="titleInput"
                placeholder="Title"
                name="title"
                value={this.state.title.value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
              <small className="form-text text-muted">
                Title of your listing
              </small>

            </div>

            <div className="form-group">
              <textarea
                className="form-control form-control-lg"
                id="descriptionInput"
                rows="3"
                placeholder="Description"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              >
              </textarea>
            </div>

            <div className="form-group">
              <select
                required="true"
                className="form-control form-control-lg"
                id="categorySelect"
                name="category"
                value={this.state.category}
                onChange={this.handleChange}
              >
                <option value="">-- CATEGORY --</option>
                <option value="Star Wars">Star Wars</option>
                <option value="Cityscapes">Cityscapes</option>
                <option value="Star Wars">Farmers</option>
              </select>
            </div>

            <div className="form-group">
              <select
                className="form-control form-control-lg"
                id="conditionSelect"
                name="condition"
                value={this.state.condition}
                onChange={this.handleChange}>
                <option value="">-- CONDITION --</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="missing pieces">Missing Pieces</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                id="legoSetCodeInput"
                placeholder="Lego Set Code"
                name="legoSetCode"
                value={this.state.legoSetCode}
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">The code of the lego set.</small>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                id="nameInput"
                placeholder="Your Name"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                className="form-control form-control-lg"
                id="emailInput"
                aria-describedby="emailHelp"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                id="zipInput"
                placeholder="ZIP Code"
                name="zipCode"
                value={this.state.zipCode}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group row">
              <div className="col-sm-10">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleSubmitClick}>Submit
                </button>
                <Link to="/">
                  <input type="submit" disabled={`${this.state.isValid}`}/>
                  {/*  <button className="btn">
                    Cancel
                  </button>
                */}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default NewListing;

