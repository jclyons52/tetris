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
    destruct = () => ({ type: DESTRUCT })
    initialize = (loop: number) => ({ type: INITIALIZE, loop })
    start = (): Action => ({ type: START })
    pause = (): Action => ({ type: PAUSE })
    play = (): Action => ({ type: PLAY })
    moveDown = (): Action => ({ type: MOVE_DOWN })
    moveRight = () => ({ type: MOVE_RIGHT })
    moveLeft = () => ({ type: MOVE_LEFT })
    rotate = () => ({ type: ROTATE })
}