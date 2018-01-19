import React from 'react';
import ElectronicsCategory from './ElectronicsCategory.jsx'


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
                <img src="img/city.png" className="category img-fluid" data-cat="city" onClick={ this.handleClick.bind(this) }/>
              </div>
              <div className="col-sm-2 categories">
                <img src="img/ninjago.png" className="category img-fluid" data-cat="ninjago" onClick={ this.handleClick.bind(this) }/>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

}

export default Categories;

