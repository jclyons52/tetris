// @flow

import type { IPiece } from './Piece'
import type { IDirection } from './actions/SnakeActions'
import type { location } from './Location'

const UP = 0
const RIGHT = 1
const DOWN = 2
const LEFT = 3

export function move(snake: IPiece, direction: IDirection) {
  const [head, ...tail] = snake.loc
  const next = getNext(tail[tail.length - 1], direction)
  return { ...snake, loc: [...tail, next] }
}

function getNext({ x, y }: location, direction: IDirection) {
  switch(direction) {
    case UP:    return { x, y: y - 1 }
    case DOWN:  return { x, y: y + 1 }
    case RIGHT: return { x: x + 1, y }
    case LEFT:  return { x: x - 1, y }
    default: throw new Error('invalid direction')
  }
} 

export function addBlock(snake: IPiece, direction: IDirection) {
  const tail = snake.loc
  const next = getNext(tail[tail.length - 1], direction)
  return { ...snake, loc: [...tail, next] }
}