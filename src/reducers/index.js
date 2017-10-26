// @flow

import { combineReducers } from "redux";
import tetris from './TetrisReducer'
import type { TetrisState } from './TetrisReducer'
import snake from './SnakeReducer'
import type { SnakeState } from './SnakeReducer'

export type State = {
  tetris: TetrisState,
  snake: SnakeState
}

export default combineReducers({ tetris, snake })
