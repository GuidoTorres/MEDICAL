import React from 'react';
import Modal from 'react-modal';
import { customStyles } from '../../../helpers/tablaOpciones';

const Comentarios = ({ modalIsOpen, setIsOpen, comentarios }) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      overlayClassName="modal-fondo"
      ariaHideApp={false}
    >
      <div className="container">
        <h3 className="title__modal">Comentarios</h3>
        <div>
          <div>
            <textarea
              rows="5"
              cols="50"
              disabled
              value={comentarios.observation}
            >
              {comentarios.observation}
            </textarea>
          </div>
          <div className="list-botones">
            <button type="button" className="botones" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Comentarios;
