import React from 'react';
import { Container, Divider, Dropdown, Header, Image, List, Menu, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NavBar = (props) => (
  <div>
    <Menu className='fixedNav' fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image
            size='tiny'
            src='img/banner.png'
            style={{ marginRight: '1.5em' }}
          />
          Lego Trader
        </Menu.Item>

        <Menu.Item as={Link} to ='/'>Home</Menu.Item>
        {!props.isSignedIn &&
        <Menu.Item as={Link} to="/sign-in">Login</Menu.Item>
      }

      <Menu.Item as={Link} to='/new-listing'>Post</Menu.Item>
      <Menu.Item as={Link} to='/checkout'>
        <Button>
          <Button.Content>
            <Icon name='shop' />
          </Button.Content>
        </Button> 
      </Menu.Item>


        <Dropdown item simple position='right' text={props.username || 'My Account'}>
          <Dropdown.Menu>
            <Dropdown.Item>My Profile</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {props.isSignedIn &&
        <Menu.Item onClick={props.handleLogOut}>Logout</Menu.Item>
      }
      </Container>
    </Menu>
  </div>
);

export default NavBar;
