/* eslint-disable */
import Modal from "react-modal";
import { customStyles } from "../../../helpers/tablaOpciones";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import DeclaracionJurada from "../FormatosPDF/DeclaracionJurada";
import ConsentimientoInformado from "../FormatosPDF/ConsentimientoInformado";
import FichaCovid19 from "../FormatosPDF/FichaCovid19";
import {
  fetchGETPOSTPUTDELETE,
  fetchGETPOSTPUTDELETEJSON,
} from "../../../helpers/fetch";

const MGenerarAtencion = ({
  generarAtencion,
  setGenerarAtencion,
  dataSelected,
  getAttention,
  formulario,
}) => {
  const closeModal = () => {
    setGenerarAtencion(false);
    setDatos(null);
  };
  const [datos, setDatos] = useState({});
  const [condicion, setCondicion] = useState({});

  const [declaracion, setDeclaracion] = useState();
  const [ficha, setFicha] = useState();
  const [consentimiento, setConsentimiento] = useState();
  const [services, setServices] = useState({});
  const [clinics, setClinics] = useState({});

  const getServices = () => {
    fetchGETPOSTPUTDELETE("services")
      .then((res) => res.json())
      .then((res) => setServices(res.data));
  };

  const obtenerData = () => {
    if (dataSelected) {
      setDatos({
        user_type_id:
          dataSelected &&
          dataSelected.user &&
          dataSelected.user.user_type &&
          dataSelected.user.user_type.id,
      });
    }
  };
  useEffect(() => {
    obtenerData();
  }, []);

  const generarDeclaracion = () => {
    let arr = Array.from({ length: 26 }, () => ({
      question_id: null,
      answer: null,
    }));

    arr.map((item, i) => {
      item.question_id = i + 1;
    });

    setDeclaracion(arr);
  };

  const generarFicha = () => {
    let arr = Array.from({ length: 177 }, () => ({
      question_id: null,
      answer: null,
    }));
    const a = 27;
    arr.map((item, a) => {
      let data = a + 26;
      item.question_id = data + 1;
    });

    setFicha(arr);
  };

  const generarConsentimiento = () => {
    let arr = Array.from({ length: 3 }, () => ({
      question_id: null,
      answer: null,
    }));

    arr.map((item, a) => {
      let data = a;
      item.question_id = data + 1;
    });

    setConsentimiento(arr);
  };

  const getClinics = () => {
    fetchGETPOSTPUTDELETE("clinics")
      .then((res) => res.json())
      .then((res) => setClinics(res.data));
  };

  useEffect(() => {
    getServices();
    getClinics();
    generarDeclaracion();
    generarFicha();
    generarConsentimiento();
  }, []);

  const getFecha = () => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${"-"}${month > 9 ? month : "0" + month}${"-"}${
      date > 0 ? date : "0" + date
    }`;
  };

  const getHora = () => {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    return `${h > 9 ? h : "0" + h}${":"}${m > 9 ? m : "0" + m}${":"}${
      s > 9 ? s : "0" + s
    }`;
  };

  const crearAtencion = () => {
    console.log("crear atencion");
    const data = declaracion.filter((item) => item.answer !== null);
    const data1 = ficha.filter((item) => item.answer !== null);

    if (datos.service_id == "5" && data.length > 0 && data1.length > 0) {
      const atencion = {
        date_attention: getFecha() || "",
        time_attention: getHora() || "",
        people_id: dataSelected.id,
        service_id: datos.service_id,
        clinic_id: 1,
        codebar: dataSelected.id,
        user_type_id: datos.user_type_id,
        forms: [
          {
            signature: null,
            date_emision: getFecha(),
            form_type_id: 1,
            answers: declaracion,
          },
          {
            signature: null,
            date_emision: getFecha(),
            form_type_id: 2,
            answers: ficha,
          },
          {
            signature: null,
            date_emision: getFecha(),
            form_type_id: 3,
            answers: consentimiento,
          },
        ],
      };
      fetchGETPOSTPUTDELETEJSON("attention", atencion, "POST").then((res) => {
        console.log(res);
        if (res.status === 200) {
          closeModal();
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Se generó la atención correctamente.",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Aceptar",
          }).then((resp) => {
            if (resp.isConfirmed) {
              getAttention();
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
      });
    } else if (
      datos.service_id == "4" ||
      datos.service_id == "3" ||
      datos.service_id == "2" ||
      (datos.service_id == "1" && data.length > 0)
    ) {
      console.log("entro a las otras");

      const atencion = {
        date_attention: getFecha() || "",
        time_attention: getHora() || "",
        people_id: dataSelected.id,
        service_id: datos.service_id,
        clinic_id: 1,
        codebar: dataSelected.id,
        user_type_id: datos.user_type_id,
        forms: [
          {
            signature: null,
            date_emision: getFecha(),
            form_type_id: 1,
            answers: declaracion,
          },

          {
            signature: null,
            date_emision: getFecha(),
            form_type_id: 3,
            answers: consentimiento,
          },
        ],
      };
      fetchGETPOSTPUTDELETEJSON("attention", atencion, "POST").then((res) => {
        console.log(res);
        if (res.status === 200) {
          closeModal();
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Se generó la atención correctamente.",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Aceptar",
          }).then((resp) => {
            if (resp.isConfirmed) {
              getAttention();
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
      });
    } else {
      closeModal();
      Swal.fire({
        icon: "error",
        title: "Fichas incompletas",
        text: "Debe llenar todas las fichas para atender al paciente.",
      });
    }

    const prueba = document.getElementById("categoria").value;
    const prueba1 = document.getElementById("subcategoria").value;
  };

  const handleOnChange = (e) => {
    setDatos({
      ...datos,

      [e.target.name]: e.target.value,
    });
  };

  const mostrarDeclaracionJurada = () => {
    const declaracion = document.querySelector(".containerPDF").style;
    const consentimiento = document.querySelector(".containerPDF1").style;
    const ficha = document.querySelector(".containerPDF2").style;

    consentimiento.display = "none";
    ficha.display = "none";
    declaracion.display = "flex";
    declaracion.visibility = "visible";
  };

  const mostrarConsentimiento = () => {
    const declaracion = document.querySelector(".containerPDF").style;
    const consentimiento = document.querySelector(".containerPDF1").style;
    const ficha = document.querySelector(".containerPDF2").style;

    declaracion.display = "none";
    ficha.display = "none";
    consentimiento.display = "block";
    consentimiento.visibility = "visible";
  };

  const mostrarFichaCovid = () => {
    const declaracion = document.querySelector(".containerPDF").style;
    const consentimiento = document.querySelector(".containerPDF1").style;
    const ficha = document.querySelector(".containerPDF2").style;

    declaracion.display = "none";
    consentimiento.display = "none";
    ficha.display = "block";
    ficha.visibility = "visible";
  };

  return (
    <Modal
      isOpen={generarAtencion}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__generarAtencion"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
      contentLabel="Example Modal"
      id="modalBar"
    >
      <h3 className="title__modal">Generar atención</h3>
      <div className="generarAtencion">
        <div className="datosPaciente">
          <label htmlFor="">
            <strong>Paciente: </strong>
            {dataSelected.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            ) +
              " " +
              dataSelected.pat_lastname.replace(
                /(^\w|\s\w)(\S*)/g,
                (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
              ) +
              " " +
              dataSelected.mom_lastname.replace(
                /(^\w|\s\w)(\S*)/g,
                (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
              )}
          </label>
          {/* <label htmlFor="">
            <strong>Tipo de paciente: </strong>
            {dataSelected &&
            dataSelected.user &&
            dataSelected.user.user_type &&
            dataSelected.user.user_type.name
              ? dataSelected.user.user_type.name.replace(
                  /(^\w|\s\w)(\S*)/g,
                  (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
                )
              : "---"}
          </label> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label htmlFor="">
              <strong>Tipo de paciente: </strong>
            </label>
            <select
              // class="form-select"
              aria-label="Default select example"
              name="user_type_id"
              value={datos.user_type_id || ""}
              onChange={handleOnChange}
              style={{ marginLeft: "5px" }}
            >
              <option selected>Seleccione</option>
              <option value="1">Empresa</option>
              <option value="2">Particular</option>
            </select>
          </div>
          <label htmlFor="">
            <strong>Empresa: </strong>
            {dataSelected &&
            dataSelected.user &&
            dataSelected.user.company &&
            dataSelected.user.company.corporation &&
            dataSelected.user.company.corporation.commercial_name
              ? dataSelected.user.company.corporation.commercial_name
              : "---"}
          </label>

          <label htmlFor="">
            <strong>Teléfono: </strong>
            {dataSelected &&
            dataSelected.user &&
            dataSelected.user.company &&
            dataSelected.user.company.corporation &&
            dataSelected.user.company.corporation.contacts &&
            dataSelected.user.company.corporation.contacts &&
            dataSelected.user.company.corporation.contacts[1] &&
            dataSelected.user.company.corporation.contacts[1].phone
              ? dataSelected.user.company.corporation.contacts[1].phone
              : "---"}
          </label>
        </div>

        <div className="container1">
          <label htmlFor="" className="mt-3">
            <strong>Seleccionar servicio:</strong>
          </label>

          <div className="tipoServicio mt-3">
            <div className="">
              <label htmlFor="">Tipo de servicio:</label>
              <select
                class="form-select"
                aria-label="Default select example"
                name="clinic_id"
                id="categoria"
                onChange={handleOnChange}
              >
                <option selected>Seleccione</option>
                <option value="1">Covid 19</option>
              </select>
            </div>

            <div>
              <label htmlFor="">Plan de atención:</label>

              {datos.user_type_id == 1 ? (
                <select
                  class="form-select"
                  aria-label="Default select example"
                  disabled={datos.clinic_id === "1" ? false : true}
                  name="service_id"
                  id="subcategoria"
                  onChange={(e) => {
                    handleOnChange(e);
                    // setPrueba(e.target);
                  }}
                >
                  <option selected>Seleccione</option>
                  {dataSelected &&
                    dataSelected.user &&
                    dataSelected.user.company &&
                    dataSelected.user.company.company_service &&
                    dataSelected.user.company.company_service
                      .filter((item) => item.state === 1)
                      .map((data, i) => (
                        <option key={i} value={data.service.id}>
                          {data.service.abbreviation}
                        </option>
                      ))}
                </select>
              ) : datos.user_type_id == 2 ? (
                <select
                  class="form-select"
                  aria-label="Default select example"
                  disabled={datos.clinic_id === "1" ? false : true}
                  name="service_id"
                  id="subcategoria"
                  onChange={(e) => {
                    handleOnChange(e);
                    // setPrueba(e.target);
                  }}
                >
                  <option selected>Seleccione</option>

                  {services &&
                    services[0] &&
                    services[0].services &&
                    services[0].services.map((data, i) => (
                      <option key={i} title={data.name} value={data.id}>
                        {data.abbreviation}
                      </option>
                    ))}
                </select>
              ) : null}
            </div>
          </div>
        </div>
        <div className="container2">
          <div className="containerBotones mt-3">
            <button
              type="button"
              className="botones btn btn-primary"
              onClick={() => mostrarDeclaracionJurada()}
            >
              Declaración jurada
            </button>
            <button
              type="button"
              className="botones btn btn-primary"
              onClick={() => mostrarConsentimiento(dataSelected)}
            >
              Consentimiento informado
            </button>

            {datos.service_id === "5" ? (
              <button
                type="button"
                className="botones btn btn-primary"
                onClick={() => mostrarFichaCovid()}
              >
                Ficha COVID 19
              </button>
            ) : null}
          </div>

          <div class="contenedorPDF">
            <div className="containerPDF">
              <DeclaracionJurada
                declaracion={declaracion}
                setDeclaracion={setDeclaracion}
                condicion={condicion}
                setCondicion={setCondicion}
                formulario={formulario}

              />
            </div>

            <div className="containerPDF1">
              <ConsentimientoInformado
                dataSelected={dataSelected}
                datos={datos}
                formulario={formulario}
                consentimiento={consentimiento}
                setConsentimiento={setConsentimiento}
              />
            </div>

            <div className="containerPDF2">
              <FichaCovid19
                ficha={ficha}
                setFicha={setFicha}
                formulario={formulario}
                dataSelected={dataSelected}
              />
            </div>
          </div>
        </div>
        <div className="botones2">
          <button
            type="button"
            className="botones btn btn-primary"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="botones btn btn-primary"
            onClick={() => crearAtencion()}
          >
            Finalizar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MGenerarAtencion;
