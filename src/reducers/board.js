import _ from 'lodash'
var initialState = {
  objects: [],
  dirty: false
}

function board(state = initialState, action) {
  var newobjects = [];
  var obj = {};
  switch (action.type) {
    case 'ADD_OBJECT':
      obj = action.payload.obj;
      newobjects = _.filter(state.objects,(object) => { if (obj.id === object.id) {
          return false;
        } else {
          return true;
        }
      });
      newobjects = _.concat(newobjects, [obj]);
      return {
        objects: newobjects,
        dirty: true
      };
    case 'DELETE_OBJECT':
      obj = action.payload.obj;
      newobjects = _.filter(state.objects,(object) => { if (obj.id === object.id) {
          return false;
        } else {
          return true;
        }
      });
      return {
        objects: newobjects,
        dirty: true
      };
    case 'BOARD_UPDATED':
      return {
        ...state,
        dirty: false
      }
    default:
      return state;
  }
}

export default board;
