import React from 'react';
import Modal from 'react-modal';

import { customStyles } from '../../../helpers/tablaOpciones';

const MServicio = ({ openModal, setOpenModal }) => {
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__servicio"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Editar servicio</h3>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 mregistro__servicios">
            <div className="">
              <div>
                <label> Nombre:</label>
                <input type="text" />
              </div>
              <div>
                <label> Abreviatura:</label>
                <input type="text" />
              </div>
              <div>
                <label> Abreviatura:</label>
                <input type="text" />
              </div>
              <div>
                <label> Abreviatura:</label>
                <input type="text" />
              </div>
            </div>
            <div className="list-botones">
              <button className="botones ">Cancelar</button>
              <button className="botones ">Descargar</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MServicio;
