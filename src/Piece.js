// @flow

import React from 'react'
import Location from './Location'
import type { location } from './Location'
import type { IRow, IPoint } from './Rows'
import { getRows } from './Rows'

export type IPiece = {
  loc: location[],
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

  loc: location[]

  color: string

  constructor(loc: location[], color: string) {
    this.loc = loc
    this.color = color
  }

  static generate = (): IPiece => {
    return { color: randColor(), loc: Location.generate() }
  }

  static rotate = (piece: IPiece): IPiece => {
    return { color: piece.color, loc: Location.rotate(piece.loc) }
  }

  static moveDown = (piece: IPiece): IPiece => {
    return { color: piece.color, loc: Location.moveDown(piece.loc) }
  }

  static moveLeft = (rows: IRow[], piece: IPiece): IPiece => {
    return { color: piece.color, loc: Location.moveLeft(rows, piece.loc) }
  }

  static moveRight = (rows: IRow[], piece: IPiece): IPiece => {
    return { color: piece.color, loc: Location.moveRight(rows, piece.loc) }
  }

  static atLeftLimit = (piece: IPiece): boolean => {
    return Location.atLeftLimit(piece.loc)
  }

  static atRightLimit = (piece: IPiece): boolean => {
    return Location.atRightLimit(piece.loc)
  }

  static atTopLimit = (piece: IPiece): boolean => {
    return Location.atTopLimit(piece.loc)
  }

  static overTopLimit = (piece: IPiece): boolean => {
    return Location.overTopLimit(piece.loc)
  }

  static atBottomLimit = (piece: IPiece): boolean => {
    return Location.atBottomLimit(piece.loc)
  }

  static isFull = (row: IRow): boolean => {
    return Location.isFull(row)
  }

  static isOverlapping = (rows: IRow[], p: IPiece): boolean => {
    return Location.isOverlapping(rows, p.loc)
  }

  static canMoveDown = (rows: IRow[], p: IPiece) => {
    return Location.canMoveDown(rows, p.loc)
  }

  static add = (rows: IRow[], p: IPiece): { rows: IRow[], score: number } => {
    p.loc.map(({ x, y }) => {
      rows[y][x] = { color: p.color, full: true }
      return null
    })
    const filtered = rows.filter(r => !Piece.isFull(r))
    const score = rows.filter(r => Piece.isFull(r)).length
    const filler = getRows(1 + Location.limit.y.upper - filtered.length)
    return { rows: filler.concat(filtered), score }
  }

  static printTile = (p: ?IPiece, y: number): Function => {
    return (t: IPoint, x: number) => {
      if (!p) return t.full ? tile.full : tile.empty
      if (p.loc.filter(pi => pi.x === x && pi.y === y).length > 0) {
        return (<span style={{ color: p.color }} >{tile.full}</span>)
      }
      return (<span style={{ color: t.color }} >{t.full ? tile.full : tile.empty}</span>)
    }
  }
}

export default Piece