import { types } from '../types/types';

const initialState = {
  listOrganizador: {},
};

const organizadorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.organizador:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export { organizadorReducer };
