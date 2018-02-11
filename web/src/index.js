import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const DEFAULT_STATE = {
    currentBuffer: timeline('LAST')
}

const store = createStore(
    (state = DEFAULT_STATE, action) => {
        switch (action.type) {
            case 'SCRUB':
                return {
                    currentBuffer: timeline(action.employeeId)
                }
            default:
                return state
        }
    }
)

ReactDOM.render(
    <Provider store={store}><App/></Provider>,
    document.getElementById('root')
)
