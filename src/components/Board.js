// @flow

import React from 'react'
import type { IRows } from '../Rows'
import Piece from '../Piece'
import { Col } from 'react-bootstrap'

type Props = {
  rows: IRows,
  piece: ?Piece,
  push?: number
}

const Board = (props: Props) => (
  <Col sm={4} smPush={props.push ? props.push : 4} >
    {props.rows.map((row, y) => (
      <p>
        {row.map(Piece.printTile(props.piece, y))}
      </p>
    ))}
  </Col>
)

export default Board