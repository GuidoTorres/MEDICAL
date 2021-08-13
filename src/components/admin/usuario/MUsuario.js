/* eslint-disable */
import React, { useState } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { fetchGETPOSTPUTDELETEJSON } from "../../../helpers/fetch";
import { customStyles } from "../../../helpers/tablaOpciones";

const MUsuario = ({ openModal, setOpenModal, dataSelected, resp }) => {
  const [usuario, setUsuario] = useState({});

  const closeModal = () => {
    setOpenModal(false);
  };
  console.log(dataSelected);

  // status 422 tiene atenciones
  const editarUsuario = () => {
    const data = {
      tipo_usuario: usuario.tipo_usuario === "Particular" ? 1 : 0,
      cellphone: usuario.cellphone ? usuario.cellphone : dataSelected.phone,
      email: usuario.email ? usuario.email : dataSelected.email,
    };

    fetchGETPOSTPUTDELETEJSON(`users/${dataSelected.id}`, data, "PUT").then(
      (res) => {
        if (res.status === 201) {
          closeModal();
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Se ha creado el trabajador correctamente.",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Aceptar",
          }).then((res) => {
            if (res.isConfirmed) {
              resp();
            }
          });
        } else {
          closeModal();
          Swal.fire({
            icon: "error",
            title: "Ups¡",
            text: "Algo salió mal.",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cerrar",
          });
        }
      }
    );
  };

  const handleChange = (e) => {
    setUsuario({
      ...usuario,

      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__usuario"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Editar Usuario</h3>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 mregistro__usuario">
            <div className="usuario">
              <div>
                <label>Tipo de documento</label>
                <input
                  type="text"
                  name="document_type"
                  disabled
                  defaultValue={
                    dataSelected.document_type === 3
                      ? "Carné de extranjería"
                      : dataSelected.document_type === 2
                      ? "Pasaporte"
                      : dataSelected.document_type === 1
                      ? "DNI"
                      : "" || ""
                  }
                  onChange={(e) => handleChange(e)}
                  disabled
                />
              </div>
              <div>
                <label>Número de documento</label>
                <input
                  type="text"
                  defaultValue={dataSelected.dni || ""}
                  name="dni"
                  onChange={(e) => handleChange(e)}
                  disabled
                />
              </div>
              {dataSelected && dataSelected.user_type === "Empresa" ? (
                <div>
                  <label> Tipo de usuario:</label>
                  <select
                    className="form-select"
                    id="categoria"
                    aria-label="Default select example"
                    style={{ width: "50%" }}
                    name="tipo_usuario"
                    onChange={(e) => handleChange(e)}
                    defaultValue={dataSelected.user_type}
                  >
                    <option selected>Seleccione</option>
                    <option value="Empresa">Empresa</option>
                    <option value="Particular">Particular</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label>Tipo de usuario:</label>
                  <input
                    type="text"
                    defaultValue={dataSelected.user_type || "----"}
                    name="tipo_usuario"
                    onChange={(e) => handleChange(e)}
                    disabled
                  />
                </div>
              )}

              <div>
                <label>Empresa</label>
                <input
                  type="text"
                  defaultValue={dataSelected.company || "----"}
                  name="company"
                  onChange={(e) => handleChange(e)}
                  disabled
                />
              </div>
              <div>
                <label>Teléfono</label>
                <input
                  type="text"
                  defaultValue={dataSelected.phone || ""}
                  name="cellphone"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label>Correo</label>
                <input
                  type="text"
                  defaultValue={dataSelected.email || ""}
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <button className="botones" onClick={editarUsuario}>
              Editar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MUsuario;
