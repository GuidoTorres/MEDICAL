import React from 'react';
import Modal from 'react-modal';
import { customStyles } from '../../../helpers/tablaOpciones';
// import { customStyles } from "../../../helpers/ModalStyles";

const EditarDatosTrabajador = ({ modalIsOpen, setIsOpen }) => {
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal corporativo_modaleditar"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Editar datos del trabajador</h3>
      <div className="container">
        <div className="corporativo__modales">
          <div>
            <label>Tipo de doc:</label>
            <input type="text" />
          </div>
          <div>
            <label>Tipo de doc:</label>
            <input type="text" />
          </div>
          <div>
            <label>Nombre:</label>
            <input type="text" />
          </div>
          <div>
            <label>Apellido:</label>
            <input type="text" />
          </div>
          <div>
            <label>Tipo de doc:</label>
            <input type="text" />
          </div>
        </div>
        <div className="list-botones">
          <button className="botones">Eliminar</button>
          <button className="botones">Aceptar</button>
        </div>
      </div>
    </Modal>
  );
};

export default EditarDatosTrabajador;
