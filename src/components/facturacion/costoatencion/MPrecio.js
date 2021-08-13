/* eslint-disable */
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { customStyles } from "../../../helpers/tablaOpciones";

const MPrecio = ({
  openModalPrecio,
  setOpenModalPrecio,
  data,
  setEstado,
  services,
  setServices,
  obtenServicios,
  calcularValores,
  tipo = "E",
}) => {
  const closeModal = () => {
    setOpenModalPrecio(false);
  };

  const restablecer = () => {
    obtenServicios();
    setEstado(2);
    closeModal();
    calcularValores();
  };

  const changeServices = (service, value) => {
    setEstado(1);

    const position = services.findIndex((d) => d.servicio === service);
    services[position].total = Number(value);

    calcularValores();
  };

  useEffect(() => {
    // console.log(services);
  }, []);

  return (
    <Modal
      isOpen={openModalPrecio}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal  mfacturacion__particular"
      overlayClassName="modal-fondo ReactToMessage"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Editar precios</h3>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 facturacion__empresa">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Tipo de servicio</th>
                    <th scope="col">Costo incluido IGV(S/.)</th>
                  </tr>
                </thead>
                <tbody>
                  {services &&
                    services.map((data, i) => (
                      <tr key={i}>
                        <td>{data.servicio}</td>
                        <td>
                          <input
                            type="number"
                            min="0"
                            defaultValue={data.total}
                            onChange={(e) =>
                              changeServices(data.servicio, e.target.value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="list-botones">
        <button className="botones" onClick={closeModal}>
          Cerrar
        </button>
        <button className="botones" onClick={restablecer}>
          Restablecer
        </button>
      </div>
    </Modal>
  );
};

export default MPrecio;
