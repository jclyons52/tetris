import reducer, { Status } from './TetrisReducer'
import { start, play, pause, moveDown, moveRight, moveLeft } from '../actions/TetrisActions'

it('starts a game', () => {
    const final = [start()].reduce(reducer, reducer())
    expect(final.rows.length).toBe(18)
    expect(final.status).toBe(Status.active)
    expect(final.score).toBe(final.score)
})

it('pauses game', () => {
    const final = [start(), pause()].reduce(reducer, reducer())
    expect(final.status).toBe(Status.paused)
})

it('restarts a paused game', () => {
    const final = [start(), pause(), play()].reduce(reducer, reducer())
    expect(final.status).toBe(Status.active)
})

it('adds a piece if move down is called without one', () => {
    const final = [start(), moveDown()].reduce(reducer, reducer())
    expect(final.piece.loc.length).toBe(4)
})

it('does not move a piece if the game is not active', () => {
    const final = [moveDown()].reduce(reducer, reducer())
    expect(final.piece).toBe(null)
})

it('moves a piece right', () => {
    const initial = [start(), moveDown()].reduce(reducer, reducer())
    const final = [moveRight()].reduce(reducer, initial)
    final.piece.loc.map((loc, i) => {
        expect(loc.x).toBe(initial.piece.loc[i].x + 1)
        return null
    })
})

it('moves a piece left', () => {
    const initial = [start(), moveDown(), moveRight()].reduce(reducer, reducer())
    const final = [moveLeft()].reduce(reducer, initial)
    final.piece.loc.map((loc, i) => {
        expect(loc.x).toBe(initial.piece.loc[i].x - 1)
        return null
    })
})
