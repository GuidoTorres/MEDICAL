import React from 'react';
import Modal from 'react-modal';
import { customStyles } from '../../helpers/tablaOpciones';

const OMLista = ({ modalList, setModalList, listRegistro }) => {
  const closeModal = () => {
    setModalList(false);
  };
  // console.log(listRegistro);
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
        <h3 className="title__modal">Servicios</h3>
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    {/* <th scope="col"></th> */}
                    <th scope="col">Tipo servicio</th>
                    <th scope="col">Plan de atenciones</th>
                    <th scope="col">N Atenciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {listRegistro.sampĺe.map((datos) => {
                    console.log(datos);
                  })} */}
                  {console.log(listRegistro.sample)}
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  {/* <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr> */}
                </tbody>
              </table>
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
