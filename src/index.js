// @flow

import React from 'react';
import { render } from 'react-dom'
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducer } from './actions/TetrisReducer'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

let store = createStore(reducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
