// @flow

import { REHYDRATE } from 'redux-persist/constants'
import type { Action } from '../actions/TetrisActions'
import {
    START,
    PAUSE,
    PLAY,
    MOVE_DOWN,
    MOVE_RIGHT,
    MOVE_LEFT,
    ROTATE,
    INITIALIZE,
    DESTRUCT
} from '../actions/TetrisActions'
import type { IRows } from '../../Rows'
import { getRows } from '../../Rows'
import Piece from '../../Piece'
import type { IStatus } from '../../types'
import { Status } from '../../types'

export type TetrisState = {
    rows: IRows,
    piece: ?Piece,
    status: IStatus,
    score: number,
    highScores: number[],
    loop: number
}

export const initialState = {
    rows: getRows(),
    piece: null,
    status: Status.inactive,
    score: 0,
    highScores: [],
    loop: 0
}

export default function reducer(state: TetrisState = initialState, action: Action = { type: null }): TetrisState {
    switch (action.type) {
        case START:      return start(state)
        case PAUSE:      return pause(state)
        case PLAY:       return play(state)
        case MOVE_DOWN:  return moveDown(state)
        case MOVE_RIGHT: return moveRight(state)
        case MOVE_LEFT:  return moveLeft(state)
        case ROTATE:     return rotate(state)
        case REHYDRATE:  return rehydrate(state)
        case INITIALIZE: return initialize(state, action.loop)
        case DESTRUCT:   return destruct(state)
        default:         return state
    }
}

function destruct(state: TetrisState) {
    clearInterval(state.loop)
    const loop = 0
    return { ...state, loop }
}

function rehydrate(state: TetrisState): TetrisState {
    return state
}

function initialize(state: TetrisState, loop): TetrisState {
    return { ...state, loop }
}

function start(state: TetrisState): TetrisState {
    const rows = getRows()
    const status = Status.active
    const score = 0
    return { ...state, rows, status, score }
}

function play(state: TetrisState): TetrisState {
    const status = Status.active
    return { ...state, status }
}

function pause(state: TetrisState): TetrisState {
    const status = Status.paused
    return { ...state, status }
}

function moveDown(state: TetrisState): TetrisState {
    const ip = state.piece
    if (state.status !== Status.active) return state

    if (!ip) return addPiece()

    if (ip.loc.canMoveDown(state.rows)) {
        const piece = ip.moveDown()
        return { ...state, piece }
    }

    if (ip.loc.overTopLimit()) {
        return gameOver(state, ip)
    }

    const { rows, score } = ip.add(state.rows, ip)
    return {
        ...state,
        rows,
        piece: null,
        score: state.score + score
    }

    function addPiece(): TetrisState {
        const piece = Piece.generate()
        if (piece.loc.isOverlapping(state.rows)) {
            return gameOver(state, piece)
        }
        return { ...state, piece }
    }
}

function gameOver(state: TetrisState, piece: Piece): TetrisState {
    const status = Status.gameOver
    const min = Math.min(0, ...state.highScores)
    const loop = 0
    if (state.score > min) {
       const highScores =  [...state.highScores, state.score].sort(Number).slice(0, 3)
       return { ...state, piece, status, highScores, loop }
    }
    return { ...state, piece, status, loop }
}

function moveRight(state) {
    if (!state.piece) return state
    if (state.status !== Status.active) return state
    const piece: Piece = state.piece.moveRight(state.rows)
    return { ...state, piece }
}

function moveLeft(state) {
    if (!state.piece) return state
    if (state.status !== Status.active) return state    
    const piece = state.piece.moveLeft(state.rows)
    return { ...state, piece }
}

function rotate(state) {
    if (!state.piece) return state
    if (state.status !== Status.active) return state    
    const piece = state.piece.rotate()
    return { ...state, piece }
}