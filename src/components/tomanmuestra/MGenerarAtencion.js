/* eslint-disable */
import Modal from "react-modal";
import { customStyles } from "../../helpers/tablaOpciones";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import DeclaracionJurada from "../recepcion/FormatosPDF/DeclaracionJurada";
import ConsentimientoInformado from "../recepcion/FormatosPDF/ConsentimientoInformado";
import FichaCovid19 from "../recepcion/FormatosPDF/FichaCovid19";
import {
  fetchGETPOSTPUTDELETE,
  fetchGETPOSTPUTDELETEJSON,
} from "../../helpers/fetch";

const MGenerarAtencion = ({
  openGenerarAtencion,
  setOpenGenerarAtencion,
  dataSelected,
  formulario,
}) => {
  const closeModal = () => {
    setOpenGenerarAtencion(false);
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
          dataSelected.usuario &&
          dataSelected.usuario &&
          dataSelected.usuario.user &&
          dataSelected.usuario.user.user_type &&
          dataSelected.usuario.user.user_type.id,
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
    console.log(ficha);
    const atencion = {
      date_attention: getFecha() || "",
      time_attention: getHora() || "",
      people_id: dataSelected.people_id,
      service_id: datos.service_id,
      clinic_id: dataSelected.clinic_id,
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

    const prueba = document.getElementById("categoria").value;
    const prueba1 = document.getElementById("subcategoria").value;

    fetchGETPOSTPUTDELETEJSON("attention", atencion, "POST").then((res) => {
      console.log(res);
      if (res.status === 200) {
        closeModal();
        Swal.fire({
          icon: "success",
          title: "??xito",
          text: "Se gener?? la atenci??n correctamente.",
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
          title: "Ups??",
          text: "Algo sali?? mal.",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Cerrar",
        });
      }
    });
  };

  const handleOnChange = (e) => {
    setDatos({
      ...datos,

      [e.target.name]: e.target.value,
    });
  };
  console.log(datos);

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
      isOpen={openGenerarAtencion}
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
      <h3 className="title__modal">Generar atenci??n</h3>
      <div className="generarAtencion">
        <div className="datosPaciente">
          <label htmlFor="">
            <strong>Paciente: </strong>
            {dataSelected.paciente ? dataSelected.paciente : ""}
          </label>
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
              value={datos.user_type_id}
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
            dataSelected.compania &&
            dataSelected.compania.corporation &&
            dataSelected.compania.corporation.commercial_name
              ? dataSelected.compania.corporation.commercial_name
              : "---"}
          </label>

          <label htmlFor="">
            <strong>RRHH: </strong>
            {dataSelected &&
            dataSelected.compania &&
            dataSelected.compania.corporation &&
            dataSelected.compania.corporation &&
            dataSelected.compania.corporation.contacts[1] &&
            dataSelected.compania.corporation.contacts[1].name
              ? dataSelected.compania.corporation.contacts[1].name
              : "---"}
          </label>

          <label htmlFor="">
            <strong>Tel??fono: </strong>
            {dataSelected &&
            dataSelected.compania &&
            dataSelected.compania.corporation &&
            dataSelected.compania.corporation &&
            dataSelected.compania.corporation.contacts[1] &&
            dataSelected.compania.corporation.contacts[1].phone
              ? dataSelected.compania.corporation.contacts[1].phone
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
              <label htmlFor="">Plan de atenci??n:</label>

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
                    dataSelected.compania &&
                    dataSelected.compania.company_service &&
                    dataSelected.compania.company_service
                      .filter((item) => item.state === 1)
                      .map((data, i) => (
                        <option key={i} title={data.name} value={data.id}>
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
              class="botones btn btn-primary"
              onClick={() => mostrarDeclaracionJurada()}
            >
              Declaraci??n jurada
            </button>
            <button
              type="button"
              class="botones btn btn-primary"
              onClick={() => mostrarConsentimiento()}
            >
              Consentimiento informado
            </button>

            {datos.service_id === "5" ? (
              <button
                type="button"
                class="botones btn btn-primary"
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
              />
            </div>
          </div>
        </div>
        <div className="botones2">
          <button
            type="button"
            class="botones btn btn-primary"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            type="button"
            class="botones btn btn-primary"
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
