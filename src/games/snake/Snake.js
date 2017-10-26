// @flow

import type { IPiece } from '../../Piece'
import type { IDirection } from '../../actions/SnakeActions'
import { Direction } from '../../actions/SnakeActions'
import type { location } from '../../Location'
import * as Piece from '../../Piece'

const UP = 0
const RIGHT = 1
const DOWN = 2
const LEFT = 3

export function move(snake: IPiece, direction: IDirection) {
  const [head, ...tail] = snake.loc
  const next = getNext(tail[tail.length - 1], direction)
  tail.push(next)
  return { ...snake, loc: tail }
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