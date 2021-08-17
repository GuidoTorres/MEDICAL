/* eslint-disable */
import React, { useState } from "react";
import Modal from "react-modal";
import {
  fetchGETPOSTPUTDELETE,
} from "../../helpers/fetch";

import { customStyles } from "../../helpers/tablaOpciones";
import Swal from "sweetalert2";

import jsPDF from "jspdf";
import eclia from "../../assets/pdf Imagen/eclia.png";
import firma from "../../assets/pdf Imagen/Firma.png";
// MODAL PARA SUBIR RESULTADOS DE PRUEBA ECLIA ANTICUERPOS IGM/IGG
const MSubirEclea = ({
  openModal,
  setOpenModal,
  dataSelected,
  tipoPrueba,
  getAtencion,
}) => {
  const [result, setResult] = useState({
    id: dataSelected.id,
    result_igg: "",
    result_igm: "",
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

    doc.addImage(eclia, "PNG", 6, 20, 580, 800, "", "FAST");

    doc.text(
      328,
      120,
      `${dataSelected.person.gender_id === 1 ? "Masculino" : "Femenino"}`
    );
    doc.text(85, 119, `${dataSelected.id ? dataSelected.id : ""}`);
    doc.text(
      55,
      141,
      `${dataSelected.person.dni ? dataSelected.person.dni : ""}`
    );
    doc.text(
      428,
      141,
      `${dataSelected.date_attention ? dataSelected.date_attention : ""}`
    );

    doc.text(
      80,
      163,
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
    doc.text(313, 164, getAge());

    doc.text(195, 268, `${result.result_igm ? result.result_igm : ""}`);
    doc.text(285, 268, `${result.result_igg ? result.result_igg : ""}`);
    doc.setFillColor(255, 255, 255);
    doc.rect(335, 464, 150, 80, "F");
    doc.addImage(firma, "PNG", 345, 485, 100, 80, "", "FAST");
    const pdf = new File([doc.output("blob")], "myDoc.pdf", {
      type: "application/pdf",
    });

    postResults(pdf);
  };

  const postResults = (pdf) => {
    if (result.result_igg === "" || null) {
      document.getElementById("igg").style = "border:1px solid red !important";
    }
    if (result.result_igm === "" || null) {
      document.getElementById("igm").style = "border:1px solid red !important";
    }

    const formData = new FormData();

    formData.set("id", dataSelected.id || "");
    formData.set("result_igm", result.result_igm || "");
    formData.set("result_igg", result.result_igg || "");
    formData.set("pdf", pdf);

    if (
      result.result_igg !== "" ||
      (null && result.result_igm !== "") ||
      null
    ) {
      fetchGETPOSTPUTDELETE(`result`, formData, "POST").then((data) => {
        console.log(data);
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
      className="modal mlaboratorio_subir-eclea"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal mb-3">Cargar resultado</h3>
      <div className="container">
        <div className="row">
          <div className="col-12 mlaboratorio_cargar">
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
            <div className="mt-3">
              <div className="d-flex-column">
                <label className="mb-3">El resultado de la prueba es:</label>
                <div>
                  <label>Resultado IgM:</label>
                  <input
                    type="text"
                    name="resultIgm"
                    id="igm"
                    onChange={(e) =>
                      setResult({ ...result, result_igm: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Resultado IgG:</label>
                  <input
                    type="text"
                    name="resultIgg"
                    id="igg"
                    onChange={(e) =>
                      setResult({ ...result, result_igg: e.target.value })
                    }
                  />
                </div>
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

export default MSubirEclea;
