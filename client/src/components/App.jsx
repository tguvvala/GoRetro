import React from 'react';
import RouteProps from 'react-route-props';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home.jsx';
import NewListing from './NewListing.jsx';
import ViewListing from './ViewListing.jsx';
import FacebookConfig from '../../../facebookConfig';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : FacebookConfig.clientID,
        cookie     : true,  // enable cookies to allow the server to access
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.1' // use version 2.1
      });
      FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js;
      var fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  render() {
    return (
      <div>
        <a href="http://localhost:8080/auth/facebook">Login with Facebook</a>
        <Switch>
          <Route exact path='/' component={Home}/>
          <RouteProps path='/new-listing' component={NewListing} someProps={'Stringy String'} moreProps={5}/> 
          <Route path='/view-listing' component={ViewListing}/>
        </Switch>
      </div>
    );
  }
}

export default App;


