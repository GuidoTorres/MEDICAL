/* eslint-disable */
import React, { useState } from "react";
import Modal from "react-modal";
import { customStyles } from "../../../helpers/tablaOpciones";
import ExportarExcel from "../../../helpers/ExportarExcel";
import { fetchGETPOSTPUTDELETEJSON } from "../../../helpers/fetch";

const MDescargar = ({ openDescarga, setOpenDescarga, dataSelected }) => {
  const [historial, setHistorial] = useState({});
  const [descargar, setDescargar] = useState();

  const closeModal = () => {
    setOpenDescarga(false);
  };

  const downloadHistorial = (e) => {
    setDescargar({
      ...descargar,

      [e.target.name]: e.target.value,
    });
  };

  const descargarResultados = () => {
    fetchGETPOSTPUTDELETEJSON("resultados/mi-clinica/excel", descargar, "POST")
      .then((res) => res.json())
      .then((res) => setHistorial(res));
  };

  return (
    <Modal
      isOpen={openDescarga}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal 
      mlaboratorio__historial"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Descargar Historial </h3>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 mregistro__servicios">
            <div className="">
              <div>
                <label>Fecha inicio:</label>
                <input
                  type="date"
                  name="fecha_inicio"
                  onChange={(e) => downloadHistorial(e)}
                />
              </div>
              <div>
                <label>Fecha final:</label>
                <input
                  type="date"
                  name="fecha_fin"
                  onChange={(e) => downloadHistorial(e)}
                />
              </div>
            </div>
            <div className="list-botones" style={{ display: "flex" }}>
              <button className="botones " onClick={closeModal}>
                Cancelar
              </button>
              <button
                className="botones "
                onClick={() => descargarResultados()}
              >
                Generar historial
              </button>
              <ExportarExcel apiData={historial} fileName={"historial"} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MDescargar;
