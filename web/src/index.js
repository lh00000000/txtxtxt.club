import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import Bio from "./Bio"
import registerServiceWorker from "./registerServiceWorker"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { blankBuffer, deserialize } from "ascii2d"
import * as company from "company"
import _ from "lodash"
import { employees, emailByColor, emailByHiringOrder } from "./data.js"

const DEFAULT_STATE = {
  buffer: employees[emailByHiringOrder[7]].buffer,
  selected: {
    color: null,
    email: null
  }
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
        buffer: employees[emailByHiringOrder[7]].buffer,
        selected: {
          email: null,
          color: null
        }
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
