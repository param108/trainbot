import { combineReducers } from 'redux'
import board from './board'
import messages from './messages'
import moves from './moves'
import options from './options'

const appReducers = combineReducers({
  board,
  messages,
  moves,
  options
});

export default appReducers
