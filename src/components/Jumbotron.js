// @flow

import React from 'react'
import { Status } from '../reducers/TetrisReducer'
import type { IStatus } from '../reducers/TetrisReducer'
import { Button, Jumbotron } from 'react-bootstrap'


type Props = {
  status: IStatus,
  score: number,
  start: Function,
  pause: Function,
  play: Function,
}

export default (props: Props) => {
  if (props.status === Status.inactive) {
    return (
      <Jumbotron style={{ textAlign: 'center' }} >
        <h1>New Game</h1>
        <Button onClick={props.start} >START</Button>
      </Jumbotron>
    )
  }
  if (props.status === Status.active) {
    return (
      <Jumbotron style={{ textAlign: 'center' }} >
        <h1>Score: {props.score}</h1>
        <Button onClick={props.pause}>PAUSE</Button>
      </Jumbotron>
    )
  }
  if (props.status === Status.paused) {
    return (
      <Jumbotron style={{ textAlign: 'center' }} >
        <h1>Score: {props.score}</h1>
        <Button onClick={props.play}>PLAY</Button>
      </Jumbotron>
    )
  }
  if (props.status === Status.gameOver) {
    return (
      <Jumbotron style={{ textAlign: 'center' }} >
        <h1>Game Over</h1>
        <Button onClick={props.start} >Play Again</Button>
      </Jumbotron>
    )
  }
}