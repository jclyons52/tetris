// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux'
import type { State } from '../reducers'
import type { IRows } from '../Rows'
import {
  Direction,
  start,
  pause,
  play,
  move,
  initialize,
  destruct,
  changeDirection
} from '../actions/SnakeActions'
import type { IDirection } from '../actions/SnakeActions'
import type { IPiece } from '../Piece'
import type { IStatus } from '../reducers/TetrisReducer'
import { Grid, Row } from 'react-bootstrap'
import Jumbotron from '../components/Jumbotron'
import Board from '../components/Board'
import ScoreBoard from '../components/ScoreBoard'


type Props = {
  rows: IRows,
  status: IStatus,
  score: number,
  snake: IPiece,
  start: Function,
  pause: Function,
  play: Function,
  initialize: Function,
  move: Function,
  changeDirection: Function
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
      case leftArrow:  return this.props.changeDirection(Direction.left)
      case rightArrow: return this.props.changeDirection(Direction.right)
      case upArrow:    return this.props.changeDirection(Direction.up)
      case downArrow:  return this.props.changeDirection(Direction.down)
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
        <Grid>
           <Jumbotron
            status={this.props.status}
            score={0}
            start={this.props.start}
            pause={this.props.pause}
            play={this.props.play}
          />
          <Row>
            <Board
              rows={this.props.rows}
              piece={this.props.snake}
              push={0}
            />
            <ScoreBoard
              highScores={[1]}
            />
          </Row>
        </Grid>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    rows: state.snake.board,
    status: state.snake.status,
    snake: state.snake.snake,
    score: state.snake.score
  }
}

function mapDispatchToProps(dispatch: Function) {
  return {
    initialize: () => {
      const loop = setInterval(() => dispatch(move()), 1000)
      dispatch(initialize(loop))
    },
    destruct: () => dispatch(destruct()),
    start: () => dispatch(start()),
    pause: () => dispatch(pause()),
    play: () => dispatch(play()),
    changeDirection: (direction: IDirection) => dispatch(changeDirection(direction))
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer;
