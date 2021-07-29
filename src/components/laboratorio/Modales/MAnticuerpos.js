import React, { useState } from "react";
import Modal from "react-modal";
import { fetchGETPOSTPUTDELETEJSON } from "../../../helpers/fetch";
import Swal from "sweetalert2";
import { customStyles } from "../../../helpers/tablaOpciones";

const MAnticuerpos = ({
  openModal,
  setOpenModal,
  dataSelected,
  tipoPrueba,
  getAtencion,
}) => {
  const [result, setResult] = useState({
    id: dataSelected.id,
  });
  const closeModal = () => {
    setOpenModal(false);
  };

  const postResults = () => {
    fetchGETPOSTPUTDELETEJSON(`result`, result, "POST").then((data) => {
      console.log(data);

      if (data.status === 200) {
        closeModal();
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Se cargo el resultado correctamente.",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
        }).then((resp) => {
          if (resp.isConfirmed) {
            getAtencion();
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
      className="modal mlaboratorio_subir"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal mb-3">Cargar resultado</h3>
      <div className="container">
        <div className="row">
          <div className="col-12 mlaboratorio_cargar ">
            <p>
              <strong>Datos del paciente</strong>{" "}
            </p>
            <div className="mt-2">
              <div style={{ display: "flex", alignItems: "center" }}>
                <label>DNI:</label>
                <label>
                  {dataSelected.person.dni ? dataSelected.person.dni : ""}
                </label>
              </div>
              <div>
                <label>Nombre</label>
                <label>
                  {dataSelected.person.name && dataSelected.person.pat_lastname
                    ? dataSelected.person.name +
                      " " +
                      dataSelected.person.pat_lastname
                    : ""}
                </label>
              </div>
              <div>
                <label>Tipo de usuario</label>
                <label>
                  {dataSelected.people_id === 1
                    ? "Particular"
                    : dataSelected.people_id === 0
                    ? "Empresa"
                    : "Sin Tipo"}
                </label>
              </div>
            </div>
            <p>
              <strong>Cargar Resultados</strong>{" "}
            </p>
            <div className="mt-2">
              <div>
                <label>El resultado de la prueba es:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    setResult({ ...result, result: e.target.value })
                  }
                >
                  <option>Seleccione</option>
                  <option value="0">Negativo</option>
                  <option value="1">Positivo</option>
                </select>
              </div>
            </div>
            <div className="list-botones">
              <button className="botones" onClick={closeModal}>
                Cancelar
              </button>
              <button className="botones" onClick={postResults}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MAnticuerpos;
