import React, { useEffect } from "react";
import Modal from "react-modal";
import { customStyles } from "../../helpers/tablaOpciones";
import { fetchGETPOSTPUTDELETEJSON } from "../../helpers/fetch";

const MLiquidacion = ({
  openModal,
  setOpenModal,
  datos,
  getLiquidacion,
  setBusqueda,
}) => {
  useEffect(() => {
    setBusqueda(null);
  }, []);

  const closeModal = () => {
    setOpenModal(false);
  };

  // console.log(datos);

  const deleteLiquidacion = () => {
    fetchGETPOSTPUTDELETEJSON(`settlement/${datos.id}`, {}, "DELETE")
      .then((info) => info.json())
      .then(() => {
        getLiquidacion();
      });
  };

  const handleEliminar = () => {
    deleteLiquidacion();
    closeModal();
    // setBusqueda("");
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
          <input
            readOnly
            value={datos.company ? datos.company.corporation.business_name : ""}
          />
        </div>
        <div>
          <label>Fecha emisión</label>
          <input
            type="date"
            readOnly
            value={datos.date_issue ? datos.date_issue : ""}
          />
        </div>
        <div>
          <label>Ruc</label>
          <input
            readOnly
            value={datos.company ? datos.company.corporation.ruc : ""}
          />
        </div>
        <div>
          <label>Factura</label>
          <input readOnly value={datos.code ? datos.code : ""} />
        </div>
      </div>
      <div className="col-12 fmparticular">
        <div>
          <div className="table-responsive">
            <table className="table">
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
                {datos.detail.length > 0
                  ? datos.detail.map((data, index) => (
                      <tr key={index}>
                        <td>{data.attention.person.id}</td>
                        <td>{data.attention.person.dni}</td>
                        <td>{data.attention.date_attention}</td>
                        <td>{data.attention.person.name}</td>
                        <td>{data.attention.person.pat_lastname}</td>
                        <td>{data.attention.service.name}</td>
                        <td>{data.attention.service.description}</td>
                        <td>{data.attention.amount}</td>
                      </tr>
                    ))
                  : ""}
                <tr>
                  <td colSpan="7">Obvervación</td>
                  <td>Sub Total</td>
                  <td>{datos.subtotal ? datos.subtotal : ""}</td>
                </tr>
                <tr>
                  <td colSpan="7">
                    {" "}
                    <textarea
                      defaultValue={datos.observation ? datos.observation : ""}
                      readOnly
                    ></textarea>
                  </td>
                  <td>IGV</td>
                  <td>{datos.igv ? datos.igv : ""}</td>
                </tr>
                <tr>
                  <td colSpan="7"></td>
                  <td>Total</td>
                  <td>{datos.amount ? datos.amount : ""}</td>
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
          <button className="btn btn-danger" onClick={handleEliminar}>
            Eliminar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MLiquidacion;
