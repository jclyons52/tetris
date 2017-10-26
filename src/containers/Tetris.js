// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux'
import type { State } from '../reducers'
import type { IStatus } from '../reducers/TetrisReducer'
import type { IRows } from '../Rows'
import type { IPiece } from '../Piece'
import { 
  start,
   pause,
   play,
   moveDown,
   moveRight,
   moveLeft,
   rotate,
   initialize,
   destruct 
} from '../actions/TetrisActions'
import { Grid, Row } from 'react-bootstrap'
import Jumbotron from '../components/Jumbotron'
import Board from '../components/Board'
import ScoreBoard from '../components/ScoreBoard'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import '../App.css';

type Props = {
  rows: IRows,
  piece: IPiece,
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

class App extends Component<Props, any> {

  constructor(props) {
    super(props)
    this._handleKeyDown = this._handleKeyDown.bind(this)
  }

  _handleKeyDown(event: KeyboardEvent): void {
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
      const loop = setInterval(() => dispatch(moveDown()), 1000)
      dispatch(initialize(loop))
    },
    destruct: () => dispatch(destruct()),
    start: () => dispatch(start()),
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
