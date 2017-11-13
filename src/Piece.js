// @flow

import React from 'react'
import Location from './Location'
import type { IRow, IPoint } from './Rows'
import { getRows } from './Rows'

export type IPiece = {
  loc: Location,
  color: string
}

const tile = {
  full: '■',
  empty: '□'
}

function randColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

class Piece {

  loc: Location

  color: string

  constructor(loc: Location, color: string) {
    this.loc = loc
    this.color = color
  }

  static generate = (): Piece => {
    return new Piece(Location.generate(), randColor())
  }

  rotate = (): Piece => {
    return new Piece(this.loc.rotate(), this.color)
  }

  moveDown = (): Piece => {
    return new Piece(this.loc.moveDown(), this.color)
  }

  moveLeft = (rows: IRow[]): Piece => {
    return new Piece(this.loc.moveLeft(rows), this.color)
  }

  moveRight = (rows: IRow[]): Piece => {
    return new Piece(this.loc.moveRight(rows), this.color)
  }

  add = (rows: IRow[], p: Piece): { rows: IRow[], score: number } => {
    p.loc.points.map(({ x, y }) => {
      rows[y][x] = { color: p.color, full: true }
      return null
    })
    const filtered = rows.filter(r => !this.loc.isFull(r))
    const score = rows.filter(r => this.loc.isFull(r)).length
    const filler = getRows(1 + this.loc.limit.y.upper - filtered.length)
    return { rows: filler.concat(filtered), score }
  }

  static printTile = (p: ?Piece, y: number): Function => {
    return (t: IPoint, x: number) => {
      if (!p) return t.full ? tile.full : tile.empty
      if (p.loc.points.filter(pi => pi.x === x && pi.y === y).length > 0) {
        return (<span style={{ color: p.color }} >{tile.full}</span>)
      }
      return (<span style={{ color: t.color }} >{t.full ? tile.full : tile.empty}</span>)
    }
  }
}

export default Piece