// @flow

import React from 'react'
import type { IRows } from '../Rows'
import type { IPiece } from '../Piece'
import * as Piece from '../Piece'
import { Col } from 'react-bootstrap'

type Props = {
  rows: IRows,
  piece: IPiece
}

const Board = (props: Props) => (
  <Col sm={4} smPush={4} >
    {props.rows.map((row, y) => (
      <p>
        {row.map(Piece.printTile(props.piece, y))}
      </p>
    ))}
  </Col>
)

export default Board