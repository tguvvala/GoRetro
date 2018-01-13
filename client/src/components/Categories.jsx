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
                <button><img src="batman.png" className="category" data-cat="batman" onClick={this.handleClick.bind(this)}/></button>
              </div>
              <div className="col-sm-2 categories">
                <img src="city.png" className="category" value="city" onClick={this.handleClick.bind(this)}/>
              </div>
              <div className="col-sm-2 categories">
                <img src="ninjago.png" className="category" value="ninjago" onClick={this.handleClick.bind(this)}/>
              </div>
              <div className="col-sm-2 categories">
                <img src="friends.png" className="category" value="friends" onClick={this.handleClick.bind(this)}/>
              </div>
              <div className="col-sm-2 categories">
                <img src="starwars.png" className="category" value="starwars" onClick={this.handleClick.bind(this)}/>
              </div>
              <div className="col-sm-2 categories">
                <img src="HP.png" className="category" value="harrypotter" onClick={this.handleClick.bind(this)}/>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

}

export default Categories;