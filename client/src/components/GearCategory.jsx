import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class GearCategory extends React.Component {
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
      <Dropdown text='Gear' value='Gear'>
      <Dropdown.Menu >
        <Dropdown.Item  onClick={this.handleCategorySelect.bind(this)} text='All' value='Gear'/>
        <Dropdown.Item  onClick={this.handleSubCategorySelect.bind(this)} text='Mens' value='Mens'/>
        <Dropdown.Item onClick={this.handleSubCategorySelect.bind(this)} text='Womens' value='Womens'/>
        <Dropdown.Item onClick={this.handleSubCategorySelect.bind(this)} text='Kids' value='Kids'/>
      </Dropdown.Menu>
    </Dropdown>
  );
  }
}

export default GearCategory;