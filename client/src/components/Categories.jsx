import React from 'react';
import ElectronicsCategory from './ElectronicsCategory.jsx';
import TableTopCategory from './TableTopCategory.jsx';
import GearCategory from './GearCategory.jsx';
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
      <Menu className="categoryMenu">
        <Menu.Item className="categoryMenuItem">
          <ElectronicsCategory handleCategoryClick={this.props.handleCategoryClick} handleSubCategoryClick= { this.props.handleSubCategoryClick} />
        </Menu.Item>
        <Menu.Item className="categoryMenuItem">
          <TableTopCategory handleCategoryClick={this.props.handleCategoryClick} handleSubCategoryClick= { this.props.handleSubCategoryClick} />
        </Menu.Item>
        <Menu.Item className="categoryMenuItem">
          <GearCategory handleCategoryClick={this.props.handleCategoryClick} handleSubCategoryClick= { this.props.handleSubCategoryClick} />
        </Menu.Item>
        <Menu.Item className="categoryMenuItem" onClick={this.props.resetListings}>
          All Listings
        </Menu.Item>
        <Menu.Item className="searchBox">
          <SearchBar searchByUserInput={this.props.searchByUserInput} />
        </Menu.Item>
      </Menu>
    );
  }
}

export default Categories;