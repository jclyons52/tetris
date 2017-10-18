// @flow

import React from 'react'
import * as Location from './Location'
import type { location } from './Location'
import type { IRow, IPoint } from './Rows'
import { getRows } from './Rows'
import { rand } from './Util'

export type IPiece = {
  loc: location[],
  color: string
}

const tile = {
  full: '■',
  empty: '□'
}

const colors = [
  'red',
  'green',
  'blue'
]

export function printTile(p: IPiece, y: number): Function {
  return (t: IPoint, x: number) => {
    if (!p) return t.full ? tile.full : tile.empty
    if (p.loc.filter(pi => pi.x == x && pi.y == y).length > 0) {
      return (<span style={{ color: p.color }} >{tile.full}</span>)
    }
    return (<span style={{ color: t.color }} >{t.full ? tile.full : tile.empty}</span>)
  }
}

export function generate(): IPiece {
  return { color: rand(colors), loc: Location.generate() }
}

export function rotate(piece: IPiece): IPiece {
  return { color: piece.color, loc: Location.rotate(piece.loc)  }
}

export function moveDown(piece: IPiece): IPiece {
  return { color: piece.color, loc: Location.moveDown(piece.loc) }
}

export function moveLeft(rows: IRow[], piece: IPiece): IPiece {
  return { color: piece.color, loc: Location.moveLeft(rows, piece.loc) }
}

export function moveRight(rows: IRow[], piece: IPiece): IPiece {
  return { color: piece.color, loc: Location.moveRight(rows, piece.loc) }
}

export function atLeftLimit(piece: IPiece): boolean {
  return Location.atLeftLimit(piece.loc)
}

export function atRightLimit(piece: IPiece): boolean {
  return Location.atRightLimit(piece.loc)
}

export function atTopLimit(piece: IPiece): boolean {
  return Location.atTopLimit(piece.loc)
}

export function overTopLimit(piece: IPiece): boolean {
  return Location.overTopLimit(piece.loc)
}

export function atBottomLimit(piece: IPiece): boolean {
  return Location.atBottomLimit(piece.loc)
}

export function isFull(row: IRow): boolean {
  return Location.isFull(row)
}

export function isOverlapping(rows: IRow[], p: IPiece) {
  return Location.isOverlapping(rows, p.loc) 
}

export function canMoveDown(rows: IRow[], p: IPiece) {
  return Location.canMoveDown(rows, p.loc) 
}

export function add(rows: IRow[], p: IPiece): { rows: IRow[], score: number } {
  p.loc.map(({ x, y }) => {
    rows[y][x] = { color: p.color, full: true }
  })
  const filtered = rows.filter(r => !isFull(r))
  const score = rows.filter(r => isFull(r)).length
  const filler = getRows(1 + Location.limit.y.upper - filtered.length)
  return { rows: filler.concat(filtered), score }
} 