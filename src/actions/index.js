export const addObject = (object) => {
    return {
      type: 'ADD_OBJECT',
      payload: {obj: object}
    };
};

export const modifyObject = (object) => {
    return {
      type: 'MODIFY_OBJECT',
      payload: {obj: object}
    };
};

export const deleteObject = (object) => {
    return {
      type: 'DELETE_OBJECT',
      payload: {obj: object}
    };
};

export const boardUpdated = () => {
    return {
      type: 'BOARD_UPDATED'
    };
};

export const sendAction = (action, payload) => {
    return {
      type: 'REQUEST',
      action: action,
      payload: payload
    }
};

export const setOptions = (payload) => {
    return {
      type: 'SET_OPTIONS',
      payload: {obj: payload}
    }
};
