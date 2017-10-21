// @flow

import React from 'react'
import { Col, Panel } from 'react-bootstrap'

type Props = {
  highScores: number[]
}

const ScoreBoard = (props: Props) => (
  <Col sm={4} smPush={4}>
    <Panel header="High Scores">
      <ul>
        {props.highScores.map(s => <li>{s}</li>)}
      </ul>
    </Panel>
  </Col>
)

export default ScoreBoard
