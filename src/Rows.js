// @flow
import { range } from 'lodash'

export type IPoint = { 
    full: boolean,
    color: string,
 }

export type IRow = IPoint[]
export type IRows = IRow[]

export function getRows(count: number = 18, rowCount: number = 10): IRow[] {
    return range(count).map(() => row(rowCount))
}

function row(count) {
    return range(count).map(() => p())
}

function p() {
    return { full: false, color: 'black' }
}