// @flow

import { getRows, addBlock } from '../Rows'
import type { IRows } from '../Rows'
import type { SnakeAction, IDirection } from '../actions/SnakeActions'
import { REHYDRATE } from 'redux-persist/constants'
import { 
  START_SNAKE,
  PAUSE_SNAKE,
  PLAY_SNAKE,
  MOVE_SNAKE,
  CHANGE_DIRECTON_SNAKE
} from '../actions/SnakeActions'
import { Status } from './TetrisReducer'
import type { IStatus } from './TetrisReducer'
import Snake from '../Snake'

export type SnakeState = {
  direction: IDirection,
  status: IStatus,
  score: number,
  board: IRows,
  snake: ?Snake
} 

const initialState = {
  direction: 0,
  status: 0,
  score: 0,
  board: getRows(16,16),
  snake: null
}

export default function reducer(state: SnakeState = initialState, action: SnakeAction = { type: null }): SnakeState {
  switch(action.type) {
    case START_SNAKE:            return start(state)
    case PAUSE_SNAKE:            return pause(state)
    case PLAY_SNAKE:             return play(state)
    case MOVE_SNAKE:             return move(state)
    case CHANGE_DIRECTON_SNAKE:  return changeDirection(state, action.direction)
    case REHYDRATE:              return { ...initialState }
    default:                     return { ...state }
  }
}

function start(state) {
  const board = addBlock(getRows(16,16))
  const status = Status.active
  const score = 0
  const snake = Snake.create()

  return { ...state, board, status, score, snake }
}

function play(state) {
  const status = Status.active
  return { ...state, status }
}

function pause(state) {
  const status = Status.paused
  return { ...state, status }
}

function move(state) {
  const original = state.snake
  if (!original) return state
  if (state.status !== Status.active) return state
  const snake =  original.move()
  if (original.atLimit() || snake.selfOverlapping()) {
    return { ...state, status: Status.gameOver }
  }
  if (original.loc.isOverlapping(state.board)) {
    const snk = original.addBlock()
    const board = addBlock(getRows(16,16))
    return { ...state, snake: snk, board }
  }
  return { ...state, snake }
}

function changeDirection(state, direction) {
  if (!state.snake) return state
  return { ...state, snake: state.snake.changeDirection(direction) }
}