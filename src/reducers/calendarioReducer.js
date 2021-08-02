import { types } from '../types/types';

const initialState = {
  events: [],
  listEventos: [],
};

const calendarioReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.addCalendar:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case types.listCalendar:
      return {
        ...state,
        listEventos: [...state.events, action.payload],
      };

    default:
      return state;
  }
};

export { calendarioReducer };
