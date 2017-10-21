// @flow
import { range } from 'lodash'

export type IPoint = { 
    full: boolean,
    color: string,
 }

export type IRow = IPoint[]
export type IRows = IRow[]

export function getRows(count: number = 18): IRow[] {
    return range(count).map(() => row())
}

function row() {
    return range(10).map(() => p())
}

function p() {
    return { full: false, color: 'black' }
}