import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { fetchGETPOSTPUTDELETEJSON } from '../../helpers/fetch';
import { customStyles } from '../../helpers/tablaOpciones';

const EmpresaAsignacion2 = ({ modalIsOpen, setIsOpen }) => {
  const [asignation, setAsignation] = useState([]);
  const [listclinica, setListclinica] = useState([]);
  const [formValues, setFormValues] = useState({
    date_attention: null,
    time_attention: Date.now(),
    service_id: null,
    clinic_id: null,
    persons: [
      {
        person_id: null,
        codebar: '',
      },
    ],
  });

  // const [arraPersonas, setArraPersonas] = useState({});
  // const listaPersonas = () => {
  //   employees.map((data, index) => {
  //     // console.log(index);
  //     return setArraPersonas([data]);
  //   });
  // };
  // useEffect(() => {
  //   listaPersonas();
  // }, []);

  const handleOnChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    // }
  };
  console.log(formValues);

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

  const envioPost = (data) => {
    // fetchGETPOSTPUTDELETEJSON('services', data, 'POST').then((data) =>
    //   data.json()
    // );
  };

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
      <h3 className="title__modal">Asignación de pruebas:</h3>
      <div className="asignacion2 container">
        <div>
          <div className=" mt-3">
            <label className="mt-3">2. Seleccione las pruebas a realizar</label>
            <div>
              <div className="">
                <label>Tipo de prueba </label>

                <select
                  className="form-select mt-2"
                  aria-label="Default select example"
                  name="service_id"
                  onChange={handleOnChange}
                >
                  <option>Seleccione</option>
                  {asignation.map((data, index) => {
                    return (
                      <option key={index} value={data.id}>
                        {data.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label>Fecha</label>
              <input
                type="date"
                onChange={handleOnChange}
                name="date_attention"
              />
            </div>
          </div>

          <div className="divider"></div>
          <div className="mt-3">
            <table className="table">
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
                        <i className="fas fa-map-marked-alt"></i>
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          name="clinic_id"
                          value={data.clinic_type_id}
                          onChange={handleOnChange}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="list-botones">
          <button type="button" className="botones" onClick={closeModal}>
            Cancelar
          </button>
          <button type="button" className="botones" onClick={envioPost}>
            Siguiente
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmpresaAsignacion2;
