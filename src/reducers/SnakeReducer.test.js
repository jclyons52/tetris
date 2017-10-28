import reducer from './SnakeReducer'
import {
  changeDirection,
  play,
  move,
  Direction,
  pause,
  start
} from '../actions/SnakeActions'
import { Status } from './TetrisReducer'

it('starts the game', () => {
  const final = [start()].reduce(reducer, reducer())
  expect(final.status).toBe(Status.active)
  expect(final.snake.loc.length).toBe(4)
  expect(final.score).toBe(0)
})

it('pauses game', () => {
  const final = [pause()].reduce(reducer, reducer())
  expect(final.status).toBe(Status.paused)
})

it('restarts paused game', () => {
  const actions = [pause(), play()]
  const final = actions.reduce(reducer, reducer())
  expect(final.status).toBe(Status.active)
})

it('it changes direction', () => {
  const actions = [changeDirection(Direction.down)]
  const final = actions.reduce(reducer, reducer())
  expect(final.direction).toBe(Direction.down)
})

it('moves the snake', () => {
  const initial = reducer(reducer(), start())
  const final = reducer(initial, move())
  
  expect(final.snake.loc[0].y)
  .toBe(initial.snake.loc[0].y - 1 )
})
