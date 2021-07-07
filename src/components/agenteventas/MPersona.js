import React from 'react';
import Modal from 'react-modal';

import { customStyles } from '../../helpers/tablaOpciones';

const MPersona = ({ openModal, setOpenModal }) => {
  const closeModal = () => {
    setOpenModal(false);
  };
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
      <h3 className="title__modal mb-3">Usuario particular</h3>
      <div className="container">
        <div className="row">
          <div className="col-12 mventas__persona">
            <p><strong>Tipo de paciente</strong></p>
            <div className="mt-2">
              <div>
                <label>Tipo de documento</label>
                <input type="text" />
              </div>
              <div>
                <label>Número de documento</label>
                <input type="text" />
              </div>
              <div>
                <label>Estado</label>
                <input type="text" />
              </div>
            </div>
            <p><strong>Datos de descuento</strong></p>
            <div className="mt-2">
              <div>
                <label>Prueba solicitada</label>
                <input type="text" />
              </div>
              <div>
                <label>Porcentaje documento</label>
                <input type="text" />
              </div>
              <div>
                <label>Monto</label>
                <input type="text" />
              </div>
              <div>
                <label>Número de pruebas(des)</label>
                <input type="text" />
              </div>
            </div>
            <div className="list-botones">
              <button className="botones">Cancelar</button>
              <button className="botones">Agregar</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MPersona;
