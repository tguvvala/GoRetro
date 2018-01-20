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
<<<<<<< f1e5cbba9a04d356fabee9fdff83fee8d8d0b11a
import NavBar from './NavBar.jsx';
<<<<<<< 030a647f8194faa9f27a40681fb07a64a74c47ac
<<<<<<< e0d29c36b40f1bad63ceec37398b2b0f6b02eda9
import Checkout from './Checkout.jsx';
=======
>>>>>>> Add functioning NavBar
=======
=======
import passport from 'passport';
import flash from 'connect-flash';
>>>>>>> begun work on Local Strategy authentication
>>>>>>> fixed merge conflicts

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getListings = this.getListings.bind(this);
    this.filterListings = this.filterListings.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleSubCategoryClick = this.handleSubCategoryClick.bind(this);
    this.resetListings = this.resetListings.bind(this);
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

    this.setState({ category: category, subCategory: '' });
    this.filterListings('category', category );
  }
  resetListings() {
    this.setState({category: '', subCategory: ''});
    this.filterListings('');
  }

  handleSubCategoryClick(subCategory) {
    const categoryPairs = {
      'Console': 'Electronics',
      'PC': 'Electronics',
      'Handheld': 'Electronics',
      'Board Games': 'Toys/Games',
      'Toys': 'Toys/Games',
      'Collectibles': 'Toys/Games',
      'Mens': 'Gear',
      'Womens': 'Gear',
      'Kids': 'Gear'
    };
    subCategory = subCategory || '';
    this.setState({ category: categoryPairs[subCategory], subCategory: subCategory });
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
      <div>
<<<<<<< e0d29c36b40f1bad63ceec37398b2b0f6b02eda9
        <NavBar username={this.state.username} isSignedIn={this.state.isSignedIn} handleLogOut={this.handleLogOut.bind(this)} />
          <Switch>
            <RouteProps exact path='/' component={ Home } isSignedIn={this.state.isSignedIn} userId={this.state.userId} username={this.state.username} handleLogOut={this.handleLogOut.bind(this)} listings={ this.state.listings } category={ this.state.category } subCategory ={this.state.subCategory}handleCategoryClick={ this.handleCategoryClick } handleSubCategoryClick={ this.handleSubCategoryClick } setSelectedListing={ this.setSelectedListing }/>
            <Route exact path='/sign-up' component={ SignUp }/>
            <Route exact path='/sign-in' component={ SignIn }/>
            <RouteProps path='/new-listing' component={ NewListing } userId={ '1' } /> 
            <RouteProps path='/user-listings' component={ UserListings } listings={ this.state.listings }/> 
            <Route path='/view-listing' component={ ViewListing } />
            <Route path='/checkout' component={ Checkout } />
          </Switch>
=======
      <NavBar username={this.state.username} isSignedIn={this.state.isSignedIn} handleLogOut={this.handleLogOut.bind(this)} />
      <Switch>
        <RouteProps exact path='/' component={ Home } isSignedIn={this.state.isSignedIn} userId={this.state.userId} username={this.state.username} handleLogOut={this.handleLogOut.bind(this)} listings={ this.state.listings } category={ this.state.category } subCategory ={this.state.subCategory}handleCategoryClick={ this.handleCategoryClick } handleSubCategoryClick={ this.handleSubCategoryClick }
          resetListings = {this.resetListings} setSelectedListing={ this.setSelectedListing }/>
        <Route exact path='/sign-up' component={ SignUp }/>
        <Route exact path='/sign-in' component={ SignIn }/>
        <RouteProps path='/new-listing' component={ NewListing } userId={ '1' } /> 
        <RouteProps path='/user-listings' component={ UserListings } listings={ this.state.listings }/> 
        <Route path='/view-listing' component={ ViewListing } />
      </Switch>
>>>>>>> Add functioning NavBar
      </div>
    );
  }

// 
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
