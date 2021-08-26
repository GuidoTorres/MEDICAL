import React, { useEffect } from 'react';
import { useState } from 'react';
import { fetchGETPOSTPUTDELETEJSON } from '../../helpers/fetch';
const Perfil = () => {
  const [lista, setLista] = useState({});

  const listaPersonal = () => {
    fetchGETPOSTPUTDELETEJSON('auth/me')
      .then((response) => response.json())
      .then((response) => setLista(response));
  };

  useEffect(() => {
    listaPersonal();
  }, []);
  return (
    <div className='container'>
      <div className='row'>
        <h3>Horarios disponibles</h3>
        <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
          <div className='barra procesa__perfil'>
            <h6>Organizador</h6>
            <div>
              <label>Nombre: </label>
              <input
                type='text'
                disabled
                placeholder='Jorge Luis ttito '
                defaultValue={lista.name + ' ' + lista.pat_lastname}
              />
            </div>
            <div>
              <label>Teléfono: </label>
              <input
                type='text'
                disabled
                placeholder='987654321'
                defaultValue={lista.cellphone}
              />
            </div>
            <label>Distritos asignados: </label>
            <div>
              <ul>
                <li>SJL</li>
                <li>SJM</li>
                <li>Comas</li>
                <li>Ate</li>
                <li>SJL</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6'>
          <div className='barra'>
            <h5>Fotografía</h5>
            <div className='procesa__perfil-img'>
              <img src={lista.photo} alt={lista.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
