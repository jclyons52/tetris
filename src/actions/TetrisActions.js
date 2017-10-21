// @flow

export type Action = 
| { type: null }
| { type: 'START', loop: number }
| { type: 'PAUSE' }
| { type: 'PLAY' }
| { type: 'MOVE_DOWN' }
| { type: 'MOVE_RIGHT' }
| { type: 'MOVE_LEFT' }

export const START = 'START'
export const PAUSE = 'PAUSE'
export const PLAY = 'PLAY'
export const MOVE_DOWN = 'MOVE_DOWN'
export const MOVE_RIGHT = 'MOVE_RIGHT'
export const MOVE_LEFT = 'MOVE_LEFT'
export const ROTATE = 'ROTATE'

export function start(loop: number): Action {
    return { type: START, loop }
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