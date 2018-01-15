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
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      name: '',
      email: '',
      message: '',
      listing: ''
    };
  }

  componentDidMount() {
    this.getListing(this.props.location.search, (data) => {
      this.setState({
        listing: data.slice()[0]
      });
    });
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
                  <input type="text" className="form-control form-control-lg" id="nameInput" placeholder="Your Name" name="name" value={ this.state.name } onChange={ this.handleChange }/>
                </div>

                <div className="form-group">
                  <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your Email" name="email" value={ this.state.email } onChange={ this.handleChange }/>
                </div>

                <div className="form-group">
                  <textarea className="form-control form-control-lg" id="descriptionInput" rows="3" placeholder="Your message" name="message" value={ this.state.message } onChange={ this.handleChange }></textarea>
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