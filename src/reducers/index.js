import { combineReducers } from 'redux'
import board from './board'
import messages from './messages'
import moves from './moves'

const appReducers = combineReducers({
  board,
  messages,
  moves
});

export default appReducers
