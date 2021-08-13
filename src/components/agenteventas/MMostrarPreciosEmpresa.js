/* eslint-disable */
import React, { useEffect } from "react";
import Modal from "react-modal";

import { customStyles } from "../../helpers/tablaOpciones";

const MMostrarPreciosEmpresa = ({
  listaPrecios,
  setListaPrecios,
  dataSelected,
  comDiscount,
}) => {
  const closeModal = () => {
    setListaPrecios(false);
  };

  console.log(dataSelected);
  return (
    <Modal
      isOpen={listaPrecios}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal mventas__precios"
      closeTimeoutMS={200}
      preventScroll={true}
      overlayClassName="modal-fondo"
      ariaHideApp={false}
    >
      <h3 className="title__modal">Listado de precios</h3>
      <div className="row">
        <div className="col-12">
          <div className="table-responsive ">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Tipo de prueba</th>
                  <th scope="col">Descuento</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {dataSelected &&
                  dataSelected.services.map((data, i) => (
                    <tr>
                      <td>
                        {data.abbreviation
                          ? data.abbreviation
                          : ""}
                      </td>
                      <td>
                        {data.last_discount &&
                        data.last_discount &&
                        data.last_discount.percent
                          ? data.last_discount.percent + "% "
                          : "0%"}
                      </td>

                      <td>
                        {data.last_discount &&
                        data.last_discount &&
                        data.last_discount.amount
                          ? data.last_discount.amount
                          : ""}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MMostrarPreciosEmpresa;
