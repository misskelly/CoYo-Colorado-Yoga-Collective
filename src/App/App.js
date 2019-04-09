import React, { Component } from 'react';
import '../Styles/Main.scss';
import Header from '../Header/Header.js';
import Carousel from '../Carousel/Carousel.js';
import Studios from '../Studios/Studios.js';
import Search from '../Search/Search.js';
import Controls from '../Controls/Controls.js';

import '../Styles/Main.scss';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      studios: [],
      yogaTypes: [],
      rendered: []
    };
  }

  componentWillMount() {
    localStorage.getItem('studiosRendered') && this.setState({
      rendered: JSON.parse(localStorage.getItem('studiosRendered'))
    })
    localStorage.getItem('types') && this.setState({
      yogaTypes: JSON.parse(localStorage.getItem('types'))
    })
    localStorage.getItem('studios') && this.setState({
      studios: JSON.parse(localStorage.getItem('studios'))
    })
  }

  componentDidMount(){
    if(!localStorage.getItem('studiosRendered')){
      this.fetchData();
    } else {
      console.log('Using Data From Local Storage')
    }
  }

  fetchData(){
    fetch('https://fe-apps.herokuapp.com/api/v1/whateverly/1901/SallyHaefling/studios')
      .then(response => response.json())
      .then(yogaStudios => this.setState( {studios: yogaStudios.studios} ))
      .catch(err => console.log(err))
    fetch('https://fe-apps.herokuapp.com/api/v1/whateverly/1901/SallyHaefling/yoga')
      .then(response => response.json())
      .then(yogaTypes => this.setState( {yogaTypes: yogaTypes.yoga.types}))
      .catch(err => console.log(err))
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('studiosRendered', JSON.stringify(nextState.rendered));
    localStorage.setItem('types', JSON.stringify(nextState.yogaTypes));
    localStorage.setItem('studios', JSON.stringify(nextState.studios));
  }

  storeRendered = (cardsDisplayed) => {
    this.setState({rendered: cardsDisplayed})
  }

  render() {
    console.log(this.state)
    return (
      <section className="App">
        <Header />
        <Carousel 
        studios={this.state.studios}
        yogaTypes={this.state.yogaTypes}
        storeRendered={this.storeRendered}
        />
        <Search 
        studios={this.state.studios}
        storeRendered={this.storeRendered}
        />
        <Controls 
        studios={this.state.studios}
        storeRendered={this.storeRendered}
        />
        <Studios 
        studios={this.state.studios}
        rendered={this.state.rendered}
        />
      </section>
    );
    
  }
}
