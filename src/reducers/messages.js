import _ from 'lodash'
var initialState = {
  messages: [],
  dirty: false
}

function messages(state = initialState, action) {

  switch (action.type) {
    case 'ADD_MESSAGE':
      var {obj} = action.payload;
      var newmessages = state.messages;
      newmessages.push(obj);
      return {
        messages: newmessages,
        dirty: true
      };
    default:
      return state;
  }
}

export default messages;
