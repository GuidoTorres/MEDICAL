import React, { useState } from "react";
import Modal from "react-modal";
import { fetchGETPOSTPUTDELETEJSON } from "../../../helpers/fetch";

import { customStyles } from "../../../helpers/tablaOpciones";

const MDescargar = ({ setOpenHModal, openHModal, dataSelected }) => {
  const [descargar, setDescargar] = useState();
  const [historial, setHistorial] = useState();
  const closeModal = () => {
    setOpenHModal(false);
  };

  const downloadHistorial = (e) => {
    setDescargar({
      ...descargar,

      [e.target.name]: e.target.value,
    });
  };

  const getDateHistorial = () => {
    fetchGETPOSTPUTDELETEJSON(`services/export/${1}`, descargar, "POST").then(
      (res) => {
        setHistorial(res);
      }
    );
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
                <input
                  type="date"
                  name="initial_date"
                  onChange={(e) => downloadHistorial(e)}
                />
              </div>
              <div>
                <label>Fecha final:</label>
                <input
                  type="date"
                  name="end_date"
                  onChange={(e) => downloadHistorial(e)}
                />
              </div>
            </div>
            <div className="list-botones">
              <button className="botones " onClick={closeModal}>
                Cancelar
              </button>
              <button className="botones " onClick={getDateHistorial}>
                Descargar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MDescargar;
