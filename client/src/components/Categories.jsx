import React from 'react';


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
                <img src="img/batman.png" className="category img-fluid" data-cat="batman" onClick={ this.handleClick.bind(this) }/>
              </div>
              <div className="col-sm-2 categories">
                <img src="img/city.png" className="category img-fluid" data-cat="city" onClick={ this.handleClick.bind(this) }/>
              </div>
              <div className="col-sm-2 categories">
                <img src="img/ninjago.png" className="category img-fluid" data-cat="ninjago" onClick={ this.handleClick.bind(this) }/>
              </div>
              <div className="col-sm-2 categories">
                <img src="img/friends.png" className="category img-fluid" data-cat="friends" onClick={ this.handleClick.bind(this) }/>
              </div>
              <div className="col-sm-2 categories">
                <img src="img/starwars.png" className="category img-fluid" data-cat="starwars" onClick={ this.handleClick.bind(this) }/>
              </div>
              <div className="col-sm-2 categories">
                <img src="img/HP.png" className="category img-fluid" data-cat="harrypotter" onClick={ this.handleClick.bind(this) }/>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

}

export default Categories;