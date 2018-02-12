import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"
import * as d3 from "d3"
import _ from "lodash"
import Screen from "./Screen"

import Bio from "./Bio.js"

import * as company from "company"

import ok from "./ok.json"

import { connect } from "react-redux"

const header = focusedColor => (
  <div style={{
    marginLeft: "auto",
    marginRight: "auto",
    width: "300px",
    textAlign: "center"
  }}>
  <span style={{
    color: _.defaultTo(focusedColor, "white"),
    fontSize: "3em"
  }}>txtxtxt</span>
  </div>
)

class App extends Component {

  componentDidMount() {
    // document.querySelector("html")
    //   .addEventListener("click", ev => {
    //     console.log(ev.target.tagName)

    //     if (ev.target.tagName != "A") {
    //       ev.preventDefault()
    //       this.props.clearFocus()
    //     }
    //   })
  }
  render() {
    return (
      <div className="App">
        {header(this.props.focusedColor)}
        <Screen />
        <Bio />
      </div>
    )
  }
}

export default connect(
  ({selected: {color: focusedColor}}) => ({focusedColor}),
  dispatch => ({
    clearFocus: () => dispatch({type: "CLEAR_FOCUS_EMPLOYEE"})
  }))(App)
