// @flow

import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { render } from 'react-dom'
import { Nav, NavItem, Navbar } from 'react-bootstrap'
import Tetris from './containers/Tetris'
import Snake from './containers/Snake'
import Home from './containers/Home'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import store from './store'
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';

render(
  <Provider store={store}>
    <Router>
      <div>  
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Arcade</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1}><Link to="/tetris">Tetris</Link></NavItem>
            <NavItem eventKey={1}><Link to="/snake">Snake</Link></NavItem>
            
          </Nav>
        </Navbar>
        <Route exact path="/" component={Home} />
        <Route path="/tetris" component={Tetris} />
        <Route path="/snake" component={Snake} />
        
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
