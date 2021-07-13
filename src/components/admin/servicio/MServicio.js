import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";

import { fetchGETPOSTPUTDELETEJSON } from "../../../helpers/fetch";

import { customStyles } from "../../../helpers/tablaOpciones";

const MServicio = ({ openModal, setOpenModal, getServices, dataSelected }) => {
  const [crearServicio, setCrearServicio] = useState({});

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setCrearServicio({
      ...crearServicio,

      [e.target.name]: e.target.value,
    });
  };


  const updateService = () => {
    const data = {
      name:
        crearServicio.name ||
        dataSelected.services[crearServicio.subCategoria].name ||
        "",
      abbreviation:
        crearServicio.abbreviation ||
        dataSelected.services[crearServicio.subCategoria].abbreviation ||
        "",
      service_category_id:
        crearServicio.service_category_id ||
        dataSelected.services[crearServicio.subCategoria].service_category_id ||
        "",
      amount:
        crearServicio.amount ||
        dataSelected.services[crearServicio.subCategoria].last_price.amount ||
        "",
    };
    fetchGETPOSTPUTDELETEJSON(
      `services/${dataSelected.services[crearServicio.subCategoria].id}`,
      data,
      "PUT"
    ).then((resp) => {
      if (resp.status === 200) {
        closeModal();
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Se ha editado el servicio correctamente.",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
        }).then((resp) => {
          if (resp.isConfirmed) {
            getServices();
          }
        });
      } else {
        closeModal();
        Swal.fire({
          icon: "error",
          title: "!Ups¡",
          text: "Algo salió mal.",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Cerrar",
        });
      }
    });
  };

  // console.log(crearServicio);
  // console.log(crearServicio);

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__EServicio"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Editar servicio</h3>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 mregistro__servicios">
            <div className="">
              <div>
                <label> Categoria:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{ width: "50%" }}
                  name="service_category_id"
                  onChange={(e) => handleChange(e)}
                >
                  <option selected>Seleccione</option>
                  <option value="1">Covid 19</option>
                </select>
              </div>
              <div>
                <label> Sub-Categoria:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  style={{ width: "50%" }}
                  name="subCategoria"
                  onChange={(e) => handleChange(e)}
                >
                  <option>Seleccione</option>

                  {dataSelected &&
                    dataSelected.services.map((data, i) => (
                      <option key={data.id} value={i}>
                        {data.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label> Nombre:</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={
                    crearServicio.subCategoria &&
                    dataSelected.services &&
                    dataSelected.services[crearServicio.subCategoria] &&
                    dataSelected.services[crearServicio.subCategoria].name
                      ? dataSelected.services[crearServicio.subCategoria].name
                      : ""
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label> Abreviatura:</label>
                <input
                  type="text"
                  name="abbreviation"
                  defaultValue={
                    crearServicio.subCategoria &&
                    dataSelected.services &&
                    dataSelected.services[crearServicio.subCategoria] &&
                    dataSelected.services[crearServicio.subCategoria]
                      .abbreviation
                      ? dataSelected.services[crearServicio.subCategoria]
                          .abbreviation
                      : ""
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label> Monto:</label>
                <input
                  type="text"
                  name="amount"
                  defaultValue={
                    crearServicio.subCategoria &&
                    dataSelected.services &&
                    dataSelected.services[crearServicio.subCategoria] &&
                    dataSelected.services[crearServicio.subCategoria].last_price &&
                    dataSelected.services[crearServicio.subCategoria].last_price.amount
                      ? dataSelected.services[crearServicio.subCategoria].last_price.amount
                      : ""
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>

            <div className="list-botones">
              <button className="botones " onClick={closeModal}>
                Cancelar
              </button>
              <button className="botones" onClick={updateService}>
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MServicio;
