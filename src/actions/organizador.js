// import { fetchGETPOSTPUTDELETEJSON } from '../helpers/fetch';
import { types } from '../types/types';

// const listarOrganizador = (e) => {
//   return async (dispatch) => {
//     const resp = await fetchGETPOSTPUTDELETEJSON(`reservation/get/${e.id}`);
//     const body = await resp.json();
//     console.log(body);
//     // console.log('hola');
//   };
// };

const listaPacient = (selectionId) => {
  return {
    type: types.organizador,
    payload: {
      selectionId,
    },
  };
};

export { listaPacient };
// fetchGETPOSTPUTDELETEJSON(`reservation/get/${e.id}`)
//   .then((data) => data.json())
//   .then((resultados) => setListRegistro(resultados));
