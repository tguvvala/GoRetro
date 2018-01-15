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
        value: 'NAME',
        errorMessage: 'REQUIRED',
        isValid: () => {
          return this.validate.valueEntered('name');
        }
      },
      email: {
        value: 'EMAIL',
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
          console.log('Message sent');
        },
        error: function(err) {
          console.log('Message sent errors', err);
        }
      });
    } else {
      alert('PLEASE ENSURE THAT ALL REQUIRED FIELDS ARE FILLED IN');
    }
  }

  getListing(id, callback) {
    $.ajax({
      type: 'GET',
      url: `http://localhost:8080/listings${id}`,
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
            <div className="col">
              <img src={this.state.listing.imageUrl} className="img-photo img-view-listing rounded" alt="Photo" />
              <h2 className="post-title">{ this.state.listing.title }</h2>
              <p>CODE: <b>{ this.state.listing.legoSetCode }</b></p>
              <p>CONDITION: <b>{ this.state.listing.condition }</b></p>
              <p>DESCRIPTION: <b>{ this.state.listing.description }</b></p>
              <p>CATEGORY: <b>{ this.state.listing.category }</b></p>
              <p>ZIP CODE: <b>{ this.state.listing.zipCode }</b></p>
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
                  <small className="form-text text-muted">

                  </small>
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
                  <small className="form-text text-muted">

                  </small>
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