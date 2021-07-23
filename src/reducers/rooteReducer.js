import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { organizadorReducer } from './organizadorReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  organizador: organizadorReducer,
});

export { rootReducer };
