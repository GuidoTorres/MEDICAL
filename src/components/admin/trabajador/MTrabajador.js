/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import Modal from 'react-modal';
import { fetchDNI, fetchGETPOSTPUTDELETE } from '../../../helpers/fetch';
import { customStyles } from '../../../helpers/tablaOpciones';
import { UploadAvatar } from '../../uploadAvatar/uploadAvatar';
import MRegistroEmpresa from '../registro/MRegistroEmpresa';
import ImagenTrabajador from '../../uploadAvatar/ImagenTrabajador';

const MTrabajador = ({
  openModal,
  setOpenModal,
  getEmployee,
  dataSelected,
  editar,
  setEditar,
  setDataSelected,
}) => {
  const [avatar, setAvatar] = useState(null);
  const [trabajador, setTrabajador] = useState({});
  const [dni, setDni] = useState({});

  const closeModal = () => {
    setOpenModal(false);
    setEditar(false);
    setDataSelected({});
  };

  const getDni = () => {
    fetchDNI(trabajador.dni, 'GET')
      .then((res) => res.json())
      .then((res) => setDni(res));
  };

  console.log(trabajador);

  useEffect(() => {
    if (trabajador && trabajador.dni && trabajador.dni.length === 8) {
      getDni();
    }
  }, [trabajador.dni]);
  console.log(trabajador);
  console.log(dni);

  const postEmployee = () => {
    const formData = new FormData();
    formData.set('dni', trabajador.dni || '');
    formData.set('name', dni.nombres || trabajador.name || '');
    formData.set(
      'pat_lastname',
      dni.apellidoPaterno || trabajador.pat_lastname || ''
    );
    formData.set(
      'mom_lastname',
      dni.apellidoMaterno || trabajador.mom_lastname || ''
    );
    formData.set('email', trabajador.email || '');
    formData.set('cellphone', trabajador.cellphone || '');
    formData.set('photo', avatar && avatar.file ? avatar.file : '');
    formData.set('role_id', trabajador.role_id || '');

    if (trabajador.role_id === '5') {
      formData.set('vehicle_name', trabajador.vehicle_name || '');
      formData.set('license_plate', trabajador.license_plate || '');
    }

    // if (trabajador.dni !== "" || null) {
    fetchGETPOSTPUTDELETE('employees', formData, 'POST').then((resp) => {
      if (resp.status === 201) {
        closeModal();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se ha creado el trabajador correctamente.',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        }).then((resp) => {
          if (resp.isConfirmed) {
            getEmployee();
          }
        });
      } else {
        closeModal();
        Swal.fire({
          icon: 'error',
          title: 'Ups¡',
          text: 'Algo salió mal.',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Cerrar',
        });
      }
    });
    // }
  };
  console.log(trabajador);

  const putEmployee = () => {
    const formData = new FormData();
    formData.set('dni', dataSelected.dni);
    formData.set('name', trabajador.name || dataSelected.name);
    formData.set(
      'pat_lastname',
      trabajador.pat_lastname || dataSelected.pat_lastname
    );
    formData.set(
      'mom_lastname',
      trabajador.mom_lastname || dataSelected.mom_lastname
    );
    formData.set('email', trabajador.email || dataSelected.email);
    formData.set('cellphone', trabajador.cellphone || dataSelected.cellphone);
    formData.set('photo', avatar && avatar.file ? avatar.file : '');
    formData.set('role_id', trabajador.role_id);
    fetchGETPOSTPUTDELETE(
      `employees/${dataSelected.user_id}?_method=PUT`,
      formData,
      'POST'
    ).then((resp) => {
      if (resp.status === 200) {
        closeModal();
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se ha actualizó el trabajador correctamente.',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
        }).then((resp) => {
          if (resp.isConfirmed) {
            getEmployee();
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
    });
  };

  const handleOnChange = (e) => {

    setTrabajador({
      ...trabajador,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className='modal modal__trabajador'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      {editar ? (
        <h3 className='title__modal'>Editar Responsable</h3>
      ) : (
        <h3 className='title__modal'>Registrar Responsable</h3>
      )}
      <div className='container'>
        <form className='row mt-3' onSubmit={handleSubmit}>
          <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mregistro__trabajador'>
            <div className=''>
              <div>
                <label>DNI:</label>
                <input
                  type='text'
                  name='dni'
                  id='dni'
                  disabled={editar ? true : false}
                  defaultValue={
                    dataSelected && dataSelected.dni ? dataSelected.dni : ''
                  }
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label>Nombre:</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  defaultValue={
                    editar
                      ? dataSelected && dataSelected.name
                        ? dataSelected.name
                        : ''
                      : dni.nombres
                  }
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label>A. Paterno:</label>
                <input
                  type='text'
                  name='pat_lastname'
                  id='apellido1'
                  defaultValue={
                    editar
                      ? dataSelected && dataSelected.pat_lastname
                        ? dataSelected.pat_lastname
                        : ''
                      : dni.apellidoPaterno
                  }
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label>A. Materno:</label>
                <input
                  type='text'
                  name='mom_lastname'
                  id='apellido2'
                  defaultValue={
                    editar
                      ? dataSelected && dataSelected.mom_lastname
                        ? dataSelected.mom_lastname
                        : ''
                      : dni.apellidoMaterno
                  }
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label>Correo:</label>
                <input
                  type='text'
                  name='email'
                  id='email'
                  defaultValue={
                    dataSelected && dataSelected.email ? dataSelected.email : ''
                  }
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label>Teléfono:</label>
                <input
                  type='text'
                  name='cellphone'
                  id='cell'
                  defaultValue={
                    dataSelected && dataSelected.cellphone
                      ? dataSelected.cellphone
                      : ''
                  }
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label>Tipo trabajador:</label>
                <select
                  className='form-select'
                  aria-label='Default select example'
                  name='role_id'
                  id='role'
                  onChange={handleOnChange}
                >
                  <option value=''>Seleccionar</option>
                  <option
                    value='4'
                    selected={
                      dataSelected && dataSelected.type === 'Coordinador'
                        ? true
                        : false
                    }
                  >
                    Coordinador
                  </option>
                  <option
                    value='5'
                    selected={
                      dataSelected && dataSelected.type === 'Repartidor'
                        ? true
                        : false
                    }
                  >
                    Transportista
                  </option>
                  <option
                    value='8'
                    selected={
                      dataSelected && dataSelected.type === 'Laboratorio'
                        ? true
                        : false
                    }
                  >
                    Laboratorista
                  </option>
                  <option
                    value='9'
                    selected={
                      dataSelected && dataSelected.type === 'Recepción'
                        ? true
                        : false
                    }
                  >
                    Recepcionista
                  </option>
                  <option
                    value='10'
                    selected={
                      dataSelected && dataSelected.type === 'Facturación'
                        ? true
                        : false
                    }
                  >
                    Facturador
                  </option>
                  <option
                    value='12'
                    selected={
                      dataSelected && dataSelected.type === 'Facturación'
                        ? true
                        : false
                    }
                  >
                    Ventas
                  </option>
                </select>
              </div>
              {trabajador && trabajador.role_id === '5' ? (
                <>
                  <div>
                    <label>Tipo de vehículo:</label>
                    <input
                      type='text'
                      name='vehicle_name'
                      // defaultValue={
                      //   dataSelected && dataSelected.cellphone
                      //     ? dataSelected.cellphone
                      //     : ""
                      // }
                      onChange={handleOnChange}
                    />
                  </div>
                  <div>
                    <label>Placa:</label>
                    <input
                      type='text'
                      name='license_plate'
                      // defaultValue={
                      //   dataSelected && dataSelected.cellphone
                      //     ? dataSelected.cellphone
                      //     : ""
                      // }
                      onChange={handleOnChange}
                    />
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mregistro__trabajador'>
            <div className='mregistro__ubicacion'>
              <div className='icons'>
                <p>Fotografía</p>
              </div>
            </div>
            <div className='mregistro__logo'>
              <p>
                Imagen <span>(.jpg, .jpeg, .jpg)</span>
              </p>
              <div>
                <ImagenTrabajador
                  avatar={avatar}
                  setAvatar={setAvatar}
                  dataSelected={dataSelected}
                  editar={editar}
                />
              </div>
            </div>

            <div className='list-botones'>
              <button className='botones' onClick={closeModal}>
                Cancelar
              </button>
              {editar === true ? (
                <button className='botones' onClick={putEmployee}>
                  Editar
                </button>
              ) : (
                <button className='botones' onClick={postEmployee}>
                  Agregar
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default MTrabajador;
