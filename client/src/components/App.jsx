import React from 'react';
import RouteProps from 'react-route-props';
import $ from 'jquery';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home.jsx';
import NewListing from './NewListing.jsx';
import ViewListing from './ViewListing.jsx';
import UserListings from './UserListings.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getListings = this.getListings.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.state = {
      listings: [],
      category: '',
      selectedListing: ''
    };
  }

  // poll server every second for new listings
  componentDidMount() {
    this.getListings();
    setInterval(() => {
      this.getListings
    }, 1000)
  }

  handleCategoryClick(category) {
    category = category || '';

    console.log('My category', category);
    this.setState({ category: category });
    this.filterListings();
  }

  filterListings() {
    $.ajax({
      url: '/listings',
      data: {category: this.state.category},
      success: (listings) => {
        this.setState({
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
        })
      },
      error: (err) => {
        console.log('Get listings error', err);
      }
    });
  }

  render() {
    return (
      <Switch>
        <RouteProps exact path='/' component={ Home } listings={ this.state.listings } category={ this.state.category } handleCategoryClick={ this.handleCategoryClick } />
        <Route exact path='/sign-up' component={ SignUp }/>
        <Route exact path='/sign-in' component={ SignIn }/>
        <RouteProps path='/new-listing' component={ NewListing } userId={ '1' } /> 
        <RouteProps path='/user-listings' component={ UserListings } listings={ this.state.listings }/> 
        <Route path='/view-listing' component={ ViewListing } listing={ this.selectedListing }/>
      </Switch>
    )
  }
}

export default App;


