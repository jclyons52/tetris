// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux'
import type { IRows } from '../../Rows'
import SnakeActions, { Direction } from '../actions/SnakeActions'
import type { IDirection } from '../actions/SnakeActions'
import type Snake from '../Snake'
import type { IStatus, State } from '../../types'
import { Grid, Row } from 'react-bootstrap'
import Jumbotron from '../../components/Jumbotron'
import Board from '../../components/Board'
import ScoreBoard from '../../components/ScoreBoard'

const snakeActions = new SnakeActions()
type Props = {
  rows: IRows,
  status: IStatus,
  score: number,
  snake: Snake,
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

  _handleKeyDown = (event: KeyboardEvent) => {
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
              push={3}
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
      const loop = setInterval(() => dispatch(snakeActions.move()), 300)
      dispatch(snakeActions.initialize(loop))
    },
    destruct: () => dispatch(snakeActions.destruct()),
    start: () => dispatch(snakeActions.start()),
    pause: () => dispatch(snakeActions.pause()),
    play: () => dispatch(snakeActions.play()),
    changeDirection: (direction: IDirection) => dispatch(snakeActions.changeDirection(direction))
  }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer;
