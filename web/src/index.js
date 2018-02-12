import "./index.css"
import _ from "lodash"
import App from "./App"
import React from "react"
import ReactDOM from "react-dom"
import { createStore } from "redux"
import { employees, emailByHiringOrder } from "./data.js"
import { Provider } from "react-redux"


const LATEST_BUFFER =
  employees[emailByHiringOrder[_.keys(employees).length - 1]].buffer

const DEFAULT_STATE = {
  buffer: LATEST_BUFFER,
  selected: {
    color: null,
    email: null
  },
  isHelpShown: false
}

const store = createStore((state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "FOCUS_EMPLOYEE":
      return {
        ...state,
        buffer: employees[action.email].buffer,
        selected: {
          email: action.email,
          color: employees[action.email].color
        }
      }
    case "CLEAR_FOCUS_EMPLOYEE":
      return {
        ...state,
        buffer: LATEST_BUFFER,
        selected: {
          email: null,
          color: null
        }
      }
    case "SHOW_HELP":
      return {
        ...state,
        isHelpShown: true
      }
    case "HIDE_HELP":
      return {
        ...state,
        isHelpShown: false
      }
    default:
      return state
  }
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
