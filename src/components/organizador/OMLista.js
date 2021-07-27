import React from 'react';
import Modal from 'react-modal';
import { customStyles } from '../../helpers/tablaOpciones';

const OMLista = ({ modalList, setModalList }) => {
  const closeModal = () => {
    setModalList(false);
  };

  return (
    <Modal
      isOpen={modalList}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal organizador__modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      ariaHideApp={false}
    >
      <div className="container">
        <h3 className="title__modal">Visulizar</h3>
        <div className="row">
          <div className="col-12">
            <div>
              <label>Tipo de servicio</label>
            </div>
            <div>
              <label>Tipo de servicio</label>
            </div>
            <div>
              <label>Tipo de servicio</label>
            </div>
          </div>
          <div className="list-botones">
            <button className="botones" onClick={closeModal}>
              cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OMLista;
