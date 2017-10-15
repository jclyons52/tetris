//@flow

import React, { Component } from 'react';
import { connect } from 'react-redux'
import type { State, IStatus } from './actions/TetrisReducer'
import { Status } from './actions/TetrisReducer'

import type { Rows } from './Rows'
import type { IPiece } from './Piece'
import * as Piece from './Piece'
import { start, pause, play, moveDown, moveRight, moveLeft, rotate } from './actions/TetrisActions'
import { Button, Grid, Row, Col, Jumbotron, Panel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
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
  status: IStatus,
  score: number,
  highScores: number[],
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
      case leftArrow: return this.props.moveLeft()
      case rightArrow: return this.props.moveRight()
      case upArrow: return this.props.rotate()
      case downArrow: return this.props.moveDown()
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
        <Grid>
          {(() => {
            if (this.props.status === Status.inactive) {
              return (
                <Jumbotron style={{ textAlign: 'center' }} >
                <h1>New Game</h1>
                  <Button onClick={this.props.start} >START</Button>
                </Jumbotron>
              )
            }
            if (this.props.status === Status.active) {
              return (
                <Jumbotron style={{ textAlign: 'center' }} >
                  <h1>Score: {this.props.score}</h1>
                  <Button onClick={this.props.pause}>PAUSE</Button>
                </Jumbotron>
              )
            }
            if (this.props.status === Status.paused) {
              return (
                <Jumbotron style={{ textAlign: 'center' }} >
                  <h1>Score: {this.props.score}</h1>
                  <Button onClick={this.props.play}>PLAY</Button>
                </Jumbotron>
              )
            }
            if (this.props.status === Status.gameOver) {
              return (
                <Jumbotron style={{ textAlign: 'center' }} >
                <h1>Game Over</h1>
                  <Button onClick={this.props.start} >Play Again</Button>
                </Jumbotron>
              )
            }
          })()}
          <Row>
            <Col sm={4} smPush={4} >
              {this.props.rows.map((row, y) => (
                <p>
                  {row.map(printTile(this.props.piece, y))}
                </p>
              ))}
            </Col>
            <Col sm={4} smPush={4}>
              <Panel header="High Scores">
                <ul>
                  {this.props.highScores.map(s => <li>{s}</li>)}
                </ul>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    rows: state.rows,
    piece: state.piece,
    status: state.status,
    score: state.score,
    highScores: state.highScores
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
