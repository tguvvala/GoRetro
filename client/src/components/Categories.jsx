import React from 'react';
import ElectronicsCategory from './ElectronicsCategory.jsx';
import TableTopCategory from './TableTopCategory.jsx';
import GearCategory from './GearCategory.jsx';
import AllListingsButton from './AllListingsButton.jsx';
import SearchBar from './SearchBar.jsx';
import { Menu } from 'semantic-ui-react';

class Categories extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(e) {
    this.props.handleCategoryClick(e.currentTarget.dataset.cat);
  }

  render() {
    return (
      <Menu inverted>
        <Menu.Item>
          <ElectronicsCategory handleCategoryClick={this.props.handleCategoryClick} handleSubCategoryClick= { this.props.handleSubCategoryClick} />
        </Menu.Item>
        <Menu.Item>
          <TableTopCategory handleCategoryClick={this.props.handleCategoryClick} handleSubCategoryClick= { this.props.handleSubCategoryClick} />
        </Menu.Item>
        <Menu.Item>
          <GearCategory handleCategoryClick={this.props.handleCategoryClick} handleSubCategoryClick= { this.props.handleSubCategoryClick} />
        </Menu.Item>
        <Menu.Item>
          <AllListingsButton handleClick={this.props.resetListings} />
        </Menu.Item>
        <Menu.Item className="searchBox">
          <SearchBar searchByUserInput={this.props.searchByUserInput} />
        </Menu.Item>
      </Menu>
    );
  }

}

export default Categories;

// <div>
//   <section>
//     <div className="container" id="categoriesArea">
//       <div className="row">
//         <div className="col-sm-2 categories">
//           <ElectronicsCategory handleCategoryClick={this.props.handleCategoryClick} handleSubCategoryClick= { this.props.handleSubCategoryClick} />
//         </div>
//         <div className="col-sm-2 categories">
//           <TableTopCategory handleCategoryClick={this.props.handleCategoryClick} handleSubCategoryClick= { this.props.handleSubCategoryClick} />
//         </div>
//         <div className="col-sm-2 categories">
//           <GearCategory handleCategoryClick={this.props.handleCategoryClick} handleSubCategoryClick= { this.props.handleSubCategoryClick} />
//         </div>
//         <div className="col-sm-2 categories">
//           <AllListingsButton handleClick={this.props.resetListings} />
//         </div>
//
//       </div>
//     </div>
//   </section>
// </div>
