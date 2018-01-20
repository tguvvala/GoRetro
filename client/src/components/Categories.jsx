import React from 'react';
import ElectronicsCategory from './ElectronicsCategory.jsx';
import TableTopCategory from './TableTopCategory.jsx';
import GearCategory from './GearCategory.jsx';
import AllListingsButton from './AllListingsButton.jsx';

class Categories extends React.Component {
  constructor(props) {
    super(props);
  }


  handleClick(e) {
    this.props.handleCategoryClick(e.currentTarget.dataset.cat);
  }

  render() {
    return (
      <div>
        <section>
          <div className="container" id="categoriesArea">
            <div className="row">
              <div className="col-sm-2 categories">
                <ElectronicsCategory handleCategoryClick={this.props.handleCategoryClick} handleSubCategoryClick= { this.props.handleSubCategoryClick} />
              </div>
              <div className="col-sm-2 categories">
                <TableTopCategory handleCategoryClick={this.props.handleCategoryClick} handleSubCategoryClick= { this.props.handleSubCategoryClick} />
              </div>
              <div className="col-sm-2 categories">
                <GearCategory handleCategoryClick={this.props.handleCategoryClick} handleSubCategoryClick= { this.props.handleSubCategoryClick} />
              </div>
              <div className="col-sm-2 categories">
                <AllListingsButton handleClick={this.props.resetListings} />
              </div>

            </div>
          </div>
        </section>
      </div>
    );
  }

}

export default Categories;
