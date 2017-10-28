// @flow
import { range } from 'lodash'
import { randInt } from './Util'

export type IPoint = { 
    full: boolean,
    color: string,
 }

export type IRow = IPoint[]
export type IRows = IRow[]

export function getRows(count: number = 18, rowCount: number = 10): IRow[] {
    return range(count).map(() => row(rowCount))
}

export function addBlock(rows: IRow[]): IRows {
    const [x,y] = [randInt(rows.length - 1), randInt(rows[0].length -1)]
    rows[x][y] = { full: true, color: 'black' }
    return rows
}

function row(count) {
    return range(count).map(() => p())
}

function p() {
    return { full: false, color: 'black' }
}