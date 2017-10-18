// @flow

import type { IRow } from './Rows'
import { getRows } from './Rows'
import { rand } from './Util'

export type location = { x: number, y: number }

export const limit = {
    y: {
        upper: 17,
        lower: 0
    },
    x: {
        upper: 9,
        lower: 0
    }
}

export function generate(): location[] {
    const l = (x, y) => ({ x, y })
    const shapes = [
        [l(0, 0), l(0, 1), l(1, 0), l(1, 1)],
        [l(0, 0), l(0, 1), l(0, 2), l(0, 3)],
        [l(0, 0), l(0, 1), l(1, 1), l(0, 2)],
        [l(0, 0), l(0, 1), l(1, 2), l(0, 2)],
        [l(0, 0), l(0, 1), l(0, 2), l(1, 0)],
    ]
    return rand(shapes)
}

export function rotate(piece: location[]): location[] {
    const relative = locToArr(piece[1])
    const newPiece = piece.map(loc => {
        const arr = diff(locToArr(loc), relative)
        const rotated = [-1 * arr[1], 1 * arr[0]]
        const n = sum(rotated, relative)
        return { x: n[0], y: n[1] }
    })
    const shift = (() => {
        const bounds = getBounds(newPiece)
        return getRequiredShifts(bounds)
    })()

    return newPiece.map(({ x, y }) => ({ x: x+shift.x, y: y+shift.y }))

    function getRequiredShifts(bounds) {
        return {
            x: (() => {
                if (bounds.x.max > limit.x.upper) {
                    return limit.x.upper - bounds.x.max;
                }
                if (bounds.x.min < limit.x.lower) {
                    return - bounds.x.min;
                }
                return 0
            })(),
            y: (() => {
                if (bounds.y.max > limit.y.upper) {
                    return limit.y.upper - bounds.y.max;
                }
                if (bounds.y.min < limit.y.lower) {
                    return - bounds.y.min;
                }
                return 0
            })()
        };
    }

    function getBounds(p) {
        return {
            x: {
                max: Math.max(...p.map(({ x }) => x)),
                min: Math.min(...p.map(({ x }) => x))
            },
            y: {
                max: Math.max(...p.map(({ y }) => y)),
                min: Math.min(...p.map(({ y }) => y))
            }
        };
    }

    function locToArr({ x, y }) {
        return [x, y]
    }

    function diff([x1, y1], [x2, y2]) {
        return [x1 - x2, y1 - y2]
    }

    function sum([x1, y1], [x2, y2]) {
        return [x1 + x2, y1 + y2]
    }

    function product([x1, y1], [x2, y2]) {
        return [x1 * x2, y1 * y2]
    }
}

export function moveDown(piece: location[]): location[] {
    const shift = ({ x, y }) => ({ y: y + 1, x })
    return atBottomLimit(piece) ? piece : piece.map(shift)
}

export function moveLeft(rows: IRow[], piece: location[]): location[] {
    const shift = ({ x, y }) => ({ x: x - 1, y })
    return canMoveLeft(rows, piece) ?  piece.map(shift) : piece
}

export function moveRight(rows: IRow[], piece: location[]): location[] {
    const shift = ({ x, y }) => ({ x: x + 1, y })
    return canMoveRight(rows, piece) ? piece.map(shift) : piece
}

export function atLeftLimit(piece: location[]): boolean {
    return piece.filter(({ x }) => x === limit.x.lower).length > 0
}

export function atRightLimit(piece: location[]): boolean {
    return piece.filter(({ x }) => x === limit.x.upper).length > 0
}

export function atTopLimit(piece: location[]): boolean {
    return piece.filter(({ y }) => y === limit.y.lower).length > 0
}

export function overTopLimit(piece: location[]): boolean {
    return piece.filter(({ y }) => y > limit.y.upper).length > 0
}

export function atBottomLimit(piece: location[]): boolean {
    return piece.filter(({ y }) => y === limit.y.upper).length > 0
}

export function isFull(row: IRow): boolean {
    return row.filter(i => !i.full).length === 0
}

export function isOverlapping(rows: IRow[], p: location[]): boolean {
    return p.filter(({ x, y }) => rows[y][x].full).length > 0
}

function canMoveLeft(rows: IRow[], p: location[]): boolean {
    return p.filter(({ x, y }) => {
       if (x === limit.x.lower) return true
       if (rows[y][x - 1].full) return true
    }).length === 0
}

function canMoveRight(rows: IRow[], p: location[]): boolean {
    return p.filter(({ x, y }) => {
       if (x === limit.x.upper) return true
       if (rows[y][x + 1].full) return true
    }).length === 0
}

export function canMoveDown(rows: IRow[], p: location[]): boolean {
    return p.filter(({ x, y }) => {
       if (y === limit.y.upper) return true
       if (rows[y + 1][x].full) return true
    }).length === 0
}
