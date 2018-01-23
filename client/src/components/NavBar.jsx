import React from 'react';
import { Container, Divider, Dropdown, Header, Image, List, Menu, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.findMyListings = this.findMyListings.bind(this);
  }

  findMyListings() {
    var myUsername = this.props.username;
    console.log(myUsername);
    this.props.getUserListings(myUsername);
  }

  render() {
    return (
      <div>
        <Menu className="theNavBar" fixed='top'>
          <Container>
            <Menu.Item as={Link} to='/' position='right' onClick={this.props.getListings}>Home</Menu.Item>
            { !this.props.isSignedIn &&
            <Menu.Item as={Link} to="/sign-in">Login</Menu.Item> }
            { !this.props.isSignedIn &&
            <Menu.Item as={Link} to='/sign-in'>Post</Menu.Item> }
            { this.props.isSignedIn && <Menu.Item as={Link} to='new-listing'>Post</Menu.Item>}
            <Dropdown item simple position='right' text={this.props.username || 'My Account'}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={this.props.userPath} onClick={this.findMyListings}>My Profile</Dropdown.Item>
                { this.props.isSignedIn &&
                <Dropdown.Item onClick={this.props.handleLogOut}>Logout</Dropdown.Item> }
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item as={Link} to='/checkout'>
              <Button className="cartButton">
                <Button.Content>
                  <Icon name='shop'/>
                </Button.Content>
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    )
  }
}

export default NavBar;
