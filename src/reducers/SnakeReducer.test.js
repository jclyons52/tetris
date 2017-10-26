import reducer from './SnakeReducer'
import { changeDirection, Direction } from '../actions/SnakeActions'

it('it changes direction', () => {
  const initial = reducer()
  const action = changeDirection(Direction.down)
  const final = reducer(initial, action)
  expect(final.direction).toBe(Direction.down)
})

it('moves the snake', () => {
  const snake = {

  }
})
