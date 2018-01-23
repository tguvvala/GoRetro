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
      subCategory: '',
      username: props.username,
      email: '',
      zipCode: '',
      condition: '',
      imageUrl: ''
    };

    // General validation rules
    this.validate = {
      valueEntered: (field) => {
        return this.state[field].length > 0;
      },
      validEmail: (field) => {
        let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailPattern.test(this.state[field]);
      }
    };

    // Set validation rules for form fields
    this.defaults = {
      title: {
        value: 'TITLE',
        errorMessage: 'REQUIRED',
        isValid: () => {
          return this.validate.valueEntered('title');
        }
      },
      username: {
        value: 'YOUR NAME',
        errorMessage: 'REQUIRED',
        isValid: () => {
          return this.validate.valueEntered('username');
        }
      },
      email: {
        value: 'EMAIL',
        errorMessage: 'VALID EMAIL REQUIRED',
        isValid: () => {
          return this.validate.valueEntered('email') &&
                 this.validate.validEmail('email');
        }
      },
      zipCode: {
        value: 'ZIP CODE',
        errorMessage: 'REQUIRED',
        isValid: () => {
          return this.validate.valueEntered('zipCode');
        }
      }
    };

    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.postListing = this.postListing.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSelectImageChange = this.handleSelectImageChange.bind(this);
    this.getSignedRequest = this.getSignedRequest.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  // Function that checks all form fields with validation rule
  allFieldsValid() {
    let valid = true;
    for (var key in this.defaults) {
      if (!this.isFieldValid(key)) {
        valid = false;
      }
    }
    return valid;
  }


  // Function that validates an individual form field.
  // If invalid, error styling is added to the field
  isFieldValid(prop) {
    let next = $(`input[name=${prop}]`)['0'].nextSibling;
    if (!this.defaults[prop].isValid()) {
      next.textContent = this.defaults[prop].errorMessage;
      $(`input[name=${prop}]`).addClass('invalid');
      return false;
    }
    next.textContent = this.defaults[prop].value;
    $(`input[name=${prop}]`).removeClass('invalid');
    return true;
  }

  // Function that runs validator once a field becomes inactive
  handleBlur(event) {
    let e = event.nativeEvent.target;
    let prop = e.name;
    this.isFieldValid(prop);
  }

  // Function that checks all form fields for validation
  // before sending POST request to server.
  // If all fields are valid, information is sent to server
  handleSubmitClick(e) {
    e.preventDefault();
    if (this.allFieldsValid()) {
      this.postListing(() => {
        this.clearFields();
      });
    } else {
      alert('PLEASE CHECK YOUR LISTING TO ENSURE ALL REQUIRED FIELDS ARE FILLED IN');
    }
  }

  handleChange (event) {
    let name = event.nativeEvent.target.name;
    let value = event.nativeEvent.target.value;
    this.setState({
      [name]: value
    });
  }

  // Function that clears form fields after submission
  clearFields() {
    this.setState({
      title: '',
      description: '',
      category: '',
      subCategory: '',
      username: '',
      email: '',
      zipCode: '',
      condition: '',
      imageUrl: ''
    });
  }

  postListing() {
    $.ajax({
      type: 'POST',
      url: '/listings',
      data: this.state,
      dataType: 'json',
      success: function(data) {
        window.location.href = '/';
      }.bind(this),
      error: function(err) {
        console.log('Post listing errors', err);
      }
    });
  }

  handleSelectImageChange() {
    const files = document.getElementById('selectImage').files;
    const file = files[0];
    if (file == null) {
      return alert('No file selected.');
    }
    this.getSignedRequest(file);
  }

  getSignedRequest(file) {
    var that = this;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          that.uploadFile(file, response.signedRequest, response.url);
        } else {
          console.log('Error uploading file');
        }
      }
    };
    xhr.send();
  }

  uploadFile(file, signedRequest, url) {
    var that = this;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          document.getElementById('preview').src = url;
          document.getElementById('image-url').value = url;
          that.setState({
            imageUrl: url
          });
        } else {
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }

  render() {
    return (
      <div>
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item active"><Link to="/">Home</Link></li>
          </ol>
          <form>

            {/* Image Upload Section */}

            <input
              type="hidden"
              id="image-url"
              name="image-url"
              value="imagePlaceholder.png" />
            <img
              id="preview"
              src="img/imagePlaceholder.png"
              className="img-photo img-thumbnail rounded"
              alt="Photo" />
            <p id="status">Please select a file</p>
            <div className="form-group">
              <input
                type="file"
                className="form-control-file"
                id="selectImage"
                onChange={this.handleSelectImageChange}
              />
            </div>


            {/* Title Section */}

            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                id="titleInput"
                placeholder="Title"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
              <small className="form-text text-muted">
                TITLE
              </small>
            </div>


            {/* Description Section */}

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
              <small className="form-text text-muted">
                DESCRIPTION
              </small>
            </div>


            {/* Category Section */}

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
                <option value="Electronics">Electronics</option>
                <option value="Toys/Games">Toys/Games</option>
                <option value="Gear">Gear</option>
              </select>
              <small className="form-text text-muted">
                CATEGORY
              </small>
            </div>

            {/*SubCategory Section*/}

            <div className="form-group">
              <select
                required="true"
                className="form-control form-control-lg"
                id="subCategorySelect"
                name="subCategory"
                value={this.state.subCategory}
                onChange={this.handleChange}
              >
                <option value="">-- SUBCATEGORY --</option>
                <option value="Console">Console</option>
                <option value="PC">PC</option>
                <option value="Handheld">Handheld</option>
                <option value="Board Games">Board Games</option>
                <option value="Toys">Toys</option>
                <option value="Collectibles">Collectibles</option>
                <option value="Mens">Mens</option>
                <option value="Womens">Womens</option>
                <option value="Kids">Kids</option>
              </select>
              <small className="form-text text-muted">
                SUBCATEGORY
              </small>
            </div>


            {/* Condition Section */}

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
              <small className="form-text text-muted">
                CONDITION
              </small>
            </div>

            {/* Username Section */}

            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                id="nameInput"
                placeholder={this.props.username}
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                readOnly
              />
              <small className="form-text text-muted">
                YOUR NAME
              </small>
            </div>


            {/* Email Section */}

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
                onBlur={this.handleBlur}
              />
              <small className="form-text text-muted">
                EMAIL
              </small>
            </div>


            {/* Zip Code Section */}

            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                id="zipInput"
                placeholder="ZIP Code"
                name="zipCode"
                value={this.state.zipCode}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
              <small className="form-text text-muted">
                ZIP CODE
              </small>
            </div>

            <div className="form-group row">
              <div className="col-sm-10">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.handleSubmitClick}
                >
                  Submit
                </button>
                <Link to="/">
                  <button className="btn">
                    Cancel
                  </button>
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
