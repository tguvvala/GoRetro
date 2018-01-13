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

    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.postListing = this.postListing.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmitClick(e) {
    e.preventDefault();
    this.postListing(this.clearFields);
  }

  handleChange (event) {
    let name = event.nativeEvent.target.name;
    let value = event.nativeEvent.target.value;
    this.setState({
      [name]: value
    });
  }

  clearFields() {
    console.log('Clearing fields');
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
      success: function() {
        console.log('Succes on react side');
        // figure out how to do this the React Router way
        window.location.href = '/';
      },
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
            <img src="imagePlaceholder.png" className="img-photo img-thumbnail rounded" alt="Photo" />
            <div className="form-group">
              <input type="file" className="form-control-file" id="selectImage"/>
            </div>

            <div className="form-group">
              <input type="text"className="form-control form-control-lg" id="titleInput" placeholder="Title" onChange={this.handleChange} name="title" value={this.state.title}/>
              <small className="form-text text-muted">The title of the lego set.</small>
            </div>

            <div className="form-group">
              <textarea className="form-control form-control-lg" id="descriptionInput" rows="3"  placeholder="Description" onChange={this.handleChange} name="description" value={this.state.description}></textarea>
            </div>

            <div className="form-group">
              <select className="form-control form-control-lg" id="categorySelect" name="category" value={this.state.category} onChange={this.handleChange}>
                <option value="">-- CATEGORY --</option>
                <option value="Star Wars">Star Wars</option>
                <option value="Cityscapes">Cityscapes</option>
                <option value="Star Wars">Farmers</option>
              </select>
            </div>

            <div className="form-group">
              <select className="form-control form-control-lg" id="conditionSelect" name="condition" value={this.state.condition} onChange={this.handleChange}>
                <option value="">-- CONDITION --</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="missing pieces">Missing Pieces</option>
              </select>
            </div>

            <div className="form-group">
              <input type="text" className="form-control form-control-lg" id="legoSetCodeInput" placeholder="Lego Set Code" onChange={this.handleChange} name="legoSetCode" value={this.state.legoSetCode}/>
              <small className="form-text text-muted">The code of the lego set.</small>
            </div>

            <div className="form-group">
              <input type="text" className="form-control form-control-lg" id="nameInput" placeholder="Your Name" onChange={this.handleChange} name="username" value={this.state.username} />
            </div>

            <div className="form-group">
              <input type="email" className="form-control form-control-lg" id="emailInput" aria-describedby="emailHelp" placeholder="Email" onChange={this.handleChange} name="email" value={this.state.email} />
            </div>

            <div className="form-group">
              <input type="text" className="form-control form-control-lg" id="zipInput" placeholder="ZIP Code" onChange={this.handleChange} name="zipCode" value={this.state.zipCode} />
            </div>

            <div className="form-group row">
              <div className="col-sm-10">
                <button className="btn btn-primary" onClick={ this.handleSubmitClick }>Submit</button>
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

