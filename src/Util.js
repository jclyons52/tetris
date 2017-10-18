// @flow

export function rand <T>(items: T[]): T {
  return items[randInt(items.length)]
}

export function randInt(i: number) {
  return Math.floor(Math.random() * i)
}