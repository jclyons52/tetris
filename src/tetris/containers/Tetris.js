// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux'
import type { IStatus, State } from '../../types'
import type { IRows } from '../../Rows'
import type Piece from '../../Piece'
import TetrisActions from '../actions/TetrisActions'
import { Grid, Row } from 'react-bootstrap'
import Jumbotron from '../../components/Jumbotron'
import Board from '../../components/Board'
import ScoreBoard from '../../components/ScoreBoard'

type Props = {
  rows: IRows,
  piece: Piece,
  status: IStatus,
  score: number,
  highScores: number[],
  start: Function,
  pause: Function,
  play: Function,
  initialize: Function,
  moveRight: Function,
  moveLeft: Function,
  moveDown: Function,
  rotate: Function
}

const leftArrow = 37
const upArrow = 38
const rightArrow = 39
const downArrow = 40

const tetrisActions = new TetrisActions()

class App extends Component<Props, any> {

  _handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault()
    switch (event.keyCode) {
      case leftArrow:  return this.props.moveLeft()
      case rightArrow: return this.props.moveRight()
      case upArrow:    return this.props.rotate()
      case downArrow:  return this.props.moveDown()
      default:         return
    }
  }

  componentWillMount(props) {
    document.addEventListener("keydown", this._handleKeyDown);
    this.props.initialize()
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._handleKeyDown);
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
            <Board
              rows={this.props.rows}
              piece={this.props.piece}
            />
            <ScoreBoard
              highScores={this.props.highScores}
            />
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    rows: state.tetris.rows,
    piece: state.tetris.piece,
    status: state.tetris.status,
    score: state.tetris.score,
    highScores: state.tetris.highScores
  }
}

function mapDispatchToProps(dispatch: Function) {
  return {
    initialize: () => {
      const loop = setInterval(() => dispatch(tetrisActions.moveDown()), 1000)
      dispatch(tetrisActions.initialize(loop))
    },
    destruct: () => dispatch(tetrisActions.destruct()),
    start: () => dispatch(tetrisActions.start()),
    pause: () => dispatch(tetrisActions.pause()),
    play: () => dispatch(tetrisActions.play()),
    moveRight: () => dispatch(tetrisActions.moveRight()),
    moveLeft: () => dispatch(tetrisActions.moveLeft()),
    moveDown: () => dispatch(tetrisActions.moveDown()),
    rotate: () => dispatch(tetrisActions.rotate())
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer;
