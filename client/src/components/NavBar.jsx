import React from 'react';
import { Container, Divider, Dropdown, Header, Image, List, Menu, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NavBar = (props) => (
  <div>
    <Menu className="theNavBar" fixed='top'>
      <Container>
        <Menu.Item as={Link} to='/' position='right' onClick={props.getListings}>Home</Menu.Item>
        { !props.isSignedIn &&
        <Menu.Item as={Link} to="/sign-in">Login</Menu.Item> }
        { !props.isSignedIn &&
        <Menu.Item as={Link} to='/sign-in'>Post</Menu.Item> }
        { props.isSignedIn && <Menu.Item as={Link} to='new-listing'>Post</Menu.Item>}
        <Menu.Item as={Link} to='/checkout'>
          <Button>
            <Button.Content>
              <Icon name='shop' />
            </Button.Content>
          </Button>
        </Menu.Item>
          <Dropdown item simple position='right' text={props.username || 'My Account'}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/seller'>My Profile</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        { props.isSignedIn &&
        <Menu.Item onClick={props.handleLogOut}>Logout</Menu.Item> }
        <Menu.Item onClick={props.testFunction}>test</Menu.Item>
      </Container>
    </Menu>
  </div>
);

export default NavBar;

// changes

// 1
// took out image in Home Button
// <Image
//   size='tiny'
//   src='img/banner.png'
//   style={{ marginRight: '1.5em' }}
// />

// 2
// <Menu.Item onClick={props.testFunction}>test</Menu.Item>
