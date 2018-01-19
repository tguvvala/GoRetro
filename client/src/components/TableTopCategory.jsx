import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class TableTopCategory extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCategorySelect(e, data) {
    console.log(data);
    this.props.handleCategoryClick(data.value);
  }

   handleSubCategorySelect(e, data) {
    this.props.handleSubCategoryClick(data.value)
  }

  render() {
    return (
      <Dropdown text='Toys/Games' value='Toys/Games'>
      <Dropdown.Menu >
        <Dropdown.Item  onClick={this.handleCategorySelect.bind(this)} text='All' value='Toys/Games'/>
        <Dropdown.Item  onClick={this.handleSubCategorySelect.bind(this)} text='Board Games' value='Board Games'/>
        <Dropdown.Item onClick={this.handleSubCategorySelect.bind(this)} text='Toys' value='Toys'/>
        <Dropdown.Item onClick={this.handleSubCategorySelect.bind(this)} text='Collectibles' value='Collectibles'/>
      </Dropdown.Menu>
    </Dropdown>
  );
  }
}

export default TableTopCategory;