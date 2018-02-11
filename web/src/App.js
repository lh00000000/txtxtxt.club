import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from "d3";
import _ from "lodash";
import Screen from "./Screen";



class App extends Component {

  constructor(props) {
    super(props)
    this.state = { blinky: false }
    setInterval(
      () => {this.setState({blinky: !this.state.blinky})},
      1000
    )
  }
  render() {


    return (
      <div className="App">

        <Screen buffer={
left(yay, 3)
          } />
      </div>
    )
  }
}

export default App;
