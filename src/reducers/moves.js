import _ from 'lodash'
var initialState = {
  moves: [{ src: 'img/left.png',
              value: 'LEFT',
            },
            { src: 'img/right.png',
              value: 'RIGHT',
            },
            { src: 'img/up.png',
              value: 'UP',
            },
            { src: 'img/down.png',
              value: 'DOWN',
            }],
  dirty: false
}

function moves(state = initialState, action) {

  switch (action.type) {
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
