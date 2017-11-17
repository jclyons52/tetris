// @flow

import { combineReducers } from "redux"
import tetris from '../tetris/reducers/TetrisReducer'
import snake from '../snake/reducers/SnakeReducer'

export default combineReducers({ tetris, snake })
