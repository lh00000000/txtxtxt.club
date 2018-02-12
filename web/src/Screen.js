import "./Screen.css"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import { emailByColor } from "./data.js"

const Cell = ({
  cellDatum: { color, char },
  focusedUnfocusedNormal,
  changeFocus
}) => (
  <span
    className="cell"
    style={{
      color,
      fontWeight: focusedUnfocusedNormal === "FOCUSED" ? "bold" : "normal",
      opacity: focusedUnfocusedNormal === "UNFOCUSED" ? 0.5 : 1,
      cursor: char === " " ? "default" : "pointer"
    }}
    onClick={ev => {
      ev.preventDefault()
      char === " " ? changeFocus(null) : changeFocus(emailByColor[color])
    }}
  >
    {char.replace(/ /g, "\u00a0")}
  </span>
)

const Row = ({ rowBuffer, getCellFocus, changeFocus }) => (
  <div>
    {rowBuffer
      .map((cellDatum, i) => ({
        key: i,
        changeFocus,
        cellDatum,
        focusedUnfocusedNormal: getCellFocus(cellDatum)
      }))
      .map(props => <Cell {...props} />)}
  </div>
)

const Screen = ({ buffer, getCellFocus, changeFocus }) => (
  <div className="Screen">
    {buffer
      .map((rowBuffer, i) => ({
        key: i,
        rowBuffer,
        getCellFocus,
        changeFocus
      }))
      .map(props => <Row {...props} />)}
  </div>
)

export default connect(
  ({ buffer, selected: { color: focusedColor } }) => ({
    buffer,
    getCellFocus: ({ color: cellColor }) =>
      _.isNull(focusedColor)
        ? "NORMAL"
        : focusedColor === cellColor ? "FOCUSED" : "UNFOCUSED"
  }),
  dispatch => ({
    changeFocus: toWho =>
      _.isNull(toWho)
        ? dispatch({ type: "CLEAR_FOCUS_EMPLOYEE" })
        : dispatch({ type: "FOCUS_EMPLOYEE", email: toWho })
  })
)(Screen)
