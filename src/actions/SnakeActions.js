// @flow

export type IDirection =
  | 0
  | 1
  | 2
  | 3

export const Direction = {
  up: 0,
  right: 1,
  down: 2,
  left: 3
}

export type SnakeAction =
  | { type: 'START_SNAKE' }
  | { type: 'PAUSE_SNAKE' }
  | { type: 'PLAY_SNAKE' }
  | { type: 'INITIALIZE_SNAKE', loop: number }
  | { type: 'DESTRUCT_SNAKE' }
  | { type: 'MOVE_SNAKE' }
  | { type: 'CHANGE_DIRECTION_SNAKE', direction: IDirection }
  | { type: null }

export const START_SNAKE = 'START_SNAKE'
export const PAUSE_SNAKE = 'PAUSE_SNAKE'
export const PLAY_SNAKE = 'PLAY_SNAKE'
export const INITIALIZE_SNAKE = 'INITIALIZE_SNAKE'
export const DESTRUCT_SNAKE = 'DESTRUCT_SNAKE'
export const MOVE_SNAKE = 'MOVE_SNAKE'
export const CHANGE_DIRECTON_SNAKE = 'CHANGE_DIRECTION_SNAKE'

export default class SnakeActions {
  destruct = (): SnakeAction => ({ type: DESTRUCT_SNAKE })
  initialize = (loop: number): SnakeAction => ({ type: INITIALIZE_SNAKE, loop })
  start = (): SnakeAction => ({ type: START_SNAKE })
  pause = (): SnakeAction => ({ type: PAUSE_SNAKE })
  play = (): SnakeAction => ({ type: PLAY_SNAKE })
  move = (): SnakeAction => ({ type: MOVE_SNAKE })
  changeDirection = (direction: IDirection): SnakeAction => ({ type: CHANGE_DIRECTON_SNAKE, direction })
}