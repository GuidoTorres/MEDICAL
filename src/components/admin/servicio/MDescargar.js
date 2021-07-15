import React, { useState } from "react";
import Modal from "react-modal";
import  {fetchGETPOSTPUTDELETEJSON}  from "../../../helpers/fetch";

import  {customStyles}  from "../../../helpers/tablaOpciones";
import ExportExcel from "react-export-excel";


const ExcelFile = ExportExcel.ExcelFile;
const ExcelSheet = ExportExcel.ExcelSheet;
const ExcelColumn = ExportExcel.ExcelColumn;

const MDescargar = ({ setOpenHModal, openHModal, subCategoria, dataSelected }) => {
  const [descargar, setDescargar] = useState();
  const [historial, setHistorial] = useState({});
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
    fetchGETPOSTPUTDELETEJSON(
      `services/export/${descargar.id}`,
      descargar,
      "POST"
    )
      .then((res) => res.json())
      .then((res) => setHistorial(res));
  };
  // console.log(historial);
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
                <label> Sub-Categoria:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{ width: "50%" }}
                  name="id"
                  onChange={(e) => downloadHistorial(e)}
                >
                  <option value={-1}>Seleccione</option>

                  {dataSelected &&
                    dataSelected.services.map((data, i) => (
                      <option value={data.id}>{data.name}</option>
                    ))}
                </select>
              </div>
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
              {/* <button className="botones " onClick={getDateHistorial}>
                Descargar
              </button> */}
              <ExcelFile
                filename="historial"
                element={
                  <button className="botones" onClick={()=>getDateHistorial()}>
                    Descargar
                  </button>
                }
              >
                <ExcelSheet data={historial} name="Hoja1">
                  <ExcelColumn label="Categoria" value="category"></ExcelColumn>
                  <ExcelColumn label="Fecha" value="date"></ExcelColumn>
                  <ExcelColumn label="Nombre" value="name"></ExcelColumn>
                  <ExcelColumn label="Precio" value="price"></ExcelColumn>
                </ExcelSheet>
              </ExcelFile>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MDescargar;
