import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

// var xprops = {
//         "_id": "5a590b8868bfac731cec4d85",
//         "title": "Star Wars Boba Fett",
//         "description": "Brand new. My kid wanted Batman.",
//         "condition": "New",
//         "category": "Star Wars",
//         "username": "SuburbanDad",
//         "email": "bob@bob.com",
//         "zipCode": "52645",
//         "legoSetCode": "4D1F56",
//         "imageUrl": "http://aws.com/bucket/images/listing/1/3.jpg",
//         "__v": 0,
//         "createdAt": "2018-01-12T19:24:56.463Z"
//     };

class ViewListing extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmitButtonClicked = this.handleSubmitButtonClicked.bind(this);
    this.handleNameInputChange = this.handleNameInputChange.bind(this);
    this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
    this.handleMessageInputChange = this.handleMessageInputChange.bind(this);
    this.state = {
      name: '',
      email: '',
      message: ''
    };
  }

  handleNameInputChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleEmailInputChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleMessageInputChange(event) {
    this.setState({
      message: event.target.value
    });
  }

  handleSubmitButtonClicked(e) {
    var that = this;
    e.preventDefault();
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
              <img src="deathstar.jpg" className="img-photo img-view-listing rounded" alt="Photo" />
              <h2 className="post-title">{ xprops.title }</h2>
              <p>Code: <b>{ xprops.legoSetCode }</b></p>
              <p>Condition: <b>{ xprops.condition }</b></p>
              <p>{ xprops.description }</p>
              <p>Category: <b>{ xprops.category }</b></p>
              <p>ZIP Code: <b>{ xprops.zipCode }</b></p>
            </div>

            <div className="col col-lg-4">
              <h3 className="contact-header">Contact the owner</h3>
              <form>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" id="nameInput" placeholder="Your Name" value={ this.state.name } onChange={ this.handleNameInputChange.bind(this) }/>
                </div>

                <div className="form-group">
                  <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Email" value={ this.state.email } onChange={ this.handleEmailInputChange.bind(this) }/>
                </div>

                <div className="form-group">
                  <textarea className="form-control form-control-lg" id="descriptionInput" rows="3" placeholder="Your message" value={ this.state.message } onChange={ this.handleMessageInputChange.bind(this) }></textarea>
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