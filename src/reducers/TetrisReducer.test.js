import reducer, { Status } from './TetrisReducer'
import TetrisActions from '../actions/TetrisActions'
const tactions = new TetrisActions()
it('starts a game', () => {
    const final = [tactions.start()].reduce(reducer, reducer())
    expect(final.rows.length).toBe(18)
    expect(final.status).toBe(Status.active)
    expect(final.score).toBe(final.score)
})

it('pauses game', () => {
    const final = [tactions.start(), tactions.pause()].reduce(reducer, reducer())
    expect(final.status).toBe(Status.paused)
})

it('restarts a paused game', () => {
    const final = [tactions.start(), tactions.pause(), tactions.play()].reduce(reducer, reducer())
    expect(final.status).toBe(Status.active)
})

it('adds a piece if move down is called without one', () => {
    const final = [
        tactions.start(), 
        tactions.moveDown()
    ].reduce(reducer, reducer())
    expect(final.piece.loc.points.length).toBe(4)
})

it('does not move a piece if the game is not active', () => {
    const final = [tactions.moveDown()].reduce(reducer, reducer())
    expect(final.piece).toBe(null)
})

it('moves a piece right', () => {
    const initial = [tactions.start(), tactions.moveDown()].reduce(reducer, reducer())
    const final = [tactions.moveRight()].reduce(reducer, initial)
    final.piece.loc.points.map((loc, i) => {
        expect(loc.x).toBe(initial.piece.loc.points[i].x + 1)
        return null
    })
})

it('moves a piece left', () => {
    const initial = [tactions.start(), tactions.moveDown(), tactions.moveRight()].reduce(reducer, reducer())
    const final = [tactions.moveLeft()].reduce(reducer, initial)
    final.piece.loc.points.map((loc, i) => {
        expect(loc.x).toBe(initial.piece.loc.points[i].x - 1)
        return null
    })
})
