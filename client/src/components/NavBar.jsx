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
        <Menu className="theNavBar" fixed='top' inverted>
          <Container>
            <Menu.Item as={Link} to='/' position='right' onClick={this.props.getListings}>Home</Menu.Item>
            { !this.props.isSignedIn &&
            <Menu.Item as={Link} to="/sign-in">Login</Menu.Item> }
            { !this.props.isSignedIn &&
            <Menu.Item as={Link} to='/sign-in'>Post</Menu.Item> }
            { this.props.isSignedIn && <Menu.Item as={Link} to='new-listing'>Post</Menu.Item>}
            <Menu.Item as={Link} to='/checkout'>
              <Button className="cartButton">
                <Button.Content>
                  <Icon name='shop'/>
                </Button.Content>
              </Button>
            </Menu.Item>
              <Dropdown item simple position='right' text={this.props.username || 'My Account'}>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to={this.props.userPath} onClick={this.findMyListings}>My Profile</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            { this.props.isSignedIn &&
            <Menu.Item onClick={this.props.handleLogOut}>Logout</Menu.Item> }
            <Menu.Item onClick={this.props.testFunction}>test</Menu.Item>
          </Container>
        </Menu>
      </div>
    )
  }
}

// const NavBar = (props) => (
//   <div>
//     <Menu className="theNavBar" fixed='top' inverted>
//       <Container>
//         <Menu.Item as={Link} to='/' position='right' onClick={props.getListings}>Home</Menu.Item>
//         { !props.isSignedIn &&
//         <Menu.Item as={Link} to="/sign-in">Login</Menu.Item> }
//         { !props.isSignedIn &&
//         <Menu.Item as={Link} to='/sign-in'>Post</Menu.Item> }
//         { props.isSignedIn && <Menu.Item as={Link} to='new-listing'>Post</Menu.Item>}
//         <Menu.Item as={Link} to='/checkout'>
//           <Button className="cartButton">
//             <Button.Content>
//               <Icon name='shop'/>
//             </Button.Content>
//           </Button>
//         </Menu.Item>
//           <Dropdown item simple position='right' text={props.username || 'My Account'}>
//             <Dropdown.Menu>
//               <Dropdown.Item as={Link} to={props.userPath} onClick={props.getUserListings}>My Profile</Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         { props.isSignedIn &&
//         <Menu.Item onClick={props.handleLogOut}>Logout</Menu.Item> }
//         <Menu.Item onClick={props.testFunction}>test</Menu.Item>
//       </Container>
//     </Menu>
//   </div>
// );

export default NavBar;
