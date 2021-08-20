/* eslint-disable */
import React, { useState } from "react";
import Modal from "react-modal";
import { fetchGETPOSTPUTDELETE } from "../../../helpers/fetch";
import Swal from "sweetalert2";
import { customStyles } from "../../../helpers/tablaOpciones";
import jsPDF from "jspdf";
import anticuerpos from "../../../assets/pdf Imagen/anticuerpos.png";
import firma from "../../../assets/pdf Imagen/anticuerpos.png";
//MODAL PARA SUBIR RESULTADOS DE PRUEBA ECLIA ANTICUERPOS NEUTRALIZANTES
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

  function getAge() {
    const today = new Date();
    const year = today.getFullYear();
    const birthDate = new Date(dataSelected.person.birthday);

    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      const edad = age - 1;
      return edad.toString();
    } else {
      return age.toString();
    }
  }

  const generarPDF = () => {
    const doc = new jsPDF("p", "pt");
    doc.setProperties({
      title: "Formato Antígeno",
    });
    doc.setFontSize(10);

    doc.addImage(anticuerpos, "PNG", 6, 20, 580, 800, "", "FAST");

    doc.text(
      390,
      160,
      `${dataSelected.person.gender_id === 1 ? "Masculino" : "Femenino"}`
    );
    doc.text(100, 160, `${dataSelected.id ? dataSelected.id : ""}`);
    doc.text(
      70,
      181,
      `${dataSelected.person.dni ? dataSelected.person.dni : ""}`
    );
    doc.text(
      490,
      181,
      `${dataSelected.date_attention ? dataSelected.date_attention : ""}`
    );

    doc.text(
      100,
      201,
      `${
        dataSelected.person.name !== undefined || null
          ? dataSelected.person.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : ""
      } ${
        dataSelected.person.pat_lastname !== undefined || null
          ? dataSelected.person.pat_lastname.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : ""
      } ${
        dataSelected.person.mom_lastname !== undefined || null
          ? dataSelected.person.mom_lastname.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : ""
      }`
    );
    doc.text(380, 201, getAge());

    doc.text(
      190,
      292,
      `${
        result.anticuerpos === "0"
          ? "Negativo"
          : result.anticuerpos === "1"
          ? "Positivo"
          : "Sin resultado"
      }`
    );
    // window.open(doc.output("bloburl"), "_blank");

    const pdf = new File([doc.output("blob")], "myDoc.pdf", {
      type: "application/pdf",
    });

    postResults(pdf);
  };

  const postResults = (pdf) => {
    const formData = new FormData();
    formData.set("id", dataSelected.id || "");
    formData.set("anticuerpos", result.anticuerpos);
    formData.set("pdf", pdf);

    if (
      result.anticuerpos === "" ||
      result.anticuerpos === null ||
      result.anticuerpos === undefined ||
      result.anticuerpos === "Seleccione"
    ) {
      document.getElementById("resultado").style =
        "border:1px solid red !important";
    } else if (
      result.anticuerpos !== "" &&
      result.anticuerpos !== null &&
      result.anticuerpos !== "Seleccione"
    ) {
      fetchGETPOSTPUTDELETE(`result`, formData, "POST").then((data) => {
        if (data.status === 200) {
          closeModal();
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Se cargó el resultado correctamente.",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Aceptar",
          });
          getAtencion();
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
                <label>{dataSelected.person.user.user_type.name}</label>
              </div>
              <div>
                <label>Empresa</label>
                <label>
                  {dataSelected.person.user.company.corporation.commercial_name}
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
                  id="resultado"
                  onChange={(e) =>
                    setResult({ ...result, anticuerpos: e.target.value })
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
              <button className="botones" onClick={generarPDF}>
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
