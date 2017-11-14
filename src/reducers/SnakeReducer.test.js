import reducer from './SnakeReducer'
import SnakeActions, { Direction } from '../actions/SnakeActions'
import { Status } from './TetrisReducer'

const sa = new SnakeActions()

it('starts the game', () => {
  const final = [sa.start()].reduce(reducer, reducer())
  expect(final.status).toBe(Status.active)
  expect(final.snake.loc.points.length).toBe(4)
  expect(final.score).toBe(0)
})

it('pauses game', () => {
  const final = [sa.pause()].reduce(reducer, reducer())
  expect(final.status).toBe(Status.paused)
})

it('restarts paused game', () => {
  const actions = [sa.pause(), sa.play()]
  const final = actions.reduce(reducer, reducer())
  expect(final.status).toBe(Status.active)
})

it('it changes direction', () => {
  const actions = [sa.start(), sa.changeDirection(Direction.down)]
  const final = actions.reduce(reducer, reducer())
  expect(final.snake.direction).toBe(Direction.down)
})

it('moves the snake', () => {
  const initial = reducer(reducer(), sa.start())
  const final = reducer(initial, sa.move())
  
  expect(final.snake.loc.points[0].y)
  .toBe(initial.snake.loc.points[0].y - 1 )
})

it('stops the game if the border is hit', () => {
  const actions = [
    sa.start(),
    ...[1,2,3,4,5,6,7,8,9].map(() => sa.move())
  ]
  const final = actions.reduce(reducer, reducer())
  expect(final.status).toBe(Status.gameOver)
})
