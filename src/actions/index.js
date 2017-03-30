export const addNewObject = (object) => {
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
