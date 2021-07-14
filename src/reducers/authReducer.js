import { types } from '../types/types';

const initialState = {
  isAuthenticated: false,
  role: { id: 0, name: null },
  clinic_type: { id: 0, detail: null },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case types.authCheckingFinish:
      return {
        ...state,
        isAuthenticated: true,
      };
    case types.authLogout:
      return {
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export { authReducer };
