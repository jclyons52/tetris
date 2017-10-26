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
import type { IRows } from '../Rows'
import type { IPiece } from '../Piece'
import { getRows } from '../Rows'
import * as Piece from '../Piece'

export const Status = {
    inactive: 0,
    active: 1,
    paused: 2,
    gameOver: 3
}

export type IStatus =
    | 0
    | 1
    | 2
    | 3

export type TetrisState = {
    rows: IRows,
    piece: ?IPiece,
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

function destruct(state) {
    clearInterval(state.loop)
    const loop = 0
    return { ...state, loop }
}

function rehydrate(state) {
    return state
}

function initialize(state, loop) {
    return { ...state, loop }
}

function start(state) {
    const rows = getRows()
    const status = Status.active
    const score = 0
    return { ...state, rows, status, score }
}

function play(state) {
    const status = Status.active
    return { ...state, status }
}

function pause(state) {
    const status = Status.paused
    return { ...state, status }
}

function moveDown(state) {
    const ip = state.piece
    if (state.status !== Status.active) return state

    if (!ip) return addPiece()

    if (Piece.canMoveDown(state.rows, ip)) {
        const piece = Piece.moveDown(ip)
        return { ...state, piece }
    }

    if (Piece.overTopLimit(ip)) {
        return gameOver(state, ip)
    }

    const { rows, score } = Piece.add(state.rows, ip)
    return {
        ...state,
        rows,
        piece: null,
        score: state.score + score
    }

    function addPiece() {
        const piece = Piece.generate()
        if (Piece.isOverlapping(state.rows, piece)) {
            return gameOver(state, piece)
        }
        return { ...state, piece }
    }
}

function gameOver(state, piece) {
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
    const piece = Piece.moveRight(state.rows, state.piece)
    return { ...state, piece }
}

function moveLeft(state) {
    if (!state.piece) return state
    if (state.status !== Status.active) return state    
    const piece = Piece.moveLeft(state.rows, state.piece)
    return { ...state, piece }
}

function rotate(state) {
    if (!state.piece) return state
    if (state.status !== Status.active) return state    
    const piece = Piece.rotate(state.piece)
    return { ...state, piece }
}