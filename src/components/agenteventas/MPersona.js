/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { customStyles } from '../../helpers/tablaOpciones';
import { fetchDNI, fetchGETPOSTPUTDELETEJSON } from '../../helpers/fetch';

const MPersona = ({
  openModal,
  setOpenModal,
  dataSelected,
  setDataSelected,
  editar,
  setEditar,
  getParticularDiscount,
}) => {
  const [persona, setPersona] = useState({
    name: '',
    pat_lastname: '',
  });
  const [services, setServices] = useState({});
  const [dni, setDni] = useState({});

  const closeModal = () => {
    setOpenModal(false);
    setEditar(false);
    setDataSelected(null);
  };

  const handleChange = (e) => {
    setPersona({
      ...persona,
      name: dni.nombres || e.target.value,
      pat_lastname:
        dni.apellidoPaterno + ' ' + dni.apellidoMaterno || e.target.value,
      [e.target.name]: e.target.value,
    });
  };

  const getDni = () => {
    fetchDNI(persona.dni, 'GET')
      .then((res) => res.json())
      .then((res) => setDni(res));
  };

  useEffect(() => {
    if (persona && persona.dni && persona.dni.length === 8) {
      getDni();
    }
  }, [persona.dni, dataSelected]);

  // console.log(dni);
  // console.log(persona);

  const getServices = () => {
    fetchGETPOSTPUTDELETEJSON('services')
      .then((res) => res.json())
      .then((res) => setServices(res.data));
  };

  useEffect(() => {
    getServices();
  }, []);

  const crearDescuentoParticular = () => {
    fetchGETPOSTPUTDELETEJSON('particular_discount', persona, 'POST').then(
      (res) => {
        if (res.status === 200) {
          closeModal();
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Se creó correctamente.',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
          }).then((resp) => {
            if (resp.isConfirmed) {
              getParticularDiscount();
            }
          });
        } else {
          closeModal();
          Swal.fire({
            icon: 'error',
            title: '!Ups¡',
            text: 'Algo salió mal.',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cerrar',
          });
        }
      }
    );
  };

  const actualizarDescuentoParticular = () => {
    const actualizar = {
      dni: persona.dni || dataSelected.user.person.dni,
      document_type_id:
        persona.document_type_id || dataSelected.user.person.document_type_id,
      name: persona.name || dataSelected.user.person.name,
      pat_lastname:
        persona.pat_lastname || dataSelected.user.person.pat_lastname,
      mom_lastname:
        persona.mom_lastname || dataSelected.user.person.mom_lastname,
      percent: persona.percent || dataSelected.percent,
      quantity: persona.quantity || dataSelected.quantity,
      service_id: persona.service_id || dataSelected.service_id,
      amount: persona.amount || dataSelected.amount,
    };

    fetchGETPOSTPUTDELETEJSON('particular_discount', actualizar, 'POST').then(
      (res) => {
        if (res.status === 200) {
          closeModal();
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Se creo el descuento particular correctamente.',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
          }).then((resp) => {
            if (resp.isConfirmed) {
              getParticularDiscount();
            }
          });
        } else {
          closeModal();
          Swal.fire({
            icon: 'error',
            title: '!Ups¡',
            text: 'Algo salió mal.',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cerrar',
          });
        }
      }
    );
  };

  console.log(dataSelected);
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__persona"
      closeTimeoutMS={200}
      preventScroll={true}
      overlayClassName="modal-fondo"
      ariaHideApp={false}
    >
      {editar ? (
        <h3 className="title__modal mb-3">Editar precio particular</h3>
      ) : (
        <h3 className="title__modal mb-3">Precio particular</h3>
      )}
      <div className="container">
        <div className="row">
          <div className="col-12 mventas__persona">
            <p>
              <strong>Tipo de paciente</strong>
            </p>
            <div className="mt-2">
              <div>
                <label>Tipo de documento</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="document_type_id"
                  onChange={(e) => handleChange(e)}
                  style={{ width: '163px' }}
                >
                  <option selected>Seleccione</option>
                  <option value="1">DNI</option>
                  <option value="2">Pasaporte</option>
                  <option value="3">Carne de extranjeria</option>
                </select>
              </div>
              <div>
                <label>Número de documento</label>
                <input
                  type="number"
                  name="dni"
                  maxLength="8"
                  defaultValue={
                    dataSelected &&
                    dataSelected.user &&
                    dataSelected.user.person &&
                    dataSelected.user.person.dni
                      ? dataSelected.user.person.dni
                      : ''
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {/* <div>
                <label>Estado</label>
                <input
                  type="text"
                  name="document_type_id"
                  onChange={(e) => handleChange(e)}
                />
              </div> */}
              <div>
                <label>Nombres</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={
                    dni && dni.nombres
                      ? dni.nombres
                      : dataSelected &&
                        dataSelected.user &&
                        dataSelected.user.person &&
                        dataSelected.user.person.name
                      ? dataSelected.user.person.name
                      : ''
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label>Apellidos</label>
                <input
                  type="text"
                  name="pat_lastname"
                  defaultValue={
                    dni && dni.apellidoPaterno && dni.apellidoMaterno
                      ? dni.apellidoPaterno + ' ' + dni.apellidoMaterno
                      : dataSelected &&
                        dataSelected.user &&
                        dataSelected.user.person &&
                        dataSelected.user.person.pat_lastname
                      ? dataSelected.user.person.pat_lastname
                      : ''
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <p>
              <strong>Datos de descuento</strong>
            </p>
            <div className="mt-2">
              <div>
                <label>Prueba solicitada</label>

                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="service_id"
                  defaultValue={
                    dataSelected &&
                    dataSelected.service &&
                    dataSelected.service.id
                      ? dataSelected.service.id
                      : ''
                  }
                  onChange={(e) => handleChange(e)}
                  style={{ width: '163px' }}
                >
                  <option selected>Seleccione</option>
                  <option value="5">Antígeno</option>
                  <option value="6">Electroquimioluminiscencia</option>
                  <option value="7">Inmunocromatografia</option>
                  <option value="8">RT-PCR</option>
                </select>
              </div>
              <div>
                <label>Porcentaje descuento</label>
                <input
                  type="number"
                  name="percent"
                  defaultValue={
                    dataSelected && dataSelected.percent
                      ? dataSelected.percent
                      : ''
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label>Monto</label>
                <input
                  type="number"
                  name="amount"
                  defaultValue={
                    dataSelected && dataSelected.amount
                      ? dataSelected.amount
                      : ''
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label>Número de pruebas(des)</label>
                <input
                  type="number"
                  name="quantity"
                  defaultValue={
                    dataSelected && dataSelected.quantity
                      ? dataSelected.quantity
                      : ''
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="list-botones">
              <button className="botones" onClick={closeModal}>
                Cancelar
              </button>

              {editar ? (
                <button
                  className="botones"
                  onClick={actualizarDescuentoParticular}
                >
                  Editar
                </button>
              ) : (
                <button className="botones" onClick={crearDescuentoParticular}>
                  Agregar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MPersona;
