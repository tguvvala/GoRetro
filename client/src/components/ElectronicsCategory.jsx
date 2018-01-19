import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class ElectronicsCategory extends React.Component {
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
      <Dropdown text='Electronics' value='Electronics'>
      <Dropdown.Menu >
        <Dropdown.Item  onClick={this.handleCategorySelect.bind(this)} text='All' value='Electronics'/>
        <Dropdown.Item  onClick={this.handleSubCategorySelect.bind(this)} text='Console' value='Console'/>
        <Dropdown.Item onClick={this.handleSubCategorySelect.bind(this)} text='PC' value='PC'/>
        <Dropdown.Item onClick={this.handleSubCategorySelect.bind(this)} text='Handheld' value='Handheld'/>
      </Dropdown.Menu>
    </Dropdown>
  );
  }
}





export default ElectronicsCategory;