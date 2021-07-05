import React from 'react';
import Modal from 'react-modal';
import { customStyles } from '../../../helpers/tablaOpciones';

const MUsuario = ({ openModal, setOpenModal }) => {
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__usuario"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Editar Usuario</h3>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 mregistro__usuario">
            <div className="usuario">
              <div>
                <label>Tipo de documento</label>
                <input type="text" />
              </div>
              <div>
                <label>Número de documento</label>
                <input type="text" />
              </div>
              <div>
                <label>Tipo de usuario</label>
                <input type="text" />
              </div>
              <div>
                <label>Empresa</label>
                <input type="text" />
              </div>
              <div>
                <label>Teléfono</label>
                <input type="text" />
              </div>
              <div>
                <label>Correo</label>
                <input type="text" />
              </div>
              <div>
                <label>Generar actividad</label>
                <input type="text" />
              </div>
            </div>
            <button className="botones">Editar</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MUsuario;
