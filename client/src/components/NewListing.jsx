import React from 'react';
import $ from 'jquery';
import { Link, Redirect, Route } from 'react-router-dom';

class NewListing extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.postListing = this.postListing.bind(this);
    this.clearFields = this.clearFields.bind(this);

    this.state = {
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
    };
  }

  handleSubmitClick(e) {
    e.preventDefault();
    this.postListing(this.clearFields);
  }

  handleTitleInputChange(event) {
    this.setState({
      listing: {
        ...this.state.listing,
        title: event.target.value
      }
    });
  }

  handleDescriptionInputChange(event) {
    this.setState({
      listing: {
        ...this.state.listing,
        description: event.target.value
      }
    });
  }

  handleCategoryInputChange(event) {
    this.setState({
      listing: {
        ...this.state.listing,
        category: event.target.value
      }
    });
  }

  handleNameInputChange(event) {
    this.setState({
      listing: {
        ...this.state.listing,
        username: event.target.value
      }
    });
  }

  handleEmailInputChange(event) {
    this.setState({
      listing: {
        ...this.state.listing,
        email: event.target.value
      }
    });
  }

  handleZipCodeInputChange(event) {
    this.setState({
      listing: {
        ...this.state.listing,
        zipCode: event.target.value
      }
    });
  }

  handleConditionInputChange(event) {
    this.setState({
      listing: {
        ...this.state.listing,
        condition: event.target.value
      }
    });
  }

  handleLegoSetCodeInputChange(event) {
    this.setState({
      listing: {
        ...this.state.listing,
        legoSetCode: event.target.value
      }
    });
  }

  handleImageUrlInputChange(event) {
    this.setState({
      listing: {
        ...this.state.listing,
        imageUrl: event.target.value
      }
    });
  }

  clearFields() {
    console.log('Clearing fields')
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
    })
  }

  postListing(callback) {
    $.ajax({
      type: 'POST',
      url: '/listings',
      data: this.state.listing,
      success: function() {
        console.log('Succes on react side')
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
              <input type="text" className="form-control form-control-lg" id="titleInput" placeholder="Title" onChange={this.handleTitleInputChange.bind(this)} value={this.state.listing.title}/>
              <small className="form-text text-muted">The title of the lego set.</small>
            </div>

            <div className="form-group">
              <textarea className="form-control form-control-lg" id="descriptionInput" rows="3"  placeholder="Description" onChange={this.handleDescriptionInputChange.bind(this)} value={this.state.listing.description}></textarea>
            </div>

            <div className="form-group">
              <select className="form-control form-control-lg" id="categorySelect">
                <option>-- CATEGORY --</option>
                <option>Star Wars</option>
                <option>Cityscapes</option>
                <option>Farmers</option>
              </select>
            </div>

            <div className="form-group">
              <select className="form-control form-control-lg" id="conditionSelect">
                <option>-- CONDITION --</option>
                <option>New</option>
                <option>Used</option>
                <option>Missing Pieces</option>
              </select>
            </div>

            <div className="form-group">
              <input type="text" className="form-control form-control-lg" id="legoSetCodeInput" placeholder="Lego Set Code" onChange={this.handleLegoSetCodeInputChange.bind(this)} value={this.state.listing.legoSetCode}/>
              <small className="form-text text-muted">The code of the lego set.</small>
            </div>

            <div className="form-group">
              <input type="text" className="form-control form-control-lg" id="nameInput" placeholder="Your Name" onChange={this.handleNameInputChange.bind(this)} value={this.state.listing.username} />
            </div>

            <div className="form-group">
              <input type="email" className="form-control form-control-lg" id="emailInput" aria-describedby="emailHelp" placeholder="Email" onChange={this.handleEmailInputChange.bind(this)} value={this.state.listing.email}  />
            </div>

            <div className="form-group">
              <input type="text" className="form-control form-control-lg" id="zipInput" placeholder="ZIP Code" onChange={this.handleZipCodeInputChange.bind(this)} value={this.state.listing.zipCode} />
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

