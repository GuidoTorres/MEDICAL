/* eslint-disable */
import React, { useState } from "react";
import Modal from "react-modal";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";
import Swal from "sweetalert2";
import jsPDF from "jspdf";

import antigenosi from "../../assets/pdf Imagen/antigenoSi.png";
import antigenono from "../../assets/pdf Imagen/antigenoNo.png";
import firma from "../../assets/pdf Imagen/Firma.png";
import isos from "../../assets/pdf Imagen/isos.png";

import { customStyles } from "../../helpers/tablaOpciones";
//MODAL PARA SUBIR RESULTADOS DE PRUEBA DE ANTÍGENO
const MSubirLaboratorio = ({
  openModal,
  setOpenModal,
  dataSelected,
  getAtencion,
  filtrarTabla,
}) => {
  const [result, setResult] = useState({
    id: dataSelected.id,
    result: "",
  });
  const closeModal = () => {
    setOpenModal(false);
  };
  // console.log(result);

  function getAge() {
    const today = new Date();
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

    doc.addImage(
      result.result === "0" ? antigenono : antigenosi,
      "PNG",
      6,
      20,
      580,
      800,
      "",
      "FAST"
    );
    doc.text(
      395,
      142,
      `${dataSelected.person.gender_id === 1 ? "Masculino" : "Femenino"}`
    );
    // doc.text(328, 135, `${e && e.genero === null ? 'Masculino' : ''}`);

    doc.text(105, 143, `${dataSelected.id ? dataSelected.id : ""}`);
    doc.text(
      75,
      163,
      `${dataSelected.person.dni ? dataSelected.person.dni : ""}`
    );
    doc.text(
      493,
      163,
      `${dataSelected.date_attention ? dataSelected.date_attention : ""}`
    );

    doc.text(
      100,
      183,
      `${
        (dataSelected &&
          dataSelected.person &&
          dataSelected.person.name !== null) ||
        undefined
          ? dataSelected.person.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : ""
      } ${
        (dataSelected &&
          dataSelected.person &&
          dataSelected.person.pat_lastname !== null) ||
        undefined
          ? dataSelected.person.pat_lastname.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : ""
      } ${
        (dataSelected &&
          dataSelected.person &&
          dataSelected.person.mom_lastname !== null) ||
        undefined
          ? dataSelected.person.mom_lastname.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : ""
      }`
    );
    doc.text(385, 183, getAge());

    if (result.result === "0" || 0) {
      doc.text(280, 263, `No detectado`);
    } else if (result.result === "1" || 1) {
      doc.text(280, 263, `Detectado`);
    }
    // window.open(doc.output("bloburl"), "_blank");
    const pdf = new File([doc.output("blob")], "myDoc.pdf", {
      type: "application/pdf",
    });

    postResults(pdf);
  };

  const postResults = (pdf) => {
    const formData = new FormData();
    formData.set("id", result.id);
    formData.set("result", result.result);
    formData.set("pdf", pdf);

    if (
      result.result === "" ||
      result.result === null ||
      result.result === undefined ||
      result.result === "Seleccione"
    ) {
      document.getElementById("resultado").style =
        "border:1px solid red !important";
    }

    if (
      result.result !== "" &&
      result.result !== undefined &&
      result.result !== "Seleccione"
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
                    setResult({ ...result, result: e.target.value })
                  }
                >
                  <option>Seleccione</option>
                  <option value="0">No Detectado</option>
                  <option value="1">Detectado</option>
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

export default MSubirLaboratorio;
