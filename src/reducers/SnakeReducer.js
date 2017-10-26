// @flow

import { getRows } from '../Rows'
import type { IRows } from '../Rows'
import type { SnakeActions, IDirection } from '../actions/SnakeActions'
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
import * as Piece from '../Piece'
import type { IPiece } from '../Piece'
import * as Snake from '../games/snake/Snake'

export type SnakeState = {
  direction: IDirection,
  status: IStatus,
  score: number,
  board: IRows,
  snake: ?IPiece
} 

const initialState = {
  direction: 0,
  status: 0,
  score: 0,
  board: getRows(16,16),
  snake: null
}

export default function reducer(state: SnakeState = initialState, action: SnakeActions = { type: null }): SnakeState {
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
  const rows = getRows(16,16)
  const status = Status.active
  const score = 0
  const snake = (() => {
    const {color, loc} = Piece.generate()
    return {
      color,
      loc: loc.map(({x,y}) => ({ x: x + 8, y: y + 8 }))
    }    
  })()

  return { ...state, rows, status, score, snake }
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
  if (!state.snake) return state
  const snake =  Snake.move(state.snake, state.direction)
  return { ...state, snake }
}

function changeDirection(state, direction) {
  return { ...state, direction }
}