import React from "react";
import Modal from "react-modal";

import { customStyles } from "../../../helpers/tablaOpciones";

const MSubCategoria = ({ setOpenSubModal, openSubModal, subCategoria }) => {
  const closeModal = () => {
    setOpenSubModal(false);
  };
  console.log(subCategoria);
  return (
    <Modal
      isOpen={openSubModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__subcategoria"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Sub Categorías</h3>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 mregistro__servicios">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col text-center">Subcategoría</th>
                    <th scope="col text-center">Abreviatura</th>
                    <th scope="col text-center">Precio vitrina</th>
                    <th scope="col text-center">Precio límite superior</th>
                    <th scope="col text-center">Precio límite inferior</th>
                  </tr>
                </thead>
                <tbody>
                  {subCategoria.services.map((data, i) => {
                    return (
                      <tr key={data.id}>
                        <th scope="row">{i + 1}</th>
                        <td className="text-center">{data.name}</td>

                        <td className="text-center">{data.abbreviation}</td>
                        <td className="text-center">
                          {data.last_price.amount}
                        </td>
                        <td className="text-center">{data.limite_superior}</td>
                        <td className="text-center">{data.limite_inferior}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* <div className="list-botones">
              <button className="botones ">Cancelar</button>
              <button className="botones ">Descargar</button>
            </div> */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MSubCategoria;
