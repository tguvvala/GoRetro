import React from 'react';
import RouteProps from 'react-route-props';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home.jsx';
import NewListing from './NewListing.jsx';
import ViewListing from './ViewListing.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home}/>
        <RouteProps path='/new-listing' component={NewListing} someProps={'Stringy String'} moreProps={5}/> 
        <Route path='/view-listing' component={ViewListing}/>
      </Switch>
    )
  }
}

export default App;


