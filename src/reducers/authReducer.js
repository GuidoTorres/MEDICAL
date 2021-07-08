import { types } from '../types/types';

const initialState = {
  checking: true,
  isAuthenticated: false,
  rol: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        isAuthenticated: true,
        checking: false,
        ...action.payload,
      };
    // case types.authCheckingFinish:
    //   return {
    //     ...state,
    //     checking: false,
    //   };
    // case types.authLogout:
    //   return {
    //     checking: false,
    //   };
    default:
      return state;
  }
};

export { authReducer };
