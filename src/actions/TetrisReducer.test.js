import { reducer, initialState, Status } from './TetrisReducer'
import { flatMap } from 'lodash'

it('adds a shape', () => {
    const initial = reducer()
    const action = { type: 'NEW_PIECE' }
    const final = reducer(initial, action)
    expect(flatMap(final.rows, dot => dot === 1).filter(Boolean).length).toBe(4)
})

it('pauses game', () => {
    const initial = { ...initialState, status: Status.active }
    const action = { type: 'PAUSE' }
    const fianl = reducer(initial, action)
    expect(state.status).toBe(Status.paused) 

})