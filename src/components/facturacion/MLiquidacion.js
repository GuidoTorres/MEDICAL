import React from "react";
import Modal from "react-modal";
import { customStyles } from "../../helpers/tablaOpciones";

const MLiquidacion = ({ openModal, setOpenModal, datos }) => {
  const closeModal = () => {
    setOpenModal(false);
  };

  const openPdf = () => {
    // window.open("./assets-liquidacion/liquidacion5110.pdf", "_blank");
  };
  const dowloandPdf = () => {};
  const dowloandExcel = () => {};

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal  mfacturacion__liquidacion"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Editar liquidación</h3>
      <div className="liquidacion__title">
        <div>
          <label>Razón social</label>
          <input readOnly value="Empresa 1" />
        </div>
        <div>
          <label>Fecha emisión</label>
          <input type="date" readOnly value="2020-07-22" />
        </div>
        <div>
          <label>Ruc</label>
          <input readOnly value="44444444444" />
        </div>
        <div>
          <label>Razón social</label>
          <input readOnly value="02020202" />
        </div>
      </div>
      <div className="col-12 fmparticular">
        <div>
          <div className="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">DNI</th>
                  <th scope="col">Hora</th>
                  <th scope="col">Nombres</th>
                  <th scope="col">Apellidos</th>
                  <th scope="col">Tipo de prueba</th>
                  <th scope="col">Servicio</th>
                  <th scope="col">Sub-Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td colSpan="7">Obvervación</td>
                  <td>Sub Total</td>
                  <td>133</td>
                </tr>
                <tr>
                  <td colspan="7">Factura F000000</td>
                  <td>IGV</td>
                  <td>133</td>
                </tr>
                <tr>
                  <td colspan="7"></td>
                  <td>Total</td>
                  <td>266</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="liquidacion__buttons">
        <div className="group-1">
          <button className="botones me-1" onClick={openPdf}>
            Previsualizar
          </button>
          <button className="me-1 icon-pdf" onClick={dowloandPdf}>
            <i className="far fa-file-pdf"></i>
          </button>
          <button className="icon-excel" onClick={dowloandExcel}>
            <i className="far fa-file-excel "></i>
          </button>
        </div>
        <div className="group-2">
          <button className="botones me-1" onClick={closeModal}>
            Cancelar
          </button>
          <button className="botones">Guardar</button>
        </div>
      </div>
    </Modal>
  );
};

export default MLiquidacion;
