//@flow

import React, { Component } from 'react';
import { connect } from 'react-redux'
import type { State, IStatus } from './actions/TetrisReducer'
import { Status } from './actions/TetrisReducer'

import type { IRows } from './Rows'
import type { IPiece } from './Piece'
import * as Piece from './Piece'
import { start, pause, play, moveDown, moveRight, moveLeft, rotate } from './actions/TetrisActions'
import { Button, Grid, Row, Col, Panel } from 'react-bootstrap'
import Jumbotron from './components/Jumbotron'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './App.css';



type Props = {
  rows: IRows,
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
    event.preventDefault()
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
          <Jumbotron
            status={this.props.status}
            score={this.props.score}
            start={this.props.start}
            pause={this.props.pause}
            play={this.props.play}
          />
          <Row>
            <Col sm={4} smPush={4} >
              {this.props.rows.map((row, y) => (
                <p>
                  {row.map(Piece.printTile(this.props.piece, y))}
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
      const loop = setInterval(() => dispatch(moveDown()), 1000)
      dispatch(start(loop))
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
