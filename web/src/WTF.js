import React from "react"
import { connect } from "react-redux"
import _ from "lodash"
import "./WTF.css"

const NoButton = ({ color, hideHelp }) => (
  <span style={{ color, cursor: "pointer" }} onClick={hideHelp}>
    <u>No.</u>
  </span>
)

const HelpModal = ({ hideHelp }) => (
  <div class="helpModal">
    <p>
      <b>What is this?</b>
    </p>
    <p>
      Every new member of txtxtxt is asked to contribute an addition (or
      subtraction) to our collective ascii art piece when hired. The additions
      are color coded per employee.{" "}
    </p>
    <p>
      <span role="img" aria-label="pointing-emoji">👆</span>Click any character in the ascii piece to go back in time to when that
      person did their edit.
    </p>
    <p>
      <span role="img" aria-label="pointing-emoji">👆</span>Click any blank space in the ascii piece to go back to the latest
      version of the ascii piece.
    </p>
    <div style={{textAlign: "right"}}>
      <NoButton color="green" hideHelp={hideHelp} />
      <span> </span>
      <NoButton color="red" hideHelp={hideHelp} />
    </div>
  </div>
)

const WTF = ({ isHelpShown, selectedColor, showHelp, hideHelp }) => (
  <div class="wtf">
    <div class="helpIconContainer" onClick={showHelp}>
      <span style={{ color: _.defaultTo(selectedColor, "white") }}>?</span>
    </div>
    {isHelpShown ? <HelpModal hideHelp={hideHelp} /> : ""}
  </div>
)

export default connect(
  ({ isHelpShown, selected: { color: selectedColor } }) => ({
    isHelpShown,
    selectedColor
  }),
  dispatch => ({
    showHelp: () => dispatch({ type: "SHOW_HELP" }),
    hideHelp: () => dispatch({ type: "HIDE_HELP" })
  })
)(WTF)
