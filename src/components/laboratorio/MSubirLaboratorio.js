import React from 'react';
import Modal from 'react-modal';

import { customStyles } from '../../helpers/tablaOpciones';

const MSubirLaboratorio = ({ openModal, setOpenModal }) => {
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal mlaboratorio_subir"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal mb-3">Cargar resultado</h3>
      <div className="container">
        <div className="row">
          <div className="col-12 mlaboratorio_cargar ">
            <p>Datos del paciente</p>
            <div>
              <div>
                <label>DNI:</label>
                <label>123464578</label>
              </div>
              <div>
                <label>Nombre</label>
                <label>Jorge luis ttito carazas</label>
              </div>
              <div>
                <label>Tipo de usuario</label>
                <label>Jorge luis ttito carazas</label>
              </div>
            </div>
            <p>Datos del paciente</p>
            <div>
              <div>
                <label>El resultado de la prueba es:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option>Seleccione</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="list-botones">
              <button className="botones">Cancelar</button>
              <button className="botones">Visualizar</button>
              <button className="botones">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MSubirLaboratorio;
