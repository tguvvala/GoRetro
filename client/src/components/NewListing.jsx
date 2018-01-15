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
      imageUrl: ''
    };

    this.validate = {
      valueEntered: (field) => {
        return this.state[field].length > 0;
      },
      validEmail: (field) => {
        let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailPattern.test(this.state[field]);
      }
    };

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

  allFieldsValid() {
    let valid = true;
    for (var key in this.defaults) {
      if (!this.isFieldValid(key)) {
        valid = false;
      }
    }
    return valid;
  }

  isFieldValid(prop) {
    let next = $(`input[name=${prop}]`)['0'].nextSibling;
    if (!this.defaults[prop].isValid()) {
      next.textContent = this.defaults[prop].errorMessage;
      return false;
    }
    next.textContent = this.defaults[prop].value;
    return true;
  }

  handleBlur(event) {
    let e = event.nativeEvent.target;
    let prop = e.name;
    this.isFieldValid(prop);
  }

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

  clearFields() {
    this.setState({
      title: '',
      description: '',
      category: '',
      username: '',
      email: '',
      zipCode: '',
      condition: '',
      legoSetCode: '',
      imageUrl: ''
    });
  }

  postListing(callback) {
    $.ajax({
      type: 'POST',
      url: '/listings',
      data: this.state,
      dataType: 'json',
      success: function(data) {
        alert(`YOUR LISTING WAS SUCCESSFULLY ADDED!
               YOUR LISTING ID IS: ${data['_id']}`);
        // figure out how to do this the React Router way
        // window.location.href = '/';
        callback(data);
      }.bind(this),
      error: function(err) {
        console.log('Post listing errors', err);
      }
    });
  }

  handleSelectImageChange() {
    const files = document.getElementById("selectImage").files;
    const file = files[0];
    if(file == null){
      return alert('No file selected.');
    }
    this.getSignedRequest(file);
  }

  getSignedRequest(file) {
    var that = this;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          const response = JSON.parse(xhr.responseText);
          that.uploadFile(file, response.signedRequest, response.url);
        }
        else{
          console.log('Error uploading file')
        }
      }
    };
    xhr.send();
  }

  uploadFile(file, signedRequest, url){
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          document.getElementById('preview').src = url;
          document.getElementById('image-url').value = url;
        }
        else{
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
            <input
              type="hidden"
              id="image-url"
              name="image-url"
              value="imagePlaceholder.png" />
            <img
              id="preview"
              src="imagePlaceholder.png"
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
                <option value="Other">Other</option>
              </select>
              <small className="form-text text-muted">
                CATEGORY
              </small>
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
              <small className="form-text text-muted">
                CONDITION
              </small>
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
              <small className="form-text text-muted">
                THE LEGO CODE FOR YOUR SET
              </small>
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
                onBlur={this.handleBlur}
              />
              <small className="form-text text-muted">
                YOUR NAME
              </small>
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
                onBlur={this.handleBlur}
              />
              <small className="form-text text-muted">
                EMAIL
              </small>
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
                  {/* <input type="submit" onClick={this.handleSubmitClick} disabled="false"/> */}
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

