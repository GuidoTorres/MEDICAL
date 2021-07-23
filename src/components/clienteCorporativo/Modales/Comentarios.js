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
      ariaHideApp={false}
    >
      <div className="container">
        <h3 className="title__modal">Comentarios</h3>
        <div>
          <div>
            <textarea rows="10" cols="40" disabled>
              {comentarios.observation}
            </textarea>
            <div className="lista__botones">
              <button type="button" className="botones" onClick={closeModal}>
                Cancelar
              </button>
              <button type="button" className="botones">
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Comentarios;
