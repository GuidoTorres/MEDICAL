import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { calendarioReducer } from './calendarioReducer';
import { organizadorReducer } from './organizadorReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  organizador: organizadorReducer,
  calendario: calendarioReducer,
});

export { rootReducer };
