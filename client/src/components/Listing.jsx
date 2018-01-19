import React from 'react';
import RouteProps from 'react-route-props';
import { Link } from 'react-router-dom';
import { Item } from 'semantic-ui-react';

class Listing extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let path = `/view-listing?_id=${this.props.listing['_id']}`;

    return (
      <Item>
        <Item.Image size ='medium' src={ this.props.listing.imageUrl } />
        <Item.Content>
          <Item.Header as='a'>{ this.props.listing.title }</Item.Header>
          <Item.Meta>{ this.props.listing.category }</Item.Meta>
          <Item.Extra>zayseoul</Item.Extra>
          <Item.Extra>$150</Item.Extra>
          <Item.Extra>{ this.props.listing.description}</Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default Listing;

// import React from 'react';
// import RouteProps from 'react-route-props';
// import { Link } from 'react-router-dom';
//
// class Listing extends React.Component {
//
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     let path = `/view-listing?_id=${this.props.listing['_id']}`;
//
//     return (
//       <div className="col-sm-12 listing-area">
//         <Link to={ path }>
//           <h2 className="listing-title">{ this.props.listing.title }</h2>
//           <img className="productimg mx-auto d-block" src={ this.props.listing.imageUrl }/>
//         </Link>
//       </div>
//     );
//   }
// }
//
//
// export default Listing;
