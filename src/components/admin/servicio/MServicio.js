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
  console.log(crearServicio);

  const updateService = () => {
    const data = {

      name: crearServicio.name || dataSelected.services[crearServicio.id-1].name || "",
      abbreviation: crearServicio.abbreviation || dataSelected.services[crearServicio.id -1].abbreviation || "",
      service_category_id: crearServicio.service_category_id || dataSelected.services[crearServicio.id -1].service_category_id || "",
      amount: crearServicio.amount || dataSelected.services[crearServicio.id -1].last_price.amount || ""

    }
    fetchGETPOSTPUTDELETEJSON(`services/${crearServicio.id}`, data, "PUT").then((resp) => {
      if (resp.status === 200) {
        closeModal();
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Se ha creado el servicio correctamente.",
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

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__EditarServicio"
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
                  name="id"
                  onChange={(e) => handleChange(e)}
                >
                  <option selected>Seleccione</option>

                  {dataSelected &&
                    dataSelected.services.map((data, i) => (
                      <option value={i+1}>{data.name}</option>
                    ))}
                </select>
              </div>
              <div>
                <label> Nombre:</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={crearServicio.id ? dataSelected.services[crearServicio.id-1].name : ""}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label> Abreviatura:</label>
                <input
                  type="text"
                  name="abbreviation"
                  defaultValue={crearServicio.id ? dataSelected.services[crearServicio.id-1].abbreviation : ""}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label> Monto:</label>
                <input
                  type="text"
                  name="amount"
                  defaultValue={crearServicio.id ? dataSelected.services[crearServicio.id-1].last_price.amount : ""}

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
