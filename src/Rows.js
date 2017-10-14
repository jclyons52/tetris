// @flow
import { range } from 'lodash'
import type { IPiece } from './Piece'

export type Row = number[]
export type Rows = Row[]

export function getRows(count: number = 18): Row[] {
    return range(count).map(i => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
}
