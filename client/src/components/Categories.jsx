import React from 'react';


class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: ''
    };
  }


  handleClick(e) {
    this.setState({category: e.currentTarget.dataset.cat});
  }

  render() {
    return (
      <div>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-sm-2 categories">
                <img src="batman.png" className="category img-fluid" data-cat="batman" onClick={this.handleClick.bind(this)}/>
              </div>
              <div className="col-sm-2 categories">
                <img src="city.png" className="category img-fluid" value="city" onClick={this.handleClick.bind(this)}/>
              </div>
              <div className="col-sm-2 categories">
                <img src="ninjago.png" className="category img-fluid" value="ninjago" onClick={this.handleClick.bind(this)}/>
              </div>
              <div className="col-sm-2 categories">
                <img src="friends.png" className="category img-fluid" value="friends" onClick={this.handleClick.bind(this)}/>
              </div>
              <div className="col-sm-2 categories">
                <img src="starwars.png" className="category img-fluid" value="starwars" onClick={this.handleClick.bind(this)}/>
              </div>
              <div className="col-sm-2 categories">
                <img src="HP.png" className="category img-fluid" value="harrypotter" onClick={this.handleClick.bind(this)}/>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

}

export default Categories;