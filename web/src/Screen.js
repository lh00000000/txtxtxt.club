import "./Screen.css"
import _ from "lodash"
import React from "react"
import { connect } from "react-redux"
import { emailByColor } from "./data.js"
import { hiringOrder } from "company"


const Cell = ({
  cellDatum: { color, char },
  focusedColor,
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
      let currentHiringOrder = _.isNull(focusedColor)
          ? hiringOrder.length
          : hiringOrder.indexOf(emailByColor[focusedColor])

      let targetHiringOrder =
        char === " "
          ? hiringOrder.length
          : hiringOrder.indexOf(emailByColor[color])


      let keyframeOrders = [currentHiringOrder, targetHiringOrder].sort()

      let frames = _.slice(hiringOrder, keyframeOrders[0], keyframeOrders[1])
      let orderedFrames =
        currentHiringOrder > targetHiringOrder
          ? frames.reverse()
          : frames

      changeFocus(
        char === " "
          ? orderedFrames.concat([null])
          : orderedFrames
      )
      // char === " "
      //   ? changeFocus(
      //     _.slice(
      //         hiringOrder,
      //         hiringOrder.indexOf(currentEmail),
      //       )
      //     )
      //   : changeFocus(
      //     _.slice(
      //       hiringOrder,
      //       hiringOrder.indexOf(currentEmail),
      //       hiringOrder.indexOf(targetEmail)
      //     )
      //   )

    }}
  >
    {char.replace(/ /g, "\u00a0")}
  </span>
)

const Row = ({ rowBuffer, focusedColor, getCellFocus, changeFocus }) => (
  <div>
    {rowBuffer
      .map((cellDatum, i) => ({
        key: i,
        focusedColor,
        changeFocus,
        cellDatum,
        focusedUnfocusedNormal: getCellFocus(cellDatum)
      }))
      .map(props => <Cell {...props} />)}
  </div>
)

const Screen = ({ buffer, focusedColor, getCellFocus, changeFocus }) => (
  <div className="Screen">
    {buffer
      .map((rowBuffer, i) => ({
        key: i,
        rowBuffer,
        focusedColor,
        getCellFocus,
        changeFocus
      }))
      .map(props => <Row {...props} />)}
  </div>
)

export default connect(
  ({ buffer, selected: { color: focusedColor } }) => ({
    buffer,
    focusedColor,
    getCellFocus: ({ color: cellColor }) =>
      _.isNull(focusedColor)
        ? "NORMAL"
        : focusedColor === cellColor ? "FOCUSED" : "UNFOCUSED"
  }),
  dispatch => ({
    changeFocus: (frames) => {

      (function tick(remainingFrames) {

        if (remainingFrames.length > 0) {
          let toWho = remainingFrames[0]

          if (_.isNull(toWho)) {
            dispatch({ type: "CLEAR_FOCUS_EMPLOYEE" })
          } else {
            dispatch({ type: "FOCUS_EMPLOYEE", email: toWho })

            setTimeout(
              function() {tick(remainingFrames.slice(1))},
              1000/60
            )
          }

        }
      })(frames)
    }
  })
)(Screen)
