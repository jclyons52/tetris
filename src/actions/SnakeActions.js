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

export type SnakeActions =
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

export function destruct(): SnakeActions {
  return { type: DESTRUCT_SNAKE }
}

export function initialize(loop: number): SnakeActions {
  return { type: INITIALIZE_SNAKE, loop }
}

export function start(): SnakeActions {
  return { type: START_SNAKE }
}

export function pause(): SnakeActions {
  return { type: PAUSE_SNAKE }
}

export function play(): SnakeActions {
  return { type: PLAY_SNAKE }
}

export function move(): SnakeActions {
  return { type: MOVE_SNAKE }
}

export function changeDirection(direction: IDirection): SnakeActions {
  return { type: CHANGE_DIRECTON_SNAKE, direction }
}