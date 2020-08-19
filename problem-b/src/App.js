import React, { Component } from 'react'; //import React Component
import './style.css' //import css
import _ from 'lodash' //import lodash

class App extends Component {
  constructor(props) {
    super(props);
    this.state={ pets: this.props.pets } 
  }

  adopt = (name) => {
    this.setState((state) => 
      _.find(this.state.pets, ['name', name]).adopted = true
    );
  }

  render() {
    return (
      <div>
        <header className="jumbotron jumbotron-fluid py-4">
          <div className="container">
            <h1>Adopt a Pet</h1>
          </div>
        </header>

        <main className="container">
          <div className="row">
            <div id="navs" className="col-3">
              <BreedNav breeds={ Object.keys(_.groupBy(this.state.pets, 'breed')) }/>
              <AboutNav />
            </div>
            <div id="petList" className="col-9">
              <PetList pets={ this.state.pets } adoptCallback={ this.adopt }/>
            </div>
          </div>
        </main>

        <footer className="container">
          <small>Images from <a href="http://www.seattlehumane.org/adoption/dogs">Seattle Humane Society</a></small>
        </footer>
      </div>
    );
  }
}

class AboutNav extends Component {
  render() {
    return (
      <nav id="aboutLinks">
        <h2>About</h2>
        <ul className="list-unstyled">
          <li><a href="#/">How to Adopt</a></li>
          <li><a href="#/">Volunteering</a></li>
          <li><a href="#/">Events</a></li>
          <li><a href="#/">Donate</a></li>
          <li><a href="#/">About Us</a></li>
        </ul>
      </nav>
    );
  }
}

class BreedNav extends Component {
  render() {
    let arrayBreeds = this.props.breeds.map((breed) => 
      <li key={breed}><a href={""}>{breed}</a></li>
    )
    return (
      <nav id="breedLinks">
        <h2>Pick a Breed</h2>
        <ul className="list-unstyled">
          { arrayBreeds }
        </ul>            
      </nav>
    );
  }
}

class PetCard extends Component {
  render() {
    let petName = this.props.pet.name;
    if (this.props.pet.adopted) {
      petName = petName+ " (Adopted)";
    }

    return (
      <div className="card" onClick={() => { this.props.adoptCallback(petName) }}>
        <img className="card-img-top" src={ this.props.pet.img } alt={ petName } />
        <div className="card-body">
          <h3 className="card-title">{ petName }</h3>
          <p className="card-text">{ this.props.pet.sex+ " "+ this.props.pet.breed }</p>
        </div>
      </div>
    );
  }
}

class PetList extends Component {
  render() {
    let arrayPets = this.props.pets.map((arrayPetCard) =>
      <PetCard key={ arrayPetCard.name } pet={ arrayPetCard } adoptCallback={ this.props.adoptCallback }/>
    )
    return (
      <div>
        <h2>Dogs for Adoption</h2>
        <div className="card-deck">
          { arrayPets }
        </div>
      </div>
    );
  }
}

export default App;
