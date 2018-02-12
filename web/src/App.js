import "./App.css"
import _ from "lodash"
import Bio from "./Bio.js"
import WTF from "./WTF.js"
import React from "react"
import Screen from "./Screen"
import { connect } from "react-redux"

const header = focusedColor => (
  <div
    style={{
      marginLeft: "auto",
      marginRight: "auto",
      width: "300px",
      textAlign: "center"
    }}
  >
    <span
      style={{
        color: _.defaultTo(focusedColor, "white"),
        fontSize: "3em"
      }}
    >
      txtxtxt
    </span>
  </div>
)

const App = ({ focusedColor }) => (
  <div className="App">
    {header(focusedColor)}
    <Screen />
    <Bio />
    <WTF />
  </div>
)

export default connect(
  ({ selected: { color: focusedColor } }) => ({ focusedColor }),
  dispatch => ({
    clearFocus: () => dispatch({ type: "CLEAR_FOCUS_EMPLOYEE" })
  })
)(App)
