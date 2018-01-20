import React from 'react';
import RouteProps from 'react-route-props';
import $ from 'jquery';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {StripeProvider} from 'react-stripe-elements';
import Home from './Home.jsx';
import NewListing from './NewListing.jsx';
import ViewListing from './ViewListing.jsx';
import UserListings from './UserListings.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import passport from 'passport';
import flash from 'connect-flash';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.getListings = this.getListings.bind(this);
    this.filterListings = this.filterListings.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleSubCategoryClick = this.handleSubCategoryClick.bind(this);
    this.state = {
      listings: [],
      category: '',
      subCategory: '',
      isSignedIn: false,
      userId: '',
      username: ''
    };
  }

  // poll server every second for new listings
  componentDidMount() {
    this.signIn();
    this.getListings();
    setInterval(() => {
      this.getListings;
    }, 1000);
  }

  signIn() {
    var that = this;
    $.ajax({
      url: '/checkSession',
      success: function(response) {
        that.setState({ isSignedIn: response.isSignedIn, userId: response.userId, username: response.username });
      },
      error: function() {
        console.log('check access token error');
      }
    });
  }

  handleLogOut() {
    this.logOut();
  }

  logOut() {
    var that = this;
    $.ajax({
      url: '/logOut',
      success: function(isSignedIn) {
        that.setState({ isSignedIn: isSignedIn, userId: '', username: '' });
      },
      error: function() {
        console.log('logout error');
      }
    });
  }

  handleCategoryClick(category) {
    category = category || '';

    this.setState({ category: category });
    this.filterListings('category', category );
  }

  handleSubCategoryClick(subCategory) {
    subCategory = subCategory || '';

    this.setState({ subCategory: subCategory });
    this.filterListings('subCategory', subCategory );
  }

  filterListings(catType, name) {
    var that = this;
    $.ajax({
      url: `/listings?${catType}=${name}`,
      success: (listings) => {
        that.setState({
          listings: listings
        });
      },
      error: (err) => {
        console.log('Get categories error', err);
      }
    });
  }

  getListings() {
    $.ajax({
      url: '/listings',
      success: (listings) => {
        this.setState({
          listings: listings
        });
      },
      error: (err) => {
        console.log('Get listings error', err);
      }
    });
  }
render() {
    // if (this.state.isSignedIn) {

    // }
    return (
      <StripeProvider apiKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh">
        <Switch>
          <RouteProps exact path='/' component={ Home } listings={ this.state.listings } category={ this.state.category } handleCategoryClick={ this.handleCategoryClick } handleSubCategoryClick={ this.handleSubCategoryClick } setSelectedListing={ this.setSelectedListing }/>
          <Route exact path='/sign-up' component={ SignUp }/>
          <Route exact path='/sign-in' component={ SignIn }/>
          <RouteProps path='/new-listing' component={ NewListing } userId={ '1' } /> 
          <RouteProps path='/user-listings' component={ UserListings } listings={ this.state.listings }/> 
          <Route path='/view-listing' component={ ViewListing } />
        </Switch>
      </StripeProvider>
    );
  }

// render () {
//     if (this.state.isSignedIn) {
//       return (
//         <div>
//           <p>Welcome</p>
//           <a onClick={ this.handleLogOut.bind(this) }> Log out</a>
//         </div>
//       )
//     } else {
//       return (
//         <div>
//         <p>Sign in</p>
//           <a href="/login/facebook">Log In with Facebook</a>
//         </div>
//       )
//     }
//   }

}


export default App;
