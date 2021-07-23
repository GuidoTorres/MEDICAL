import React from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { customStyles } from '../../helpers/tablaOpciones';

const OMLista = ({ modalList, setModalList, listRegistro }) => {
  const history = useHistory();
  console.log(listRegistro);
  const closeModal = () => {
    setModalList(false);
  };
  const siguiente = () => {
    history.push('/organizador/calendario');
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
          {/* {JSON.stringify(listRegistro)} */}
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
            <button className="botones" onClick={siguiente}>
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OMLista;
