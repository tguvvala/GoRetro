import React from 'react';
import RouteProps from 'react-route-props';
import $ from 'jquery';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import {StripeProvider} from 'react-stripe-elements';
import Home from './Home.jsx';
import NewListing from './NewListing.jsx';
import ViewListing from './ViewListing.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import NavBar from './NavBar.jsx';
import SellerProfile from './SellerProfile.jsx';
import Checkout from './Checkout.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getListings = this.getListings.bind(this);
    this.filterListings = this.filterListings.bind(this);
    this.getUserListings = this.getUserListings.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this)
    this.testFunction = this.testFunction.bind(this)
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleSubCategoryClick = this.handleSubCategoryClick.bind(this);
    this.resetListings = this.resetListings.bind(this);
    this.searchByUserInput = this.searchByUserInput.bind(this);
    this.deleteListing = this.deleteListing.bind(this);
    this.state = {
      listings: [],
      profileInfo: [],
      category: '',
      subCategory: '',
      isSignedIn: false,
      userId: '',
      username: '',
      isSearchResults: false
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

  searchByUserInput(result) {
    this.setState({
      listings: result,
      category: '',
      subCategory: '',
      isSearchResults: true
    });
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

    this.setState({ category: category, subCategory: '', isSearchResults: false });
    this.filterListings('category', category );
  }

  resetListings() {
    this.setState({category: '', subCategory: '', isSearchResults: false});
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

  getUserListings(username) {
    console.log('getting user listings');
    var that = this;
    $.ajax({
      url: `/seller?username=${username}`,
      success: (info) => {
        console.log(info);
        this.setState({
          listings: info[0],
          profileInfo: info[1][0]
        });
      },
      error: () => {
        console.log('error');
      }
    }).done(() => {
      console.log(this.state.profileInfo);
    });
  }

  deleteListing(listingID) {
    var that = this;
    $.ajax({
      type: 'DELETE',
      url: '/delete',
      data: {'id': listingID},
      success: (listings) => {
        console.log('success delete');
        that.setState({
          listings: listings
        })
      },
      error: (err) => {
        console.log('error');
      }
    });
  }

  testFunction() {
  }

  render() {
    let userPath = `/seller?username=${this.state.username}`
    return (
      <div className="mainPage">
        <div className="navigationbar">
          <NavBar username={ this.state.username }
          isSignedIn={ this.state.isSignedIn }
          handleLogOut={ this.handleLogOut }
          testFunction={ this.testFunction }
          getListings={ this.getListings }
          getUserListings={ this.getUserListings }
          userPath={userPath} />
        </div>
        <Switch>
          <RouteProps exact path='/' component={ Home }
            isSignedIn={ this.state.isSignedIn }
            userId={ this.state.userId }
            username={ this.state.username }
            handleLogOut={ this.handleLogOut.bind(this) }
            listings={ this.state.listings }
            searchByUserInput={this.searchByUserInput}
            category={ this.state.category }
            subCategory={ this.state.subCategory }
            handleCategoryClick={ this.handleCategoryClick } handleSubCategoryClick={ this.handleSubCategoryClick }
            resetListings={ this.resetListings }
            isSearchResults={ this.state.isSearchResults }
            setSelectedListing={ this.setSelectedListing }
            getUserListings={ this.getUserListings }
            deleteListing={ this.deleteListing }
          />
          <RouteProps exact path='/seller' component={ SellerProfile }
            listings={ this.state.listings }
            username={ this.state.username }
            profileInfo={ this.state.profileInfo }
          />
          <RouteProps path='/new-listing' component={ NewListing }
            userId={ this.state.userId }
            username={ this.state.username }
          /> 
          <Route exact path='/sign-up' component={ SignUp }/>
          <Route exact path='/sign-in' component={ SignIn }/>
          <Route path='/view-listing' component={ ViewListing } />
          <Route path='/checkout' component={ Checkout } />
        </Switch>
      </div>
    );
  }
}


export default App;
