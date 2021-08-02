import { fetchGETPOSTPUTDELETEJSON } from '../helpers/fetch';
import { types } from '../types/types';

const eventAddNew = (event) => {
  return {
    type: types.addCalendar,
    payload: event,
  };
};

export const eventStartAddNew = (event, id) => {
  return async (dispatch) => {
    const resp = await fetchGETPOSTPUTDELETEJSON(
      `reservation/asignar/${id}`,
      event,
      'POST'
    );
    const body = await resp.json();

    try {
      dispatch(eventAddNew(event));
    } catch (error) {
      console.log(error);
    }
  };
};

const listEvents = () => {
  return {
    type: types.listCalendar,
    payload: {},
  };
};

export const eventStartList = () => {
  return async (dispatch) => {
    const resp = await fetchGETPOSTPUTDELETEJSON('timetable');
    const body = await resp.json();
    // const datos = await
    console.log(body);
    // try {
    //   dispatch(listEvents(event));
    // } catch (error) {
    //   console.log(error);
    // }
  };
};
