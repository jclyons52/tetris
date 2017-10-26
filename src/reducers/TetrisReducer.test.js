import reducer, { initialState, Status } from './TetrisReducer'
import * as Piece from '../Piece'

it('starts a game', () => {
    const initial = reducer()
    const action = { type: 'START' }
    const final = reducer(initial, action)
    expect(final.rows.length).toBe(18)
    expect(final.status).toBe(Status.active)
    expect(final.score).toBe(final.score)
})

it('pauses game', () => {
    const initial = { ...initialState, status: Status.active }
    const action = { type: 'PAUSE' }
    const fianl = reducer(initial, action)
    expect(fianl.status).toBe(Status.paused)
})

it('restarts a paused game', () => {
    const initial = { ...initialState, status: Status.paused }
    const action = { type: 'PLAY' }
    const final = reducer(initial, action)
    expect(final.status).toBe(Status.active)
})

it('adds a piece if move down is called without one', () => {
    const initial = { ...initialState, status: Status.active }
    const action = { type: 'MOVE_DOWN' }
    const final = reducer(initial, action)
    expect(final.piece.loc.length).toBe(4)
})

it('does not move a piece if the game is not active', () => {
    const initial = { ...initialState }
    const action = { type: 'MOVE_DOWN' }
    const final = reducer(initial, action)
    expect(final.piece).toBe(null)
})

it('moves a piece right', () => {
    const initial = {
        ...initialState,
        status: Status.active,
        piece: Piece.generate()
    }
    const action = { type: 'MOVE_RIGHT' }
    const final = reducer(initial, action)
    final.piece.loc.map((loc, i) => {
        expect(loc.x).toBe(initial.piece.loc[i].x + 1)
        return null
    })
})

it('moves a piece left', () => {
    const piece = Piece.generate()
    const initial = {
        ...initialState,
        status: Status.active,
        piece: {
            color: piece.color,
            loc: piece.loc.map(({ x, y }) => ({ x: x + 1, y }))
        }
    }
    const action = { type: 'MOVE_LEFT' }
    const final = reducer(initial, action)
    final.piece.loc.map((loc, i) => {
        expect(loc.x).toBe(initial.piece.loc[i].x - 1)
        return null
    })
})
