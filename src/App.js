//@flow

import React, { Component } from 'react';
import { connect } from 'react-redux'
import type { State } from './actions/TetrisReducer'
import type { Rows } from './Rows'
import type { IPiece } from './Piece'
import * as Piece from './Piece'
import { start, pause, play, moveDown, moveRight, moveLeft, rotate } from './actions/TetrisActions'
import './App.css';

const tile = {
  full: '■',
  empty: '□'
}

function printTile(p: IPiece, y: number): Function {
  return (t: number, x: number): string => {
    if (!p) return t === 0 ? tile.empty : tile.full
    if (p.filter(pi => pi.x == x && pi.y == y).length > 0) {
      return tile.full
    }
    return t === 0 ? tile.empty : tile.full
  }
}

type Props = {
  rows: Rows,
  piece: any,
  start: Function,
  pause: Function,
  play: Function,
  moveRight: Function,
  moveLeft: Function,
  moveDown: Function,
  rotate: Function
}

const leftArrow = 37
const upArrow = 38
const rightArrow = 39
const downArrow = 40

class App extends Component<Props, any> {

  _handleKeyDown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case leftArrow:  return this.props.moveLeft()
      case rightArrow: return this.props.moveRight()
      case upArrow:    return this.props.rotate()
      case downArrow:  return this.props.moveDown()
    }
  }

  componentWillMount(props) {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown.bind(this));
  }

  render() {
    return (
      <div className="App">
        <div className="Aligner">
          <div className="Aligner-item Aligner-item--top">
            <button onClick={this.props.start} >START</button>
          </div>
          <div className="Aligner-item">
            {this.props.rows.map((row, y) => (
              <p>
                {row.map(printTile(this.props.piece, y))}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    rows: state.rows,
    piece: state.piece
  }
}

function mapDispatchToProps(dispatch: Function) {
  return {
    start: (() => {
      dispatch(start())
      setInterval(() => dispatch(moveDown()), 1000)
    }),
    pause: () => dispatch(pause()),
    play: () => dispatch(play()),
    moveRight: () => dispatch(moveRight()),
    moveLeft: () => dispatch(moveLeft()),
    moveDown: () => dispatch(moveDown()),
    rotate: () => dispatch(rotate())
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer;
