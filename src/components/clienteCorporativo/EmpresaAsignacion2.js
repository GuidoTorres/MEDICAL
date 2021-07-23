import React, { useEffect, useState } from 'react';
// import mapa from '../../assets/images/icon_mapa.png'
import Modal from 'react-modal';

import { useHistory } from 'react-router-dom';
import { fetchGETPOSTPUTDELETEJSON } from '../../helpers/fetch';
import { customStyles } from '../../helpers/tablaOpciones';

const EmpresaAsignacion2 = ({ modalIsOpen, setIsOpen, employees }) => {
  let history = useHistory();

  const [asignation, setAsignation] = useState([]);
  const [listclinica, setListclinica] = useState([]);
  const [valoresInput, setValoresInput] = useState({
    date_attention: '',
    time_attention: '',
    service_id: null,
    clinic_id: null,
    persons: [
      {
        person_id: null,
        codebar: '',
      },
    ],
  });

  const pruebasignacion = () => {
    fetchGETPOSTPUTDELETEJSON('services')
      .then((data) => data.json())
      .then((datos) => setAsignation(datos.data[0].services));
  };

  useEffect(() => {
    pruebasignacion();
  }, []);

  const clinicalist = () => {
    fetchGETPOSTPUTDELETEJSON('clinics')
      .then((data) => data.json())
      .then((datos) => setListclinica(datos.data));
  };

  useEffect(() => {
    clinicalist();
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };
  console.log(asignation);

  const obtenerData = (e) => {
    setValoresInput({ ...valoresInput, [e.target.name]: e.target.value });
  };

  console.log(valoresInput);
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__corporativopruebas"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="titulo">Asignación de pruebas:</h3>
      <div className="asignacion2 container">
        <div>
          <div className=" mt-3">
            <label className="mt-3">
              2. Seleccione las pruebas a realizar{' '}
            </label>
            <div>
              <div className="">
                <label>Tipo de prueba </label>

                <select
                  class="form-select mt-2"
                  aria-label="Default select example"
                  name="tipoprueba"
                  onChange={obtenerData}
                >
                  {asignation.map((data, index) => {
                    return (
                      <option key={index} value={data.name}>
                        {data.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="divider"></div>
          <div className="mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Direccion</th>
                  <th scope="col">ubicacion</th>
                  <th scope="col">seleccionar</th>
                </tr>
              </thead>
              <tbody>
                {listclinica.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.corporation.contacts[0].name}</td>
                      <td>{data.corporation.address.address}</td>
                      <td>
                        <i class="fas fa-map-marked-alt"></i>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name="tipocheckbox"
                          onChange={obtenerData}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="containerBtn">
          <button
            type="button"
            class="botones"
            onClick={(e) => history.push('/empresa/asignacion3')}
          >
            Siguiente
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmpresaAsignacion2;
