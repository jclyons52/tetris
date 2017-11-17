// @flow

import Piece from '../Piece'
import type { IDirection } from './actions/SnakeActions'
import Location from '../Location'
import type { Point } from '../Location'
import { Map } from 'immutable'

const UP = 0
const RIGHT = 1
const DOWN = 2
const LEFT = 3

export default class Snake extends Piece {
  direction: IDirection
  constructor(loc: Location, color: string = 'black', direction: IDirection = 0) {
    super(loc, color)
    this.direction = direction
  }

  static create = () => {
    const l = (x, y) => ({ x, y })
    const color = 'black'
    const loc = [l(0, 3), l(0, 2), l(0, 1), l(0, 0)]
    return new Snake(
      new Location(
        loc.map(({ x, y }) => ({ x: x + 8, y: y + 8 })),
        {
          x: { lower: 0, upper: 15 },
          y: { lower: 0, upper: 15 }
        }
      ),
      color
    )
  }

  atLimit = () => {
    const point = this.loc.points[this.loc.points.length - 1]
    switch (this.direction) {
      case UP:      return this.loc.atTopLimit(point)
      case DOWN:    return this.loc.atBottomLimit(point)
      case LEFT:    return this.loc.atLeftLimit(point)
      case RIGHT:   return this.loc.atRightLimit(point)
      default:      return true
    }
  }

  selfOverlapping = () => {
    const grouped = this.loc.points.reduce((carry: Map<string, Point[]>, item: Point) => {
      const key = String(item.x) + String(item.y)
      if (!carry.has(key)) {
        return carry.set(key, [item])
      }
      return carry.set(
        key, 
        [...carry.get(key), item]
      )
    }, Map())

    return grouped.filter(x => x.length > 1).count() > 0
  }

  changeDirection = (direction: IDirection): Snake => {
    return new Snake(this.loc, this.color, direction)
  }

  move = (): Snake => {
    const [head, ...tail] = this.loc.points
    const next = this._getNext(tail[tail.length - 1], this.direction)
    return new Snake(new Location([...tail, next], this.loc.limit), this.color, this.direction)
  }

  _getNext = ({ x, y }: Point, direction: IDirection) => {
    switch (direction) {
      case UP:    return { x, y: y - 1 }
      case DOWN:  return { x, y: y + 1 }
      case RIGHT: return { x: x + 1, y }
      case LEFT:  return { x: x - 1, y }
      default: throw new Error('invalid direction')
    }
  }

  addBlock = (): Snake => {
    const tail = this.loc.points
    const next = this._getNext(tail[tail.length - 1], this.direction)
    return new Snake(
      new Location([...tail, next],
        this.loc.limit
      ),
      this.color,
      this.direction
    )
  }
}