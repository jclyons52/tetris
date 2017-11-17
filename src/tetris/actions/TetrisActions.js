// @flow

export type Action =
    | { type: null }
    | { type: 'START' }
    | { type: 'PAUSE' }
    | { type: 'PLAY' }
    | { type: 'MOVE_DOWN' }
    | { type: 'MOVE_RIGHT' }
    | { type: 'MOVE_LEFT' }
    | { type: 'INITIALIZE', loop: number }
    | { type: 'DESTRUCT' }
    | { type: 'ROTATE' }

export const START = 'START'
export const PAUSE = 'PAUSE'
export const PLAY = 'PLAY'
export const MOVE_DOWN = 'MOVE_DOWN'
export const MOVE_RIGHT = 'MOVE_RIGHT'
export const MOVE_LEFT = 'MOVE_LEFT'
export const ROTATE = 'ROTATE'
export const INITIALIZE = 'INITIALIZE'
export const DESTRUCT = 'DESTRUCT'


export default class TetrisActions {
    destruct = (): Action => ({ type: DESTRUCT })
    initialize = (loop: number): Action => ({ type: INITIALIZE, loop })
    start = (): Action => ({ type: START })
    pause = (): Action => ({ type: PAUSE })
    play = (): Action => ({ type: PLAY })
    moveDown = (): Action => ({ type: MOVE_DOWN })
    moveRight = (): Action => ({ type: MOVE_RIGHT })
    moveLeft = (): Action => ({ type: MOVE_LEFT })
    rotate = (): Action => ({ type: ROTATE })
}