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
    this.state = {
      listings: []
    };
  }

  componentDidMount() {
    this.getListings();
  }

  getListings(category) {
    $.ajax({
      url: '/listings',
      success: (listings) => {
        this.setState({
          listings: listings
        })
        console.log('---------------Listings data', listings)
      },
      error: (err) => {
        console.log('Get listings error', err);
      }
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/sign-up' component={SignUp}/>
        <Route exact path='/sign-in' component={SignIn}/>
        <RouteProps path='/new-listing' component={NewListing} someProps={'Stringy String'} moreProps={5}/> 
        <RouteProps path='/user-listings' component={UserListings} someProps={'Stringy String'} moreProps={5}/> 
        <Route path='/view-listing' component={ViewListing}/>
      </Switch>
    )
  }
}

export default App;


