// @flow

import type { Action } from './TetrisActions'
import {
    START,
    PAUSE,
    PLAY,
    NEW_PIECE,
    MOVE_DOWN,
    MOVE_RIGHT,
    MOVE_LEFT,
    ROTATE
} from './TetrisActions'
import type { Rows } from '../Rows'
import type { IPiece } from '../Piece'
import { getRows } from '../Rows'
import * as Piece from '../Piece'

const Status = {
    inactive: 0,
    active: 1,
    paused: 2,
    gameOver: 3
}

type IStatus =
| 0
| 1
| 2
| 3

export type State = {
    rows: Rows,
    piece: ?IPiece,
    status: IStatus
}

const initialState = { 
    rows: getRows(),
    piece: null,
    status: Status.inactive
}

export function reducer(state: State = initialState, action: Action = { type: null }): State {
    switch (action.type) {
        case START:      return start(state)
        case PAUSE:      return state
        case PLAY:       return state
        case NEW_PIECE:  return newPiece(state)
        case MOVE_DOWN:  return moveDown(state)
        case MOVE_RIGHT: return moveRight(state)
        case MOVE_LEFT:  return moveLeft(state)
        case ROTATE:     return rotate(state)
        default:         return state
    }
}

function start(state) {
    const rows = getRows()
    const status = Status.active
    return { ...state, rows, status }
}

function play(state) {
    const status = Status.active
    return { ...state, status }
}

function pause(state) {
    const status = Status.paused
    return { ...state, status }
}

function newPiece(state) {
    const piece = Piece.generate()
    return { ...state, piece }
}

function moveDown(state) {
    const ip = state.piece
    if (state.status !== Status.active) return state

    if (!ip) return addPiece()

    if (Piece.canMoveDown(state.rows, ip)) {
        const piece = Piece.moveDown(ip)
        return { ...state, piece }
    }

    if (Piece.overTopLimit(ip)) return { ...state, status: Status.gameOver }

    const rows = Piece.add(state.rows, ip)
    return { ...state, rows, piece: null }

    function addPiece() {
        const piece = Piece.generate()
        return { ...state, piece }
    }
}

function moveRight(state) {
    if (!state.piece) return state
    const piece = Piece.moveRight(state.rows, state.piece)
    return { ...state, piece }
}

function moveLeft(state) {
    if (!state.piece) return state
    const piece = Piece.moveLeft(state.rows, state.piece)
    return { ...state, piece }
}

function rotate(state) {
    if (!state.piece) return state
    const piece = Piece.rotate(state.piece)
    return { ...state, piece }
}