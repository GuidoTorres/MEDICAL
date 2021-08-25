/* eslint-disable */
import React, { useState } from "react";
import Modal from "react-modal";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";
import Swal from "sweetalert2";
import { customStyles } from "../../helpers/tablaOpciones";
import jsPDF from "jspdf";
import rapida from "../../assets/pdf Imagen/rapida.png";

const MSubirRapida = ({
  openModal,
  setOpenModal,
  dataSelected,
  getAtencion,
}) => {
  const [error, setError] = useState(false);
  const [result, setResult] = useState({
    id: dataSelected.id,
    reactive: "",
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
    console.log(m);
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      const edad = age - 1;
      return edad.toString();
    } else {
      return age.toString();
    }
  }

  // console.log(getAge());
  // console.log(dataSelected);
  const generarPDF = () => {
    const doc = new jsPDF("p", "pt");
    doc.setProperties({
      title: "Formato Antígeno",
    });
    doc.setFontSize(10);

    doc.addImage(rapida, "PNG", 6, 20, 580, 800, "", "FAST");

    doc.text(
      395,
      143,
      `${
        dataSelected &&
        dataSelected.person &&
        dataSelected.person.gender_id &&
        dataSelected.person.gender_id === 1
          ? "Masculino"
          : "Femenino"
      }`
    );
    doc.text(
      100,
      143,
      `${dataSelected && dataSelected.id ? dataSelected.id : ""}`
    );
    doc.text(
      70,
      163,
      `${
        dataSelected && dataSelected.person && dataSelected.person.dni
          ? dataSelected.person.dni
          : ""
      }`
    );
    doc.text(
      493,
      163,
      `${
        dataSelected && dataSelected.date_attention
          ? dataSelected.date_attention
          : ""
      }`
    );

    doc.text(
      98,
      183,
      `${
        (dataSelected &&
          dataSelected.person &&
          dataSelected.person.name !== undefined) ||
        null
          ? dataSelected.person.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : ""
      } ${
        (dataSelected &&
          dataSelected.person &&
          dataSelected.person.pat_lastname !== undefined) ||
        null
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
    doc.text(380, 183, getAge());

    if (result.reactive === 1) {
      doc.text(295, 278, "X");
    } else if (result.reactive === 2) {
      doc.text(215, 278, "X");
    } else if (result.reactive === 3) {
      doc.text(215, 278, "X");
      doc.text(295, 278, "X");
    } else if (result.reactive === 4) {
      doc.text(190, 278, "No reactivo");

      doc.text(275, 278, "No reactivo");
    } else if (result.reactive === 5) {
      doc.text(205, 278, "null");

      doc.text(292, 278, "null");
    }
    const pdf = new File([doc.output("blob")], "myDoc.pdf", {
      type: "application/pdf",
    });

    postResults(pdf);
  };

  const postResults = (pdf) => {
    const formData = new FormData();

    formData.set("id", dataSelected.id);
    formData.set("reactive", result.reactive);
    formData.set("pdf", pdf);

    if (
      result.reactive === "" ||
      result.reactive === null ||
      result.reactive === undefined ||
      result.reactive === "Seleccione"
    ) {
      setError(true);
    } else if (
      result.reactive !== "" &&
      result.reactive !== null &&
      result.reactive !== undefined &&
      result.reactive !== "Seleccione"
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

  console.log(result);
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal mlaboratorio_subir-rapida"
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
                  {dataSelected &&
                  dataSelected.person &&
                  dataSelected.person.dni
                    ? dataSelected.person.dni
                    : ""}
                </label>
              </div>
              <div>
                <label>Nombre</label>
                <label>
                  {dataSelected &&
                  dataSelected.person &&
                  dataSelected.person.name &&
                  dataSelected.person.pat_lastname
                    ? dataSelected.person.name +
                      " " +
                      dataSelected.person.pat_lastname
                    : ""}
                </label>
              </div>
              <div>
                <label>Tipo de usuario</label>
                <label>
                  {dataSelected &&
                    dataSelected.person &&
                    dataSelected.person.user &&
                    dataSelected.person.user.user_type &&
                    dataSelected.person.user.user_type.name}
                </label>
              </div>
              <div>
                <label>Empresa</label>
                <label>
                  {dataSelected &&
                  dataSelected.person &&
                  dataSelected.person.user &&
                  dataSelected.person.user.company &&
                  dataSelected.person.user.company.corporation &&
                  dataSelected.person.user.company.corporation
                    .commercial_name &&
                  dataSelected.person.user.company.corporation.commercial_name
                    ? dataSelected.person.user.company.corporation
                        .commercial_name
                    : ""}
                </label>
              </div>
            </div>
            <p>
              <strong>Cargar Resultados</strong>{" "}
            </p>
            <div className="mt-2">
              <div className="d-flex-column">
                <label className="mb-3">El resultado de la prueba es:</label>
                {error ? (
                  <label className="mb-3" style={{ color: "red" }}>
                    Seleccione una opción antes de enviar el resultado.
                  </label>
                ) : null}
                <label>
                  <input
                    type="radio"
                    className="me-3"
                    id="r1"
                    value="igm"
                    name="reactive"
                    onChange={(e) =>
                      setResult({
                        ...result,
                        reactive: e.target.checked ? 2 : "",
                      })
                    }
                  />
                  Reactivo IgM
                </label>
                <label>
                  <input
                    type="radio"
                    className="me-3"
                    value="igg"
                    name="reactive"
                    id="r2"
                    onChange={(e) =>
                      setResult({
                        ...result,
                        reactive: e.target.checked ? 1 : "",
                      })
                    }
                  />
                  Reactivo IgG
                </label>

                <label>
                  <input
                    type="radio"
                    className="me-3"
                    value="igm/igg"
                    name="reactive"
                    id="r3"
                    onChange={(e) =>
                      setResult({
                        ...result,
                        reactive: e.target.checked ? 3 : "",
                      })
                    }
                  />
                  Reactivo IgM/IgG
                </label>
                <label>
                  <input
                    type="radio"
                    className="me-3"
                    value="noReactivo"
                    name="reactive"
                    id="r4"
                    onChange={(e) =>
                      setResult({
                        ...result,
                        reactive: e.target.checked ? 4 : "",
                      })
                    }
                  />
                  No Reactivo
                </label>
                <label>
                  <input
                    type="radio"
                    className="me-3"
                    value="invalido"
                    name="reactive"
                    id="r5"
                    onChange={(e) =>
                      setResult({
                        ...result,
                        reactive: e.target.checked ? 5 : "",
                      })
                    }
                  />
                  Inválido
                </label>
              </div>
            </div>
            <div className="list-botones">
              <button className="botones" onClick={closeModal}>
                Cancelar
              </button>
              {/* <button className="botones">Visualizar</button> */}
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

export default MSubirRapida;
