/* eslint-disable */
import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { UploadAvatar } from "../../uploadAvatar/uploadAvatar";

import { fetchGETPOSTPUTDELETE } from "../../../helpers/fetch";

import { customStyles } from "../../../helpers/tablaOpciones";

const MCrearServicio = ({ openServicio, setOpenServicio, getServices }) => {
  const [avatar, setAvatar] = useState(null);
  const [crearServicio, setCrearServicio] = useState({
    service_category_id: "",
    name: "",
    amount: "",
  });
  const [error, setError] = useState(false);

  const closeModal = () => {
    setOpenServicio(false);
  };

  const handleChange = (e) => {
    setCrearServicio({
      ...crearServicio,

      [e.target.name]: e.target.value,
    });
  };

  console.log(crearServicio);

  const createService = () => {
    if (crearServicio.service_category_id.trim() === "" || null) {
      setError(true);

      document.getElementById("categoria").style =
        "border:1px solid red !important";
      document.getElementById("categoria").style.width = "50%";
    }
    if (crearServicio.name.trim() === "" || null) {
      setError(true);

      document.getElementById("name").style = "border:1px solid red !important";
    }

    if (crearServicio.amount.trim() === "" || null) {
      setError(true);

      document.getElementById("amount").style =
        "border:1px solid red !important";
    }
    const formData = new FormData();
    formData.set("name", crearServicio.name || "");
    formData.set("abbreviation", crearServicio.abbreviation || "");
    formData.set(
      "service_category_id",
      crearServicio.service_category_id || ""
    );
    formData.set("description", crearServicio.description || "");
    formData.set("url_extra", crearServicio.url_extra || "");
    formData.set("image", avatar && avatar.file ? avatar.file : "");
    formData.set("stock", crearServicio.stock || "");
    formData.set("limite_inferior", crearServicio.limite_inferior || "");
    formData.set("limite_superior", crearServicio.limite_superior || "");

    formData.set("amount", crearServicio.amount || "");

    if (
      crearServicio.service_category_id.trim() !== "" ||
      (null && crearServicio.name.trim() !== "") ||
      (null && crearServicio.amount.trim() !== "") ||
      null
    ) {
      fetchGETPOSTPUTDELETE("services", formData, "POST").then((resp) => {
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
    }
  };

  return (
    <Modal
      isOpen={openServicio}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__CrearServicio"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Agregar servicio</h3>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 mregistro__servicios">
            <div className="">
              <div>
                <label> Categoría:</label>
                <select
                  className="form-select"
                  id="categoria"
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
                <label> Nombre:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label> Abreviatura:</label>
                <input
                  type="text"
                  name="abbreviation"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label> Precio de vitrina:</label>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label> Costo límite superior:</label>
                <input
                  type="text"
                  name="limite_superior"
                  id="amount"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label> Costo límite inferior:</label>
                <input
                  type="text"
                  name="limite_inferior"
                  id="amount"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label> Url:</label>
                <input
                  type="text"
                  name="url_extra"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label> Stock:</label>
                <input
                  type="text"
                  name="stock"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label> Descripción:</label>

                <textarea
                  type="text"
                  name="description"
                  style={{ width: "50%" }}
                  onChange={(e) => handleChange(e)}
                ></textarea>
              </div>
              {/* <label> Imagen:</label> */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>
                  Imagen <span>(.jpg, .jpeg, .jpg)</span>
                </p>
                <div style={{ width: "100%", height: "173px" }}>
                  <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
                </div>
              </div>
            </div>
            <div className="list-botones">
              <button className="botones " onClick={closeModal}>
                Cancelar
              </button>
              <button className="botones" onClick={createService}>
                Agregar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MCrearServicio;
