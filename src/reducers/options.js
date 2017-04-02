import _ from 'lodash'
var initialState = {
  options: []
}

function options(state = initialState, action) {
  switch (action.type) {
    case 'SET_OPTIONS':
      var {obj} = action.payload;
      return {
        options: obj.options,
      };
    default:
      return state;
  }
}

export default options;
