import '@babel/polyfill'

import React          from 'react'
import ReactDOM       from 'react-dom'
import { Provider }   from 'react-redux'
import configureStore from './configureStore'
import Home           from 'containers/Home'
import './global-style.scss'

// Load the favicon
import '!file-loader?name=[name].[ext]!./favicon.ico'

const store      = configureStore()
const MOUNT_NODE = document.getElementById('app_root')

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
        <Home />
    </Provider>,
    MOUNT_NODE,
  )
}

if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['containers/Home'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
    })
}

render()
