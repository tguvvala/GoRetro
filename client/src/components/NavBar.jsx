import React from 'react';
<<<<<<< e0d29c36b40f1bad63ceec37398b2b0f6b02eda9
import { Container, Divider, Dropdown, Header, Image, List, Menu, Button, Icon } from 'semantic-ui-react';
=======
import { Container, Divider, Dropdown, Header, Image, List, Menu } from 'semantic-ui-react';
>>>>>>> Add functioning NavBar
import { Link } from 'react-router-dom';

const NavBar = (props) => (
  <div>
    <Menu className='fixedNav' fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image
<<<<<<< e0d29c36b40f1bad63ceec37398b2b0f6b02eda9
            size='tiny'
=======
            size='mini'
>>>>>>> Add functioning NavBar
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
<<<<<<< e0d29c36b40f1bad63ceec37398b2b0f6b02eda9
      <Menu.Item as={Link} to='/checkout'>
        <Button>
          <Button.Content>
            <Icon name='shop' />
          </Button.Content>
        </Button> 
      </Menu.Item>
=======
>>>>>>> Add functioning NavBar


        <Dropdown item simple position='right' text={props.username || 'My Account'}>
          <Dropdown.Menu>
            <Dropdown.Item>My Profile</Dropdown.Item>
<<<<<<< e0d29c36b40f1bad63ceec37398b2b0f6b02eda9
=======
            <Dropdown.Item>List Item</Dropdown.Item>
>>>>>>> Add functioning NavBar
          </Dropdown.Menu>
        </Dropdown>

        {props.isSignedIn &&
        <Menu.Item onClick={props.handleLogOut}>Logout</Menu.Item>
      }
      </Container>
    </Menu>
  </div>
);

<<<<<<< e0d29c36b40f1bad63ceec37398b2b0f6b02eda9
export default NavBar;

// I think it was the wrong one
=======
export default NavBar;
>>>>>>> Add functioning NavBar
