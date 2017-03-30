import _ from 'lodash'
var initialState = {
  moves: [],
  dirty: false
}

function moves(state = initialState, action) {

  switch (action) {
    case 'ADD_MOVES':
      var {obj} = action.payload;
      var newmoves = state.moves;
      newmoves.push(obj);
      return {
        moves: newmoves,
        dirty: true
      };
    default:
      return state;
  }
}

export default moves;
