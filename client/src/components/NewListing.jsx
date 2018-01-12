import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

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
        name: '',
        email: '',
        zipCode: '',
        condition: '',
        legoSetCode: ''
      }
    };
  }

  handleSubmitClick(e) {
    e.preventDefault();
    this.postListing();
  }

  handleNameInputChange(event) {
    this.setState({
      listing: {
        name: event.target.value
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
        name: '',
        email: '',
        zipCode: '',
        condition: '',
        legoSetCode: ''
      }
    })
  }

  postListing() {
    $.post({
      url: '/listing',
      dataType: 'json',
      data: this.state.listing,
      success: () => {
        this.clearFields();
      },
      error: (err) => {
        console.log('Post listing error', err);
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
              <input type="text" className="form-control form-control-lg" id="titleInput" placeholder="Title" />
              <small className="form-text text-muted">The title of the lego set.</small>
            </div>

            <div className="form-group">
              <textarea className="form-control form-control-lg" id="descriptionInput" rows="3"  placeholder="Description"></textarea>
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
              <input type="text" className="form-control form-control-lg" id="legoSetCodeInput" placeholder="Code" />
            </div>
            <small className="form-text text-muted">The code of the lego set.</small>

            <div className="form-group">
              <input type="text" className="form-control form-control-lg" id="nameInput" placeholder="Your Name" onChange={this.handleNameInputChange.bind(this)} value={this.state.listing.name} />
            </div>

            <div className="form-group">
              <input type="email" className="form-control form-control-lg" id="emailInput" aria-describedby="emailHelp" placeholder="Email" />
            </div>

            <div className="form-group">
              <input type="text" className="form-control form-control-lg" id="zipInput" placeholder="ZIP Code" />
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
        <Link to="/user-listings">user listings</Link>
        <Link to="/sign-up">sign-up</Link>
      </div>
    );
  }
}


export default NewListing;


    // var title = this.titleElement.value;


    // this.titleElement = document.getElementById('titleInput');
    // this.descriptionElement = document.getElementById('descriptionInput');
    // console.log(this)
    // var description = this.descriptionElement.value;
    // console.log(description)
    // this.categoryElement = document.getElementById('categorySelect');
    // this.nameElement = document.getElementById('nameInput');
    // this.emailElement = document.getElementById('emailInput');
    // this.zipCodeElement = document.getElementById('zipInput');
    // this.conditionSelectElement = document.getElementById('conditionSelect');
    // this.legoSetCodeElement = document.getElementById('legoSetCodeInput');



    // var description = this.descriptionElement.value;
    // console.log(description)
    // console.log(this.categoryElement);
    // var category = this.categoryElement.options[categoryElement.selectedIndex].text;
    // var name = this.nameElement.value;
    // var email = this.emailElement.value;
    // var zipCode = this.zipCodeElement.value;
    // var condition = this.conditionSelectElement.options[conditionSelect.selectedIndex].text;
    // var legoSetCode = this.legoSetCodeElement.value;

    // var listing = {
    //   userId: userId,
    //   title: title,
    //   description: description,
    //   category: category,
    //   name: name,
    //   email: email,
    //   zipCode: zipCode,
    //   condition: condition,
    //   legoSetCode: legoSetCode
    // };