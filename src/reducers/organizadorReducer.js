import { types } from '../types/types';

// const initialState = {
//   listOrganizador: {},
// };

const organizadorReducer = (state = {}, action) => {
  switch (action.type) {
    case types.organizador:
      return {
        selectionId: action.payload.selectionId,
      };

    default:
      return state;
  }
};

export { organizadorReducer };
