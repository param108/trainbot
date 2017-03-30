import _ from 'lodash'
var initialState = {
  objects: [],
  dirty: false
}

function board(state = initialState, action) {
  switch (action.type) {
    case 'ADD_OBJECT':
      var {obj} = action.payload;
      var newobjects = _.filter(state.objects,(object) => { if (obj.id === object.id) {
          return false;
        } else {
          return true;
        }
      });
      newobjects.push(obj);
      return {
        objects: newobjects,
        dirty: true
      };
    default:
      return state;
  }
}

export default board;
