// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Nav, NavItem, Navbar } from 'react-bootstrap'
import Tetris from './tetris/containers/Tetris'
import Snake from './snake/containers/Snake'
import { Route, Link } from 'react-router-dom'

const Home = () => (<div><h2>Home</h2></div>)

const App = () => (
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
)

export default App