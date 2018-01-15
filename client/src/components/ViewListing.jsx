import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';


class ViewListing extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmitButtonClicked = this.handleSubmitButtonClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      name: '',
      email: '',
      message: '',
      listing: ''
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
      name: {
        errorMessage: 'NAME REQUIRED',
        isValid: () => {
          return this.validate.valueEntered('name');
        }
      },
      email: {
        errorMessage: 'VALID EMAIL REQUIRED',
        isValid: () => {
          return this.validate.valueEntered('email') &&
                 this.validate.validEmail('email');
        }
      }
    };
  }

  componentDidMount() {
    this.getListing(this.props.location.search, (data) => {
      this.setState({
        listing: data.slice()[0]
      });
    });
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
      $(`input[name=${prop}]`).addClass('invalid');
      return false;
    }
    next.textContent = '';
    $(`input[name=${prop}]`).removeClass('invalid');
    return true;
  }

  handleBlur(event) {
    let e = event.nativeEvent.target;
    let prop = e.name;
    this.isFieldValid(prop);
  }

  handleChange(event) {
    let e = event.nativeEvent;
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmitButtonClicked(e) {
    var that = this;
    e.preventDefault();
    if (this.allFieldsValid()) {
      $.ajax({
        type: 'POST',
        url: '/mailer',
        data: {
          name: this.state.name,
          email: this.state.email,
          message: this.state.message
        },
        success: function() {
          that.setState({
            name: '',
            email: '',
            message: ''
          });
          alert('YOUR MESSAGE HAS BEEN SENT!');
        },
        error: function(err) {
          ALERT('OH NO, SOMETHING WENT WRONG.', err);
        }
      });
    } else {
      alert('PLEASE ENSURE THAT ALL REQUIRED FIELDS ARE FILLED IN');
    }
  }

  getListing(id, callback) {
    $.ajax({
      type: 'GET',
      url: `/listings${id}`,
      dataType: 'json',
      success: function(data) {
        callback(data);
      },
      error: function(err) {
        console.log('Could not retrieve listing: ', err);
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
          <div className="row">
            <div className="col listing-info">
              <img src={this.state.listing.imageUrl} className="img-photo img-view-listing rounded" alt="Photo" />
              <h2 className="post-title">{ this.state.listing.title }</h2>
              <p>CODE: { this.state.listing.legoSetCode }</p>
              <p>CONDITION: { this.state.listing.condition }</p>
              <p>DESCRIPTION: { this.state.listing.description }</p>
              <p>CATEGORY: { this.state.listing.category }</p>
              <p>ZIP CODE: { this.state.listing.zipCode }</p>
            </div>

            <div className="col col-lg-4">
              <h3 className="contact-header">Contact the owner</h3>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="nameInput"
                    placeholder="Your Name"
                    name="name"
                    value={ this.state.name }
                    onChange={ this.handleChange }
                    onBlur={ this.handleBlur }
                  />
                  <p className=""></p>
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Your Email"
                    name="email"
                    value={ this.state.email }
                    onChange={ this.handleChange }
                    onBlur={ this.handleBlur }
                  />
                  <p className=""></p>
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    id="descriptionInput"
                    rows="3"
                    placeholder="Your message"
                    name="message"
                    value={ this.state.message }
                    onChange={ this.handleChange }
                  >
                  </textarea>
                  <p className=""></p>
                </div>

                <div className="form-group row">
                  <div className="col-sm-10">
                    <button className="btn btn-primary" onClick={ this.handleSubmitButtonClicked }>Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewListing;