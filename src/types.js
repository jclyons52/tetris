// @flow

import type { TetrisState } from './tetris/reducers/TetrisReducer'
import type { SnakeState } from './snake/reducers/SnakeReducer'


export type IStatus =
| 0
| 1
| 2
| 3

export const Status = {
  inactive: 0,
  active: 1,
  paused: 2,
  gameOver: 3
}

export type State = {
  tetris: TetrisState,
  snake: SnakeState
}