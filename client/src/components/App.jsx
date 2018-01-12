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
    window.FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        console.log('Logged in.');
      } else {
        window.FB.login();
      }
    });

    window.fbAsyncInit = function() {
      window.FB.init({
        appId: FacebookConfig.clientID,
        cookie: true,
        xfbml: true,
        version: 'v2.1'
      });

      window.FB.Event.subscribe('auth.statusChange', (response) => {
        console.log('RESPONSE: ', response);
        if (response.authResponse) {
          this.updateLoggedInState(Response);
        } else {
          this.updateLoggedOutState();
        }
      });
    }.bind(this);

    ((d, s, id) => {
      let js;
      let fjs = d.getElementsByTagName(s)[0];
      if (d.getelementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect/facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }, (document, 'script', 'facebook-jssdk'));
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


