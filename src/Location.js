// @flow

import type { IRow } from './Rows'
import { rand } from './Util'

export type Point = { x: number, y: number }

type Limit = {
    y: { upper: number, lower: number },
    x: { upper: number, lower: number }
}

export default class Location {

    points: Point[]

    limit: Limit

    constructor(points: Point[], limit: Limit) {
        this.points = points
        this.limit = limit
    }

    static generate = (): Location => {
        const l = (x, y) => ({ x, y })
        const shapes = [
            [l(0, 0), l(0, 1), l(1, 0), l(1, 1)],
            [l(0, 0), l(0, 1), l(0, 2), l(0, 3)],
            [l(0, 0), l(0, 1), l(1, 1), l(0, 2)],
            [l(0, 0), l(0, 1), l(1, 2), l(0, 2)],
            [l(0, 0), l(0, 1), l(0, 2), l(1, 0)],
        ]
        return new Location(rand(shapes), {
            y: { upper: 17, lower: 0 },
            x: { upper: 9, lower: 0 }
        })
    }

    rotate = (): Location => {
        const relative = locToArr(this.points[1])
        const newPiece = this.points.map(loc => {
            const arr = diff(locToArr(loc), relative)
            const rotated = [-1 * arr[1], 1 * arr[0]]
            const n = sum(rotated, relative)
            return { x: n[0], y: n[1] }
        })

        const getRequiredShifts = (bounds) => {
            return {
                x: (() => {
                    if (bounds.x.max > this.limit.x.upper) {
                        return this.limit.x.upper - bounds.x.max;
                    }
                    if (bounds.x.min < this.limit.x.lower) {
                        return - bounds.x.min;
                    }
                    return 0
                })(),
                y: (() => {
                    if (bounds.y.max > this.limit.y.upper) {
                        return this.limit.y.upper - bounds.y.max;
                    }
                    if (bounds.y.min < this.limit.y.lower) {
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

        const shift = (() => {
            const bounds = getBounds(newPiece)
            return getRequiredShifts(bounds)
        })()

        const pieces = newPiece.map(({ x, y }) => ({ x: x + shift.x, y: y + shift.y }))
        return new Location(pieces, this.limit)
    }

    moveDown = (): Location => {
        const shift = ({ x, y }) => ({ y: y + 1, x })
        if (this.atBottomLimit()) {
            return new Location(this.points, this.limit)
        }
        return new Location(this.points.map(shift), this.limit)
    }

    moveLeft = (rows: IRow[]): Location => {
        const shift = ({ x, y }) => ({ x: x - 1, y })
        if (this.canMoveLeft(rows)) {
            return new Location(this.points.map(shift), this.limit)
        }
        return new Location(this.points, this.limit)
    }

    moveRight = (rows: IRow[], ): Location => {
        const shift = ({ x, y }) => ({ x: x + 1, y })
        if (this.canMoveRight(rows)) {
            return new Location(this.points.map(shift), this.limit)
        }
        return new Location(this.points, this.limit)
    }

    atLeftLimit = (): boolean => {
        return this.points.filter(({ x }) => x === this.limit.x.lower).length > 0
    }

    atRightLimit = (): boolean => {
        return this.points.filter(({ x }) => x === this.limit.x.upper).length > 0
    }

    atTopLimit = (): boolean => {
        return this.points.filter(({ y }) => y === this.limit.y.lower).length > 0
    }

    overTopLimit = (): boolean => {
        return this.points.filter(({ y }) => y > this.limit.y.upper).length > 0
    }

    atBottomLimit = (): boolean => {
        return this.points.filter(({ y }) => y === this.limit.y.upper).length > 0
    }

    isFull = (row: IRow): boolean => {
        return row.filter(i => !i.full).length === 0
    }

    isOverlapping = (rows: IRow[]): boolean => {
        return this.points.filter(({ x, y }) => rows[y][x].full).length > 0
    }

    canMoveDown = (rows: IRow[]): boolean => {
        return this.points.filter(({ x, y }) => {
            if (y === this.limit.y.upper) return true
            if (rows[y + 1][x].full) return true
            return false
        }).length === 0
    }

    canMoveLeft = (rows: IRow[]): boolean => {
        return this.points.filter(({ x, y }) => {
            if (x === this.limit.x.lower) return true
            if (rows[y][x - 1].full) return true
            return false
        }).length === 0
    }

    canMoveRight = (rows: IRow[]): boolean => {
        return this.points.filter(({ x, y }) => {
            if (x === this.limit.x.upper) return true
            if (rows[y][x + 1].full) return true
            return false
        }).length === 0
    }
}
