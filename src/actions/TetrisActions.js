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

export function destruct() {
    return { type: DESTRUCT }
}

export function initialize(loop: number) {
    return { type: INITIALIZE, loop }
}

export function start(): Action {
    return { type: START }
}

export function pause(): Action {
    return { type: PAUSE }
}

export function play(): Action {
    return { type: PLAY }
}

export function moveDown(): Action {
    return { type: MOVE_DOWN }
}

export function moveRight() {
    return { type: MOVE_RIGHT }
}

export function moveLeft() {
    return { type: MOVE_LEFT }
}

export function rotate() {
    return { type: ROTATE }
}