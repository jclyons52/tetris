// @flow

import type { Row } from './Rows'
import { getRows } from './Rows'
export type location = { x: number, y: number }
export type IPiece = location[]

const limit = {
    y: {
        upper: 17,
        lower: 0
    },
    x: {
        upper: 9,
        lower: 0
    }
}

export function generate(): IPiece {
    const l = (x, y) => ({ x, y })
    const rand = (items) => items[Math.floor(Math.random() * items.length)]
    const shapes = [
        [l(0, 0), l(0, 1), l(1, 0), l(1, 1)],
        [l(0, 0), l(0, 1), l(0, 2), l(0, 3)],
        [l(0, 0), l(0, 1), l(1, 1), l(0, 2)],
        [l(0, 0), l(0, 1), l(0, 2), l(1, 2)],
    ]
    return rand(shapes)
}

export function rotate(piece: IPiece): IPiece {
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

export function moveDown(piece: IPiece): IPiece {
    const shift = ({ x, y }) => ({ y: y + 1, x })
    return atBottomLimit(piece) ? piece : piece.map(shift)
}

export function moveLeft(rows: Row[], piece: IPiece): IPiece {
    const shift = ({ x, y }) => ({ x: x - 1, y })
    return canMoveLeft(rows, piece) ?  piece.map(shift) : piece
}

export function moveRight(rows: Row[], piece: IPiece): IPiece {
    const shift = ({ x, y }) => ({ x: x + 1, y })
    return canMoveRight(rows, piece) ? piece.map(shift) : piece
}

export function atLeftLimit(piece: IPiece): boolean {
    return piece.filter(({ x }) => x === limit.x.lower).length > 0
}

export function atRightLimit(piece: IPiece): boolean {
    return piece.filter(({ x }) => x === limit.x.upper).length > 0
}

export function atTopLimit(piece: IPiece): boolean {
    return piece.filter(({ y }) => y === limit.y.lower).length > 0
}

export function overTopLimit(piece: IPiece): boolean {
    return piece.filter(({ y }) => y > limit.y.upper).length > 0
}

export function atBottomLimit(piece: IPiece): boolean {
    return piece.filter(({ y }) => y === limit.y.upper).length > 0
}

export function isFull(row: Row): boolean {
    return row.filter(i => i === 0).length === 0
}

export function isOverlapping(rows: Row[], p: IPiece) {
    return p.filter(({ x, y }) => rows[y][x] === 1).length > 0
}

function canMoveLeft(rows: Row[], p: IPiece) {
    return p.filter(({ x, y }) => {
       if (x === limit.x.lower) return true
       if (rows[y][x - 1] === 1) return true
    }).length === 0
}

function canMoveRight(rows: Row[], p: IPiece) {
    return p.filter(({ x, y }) => {
       if (x === limit.x.upper) return true
       if (rows[y][x + 1] === 1) return true
    }).length === 0
}

export function canMoveDown(rows: Row[], p: IPiece) {
    return p.filter(({ x, y }) => {
       if (y === limit.y.upper) return true
       if (rows[y + 1][x] === 1) return true
    }).length === 0
}

export function add(rows: Row[], p: IPiece): { rows: Row[], score: number } {
    p.map(({ x, y }) => rows[y][x] = 1)
    const filtered = rows.filter(r => !isFull(r))
    const score = rows.filter(r => isFull(r)).length
    const filler = getRows(1 + limit.y.upper - filtered.length)
    return { rows: filler.concat(filtered), score }

} 
