import React from 'react';

const Categories = (props) => (
  <div>
  <section>
    <div className="container">
      <div className="row">
       <div className="col-sm-2 categories">
         <img src="batman.png" className="category"/>
       </div>
       <div className="col-sm-2 categories">
         <img src="city.png" className="category"/>
       </div>
       <div className="col-sm-2 categories">
         <img src="ninjago.png" className="category"/>
       </div>
       <div className="col-sm-2 categories">
         <img src="friends.png" className="category"/>
       </div>
       <div className="col-sm-2 categories">
         <img src="starwars.png" className="category"/>
       </div>
       <div className="col-sm-2 categories">
         <img src="HP.png" className="category"/>
       </div>
     </div>
    </div>
  </section>
</div>
)

export default Categories;