import React from 'react';
import Modal from 'react-modal';

import { customStyles } from '../../../helpers/tablaOpciones';

const MDescargar = ({ setOpenHModal, openHModal }) => {
  const closeModal = () => {
    setOpenHModal(false);
  };
  return (
    <Modal
      isOpen={openHModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__hprecio"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Descargar Historial de precios</h3>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 mregistro__servicios">
            <div className="">
              <div>
                <label>Fecha inicio:</label>
                <input type="date" />
              </div>
              <div>
                <label>Fecha final:</label>
                <input type="date" />
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

export default MDescargar;
