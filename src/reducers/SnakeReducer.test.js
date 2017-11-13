import reducer from './SnakeReducer'
import SnakeActions, { Direction } from '../actions/SnakeActions'
import { Status } from './TetrisReducer'

const snakeActions = new SnakeActions()

it('starts the game', () => {
  const final = [snakeActions.start()].reduce(reducer, reducer())
  expect(final.status).toBe(Status.active)
  expect(final.snake.loc.length).toBe(4)
  expect(final.score).toBe(0)
})

it('pauses game', () => {
  const final = [snakeActions.pause()].reduce(reducer, reducer())
  expect(final.status).toBe(Status.paused)
})

it('restarts paused game', () => {
  const actions = [snakeActions.pause(), snakeActions.play()]
  const final = actions.reduce(reducer, reducer())
  expect(final.status).toBe(Status.active)
})

it('it changes direction', () => {
  const actions = [snakeActions.changeDirection(Direction.down)]
  const final = actions.reduce(reducer, reducer())
  expect(final.direction).toBe(Direction.down)
})

it('moves the snake', () => {
  const initial = reducer(reducer(), snakeActions.start())
  const final = reducer(initial, snakeActions.move())
  
  expect(final.snake.loc.points[0].y)
  .toBe(initial.snake.loc.points[0].y - 1 )
})

it('stops the game if the border is hit', () => {
  const actions = [
    snakeActions.start(),
    ...[1,2,3,4,5,6,7,8,9].map(i => snakeActions.move())
  ]
  const final = actions.map(reducer, reducer())
  expect(final.status).toBe(Status.gameOver)
})
