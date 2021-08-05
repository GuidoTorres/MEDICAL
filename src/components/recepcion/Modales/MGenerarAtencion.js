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
  };
  const [datos, setDatos] = useState({});
  const [condicion, setCondicion] = useState({});

  const [declaracion, setDeclaracion] = useState();
  const [ficha, setFicha] = useState([]);
  const [services, setServices] = useState({});
  const [clinics, setClinics] = useState({});
  const [departamentos, setDepartamentos] = useState({});

  const getServices = () => {
    fetchGETPOSTPUTDELETE("services")
      .then((res) => res.json())
      .then((res) => setServices(res.data));
  };

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
  const getClinics = () => {
    fetchGETPOSTPUTDELETE("clinics")
      .then((res) => res.json())
      .then((res) => setClinics(res.data));
  };

  useEffect(() => {
    getServices();
    getClinics();
    generarDeclaracion();
  }, []);

  console.log(datos);

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
    const atencion = {
      date_attention: getFecha() || "",
      time_attention: getHora() || "",
      people_id: dataSelected.id,
      service_id: datos.service_id,
      clinic_id: 1,
      codebar: dataSelected.id,
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
      ],
    };

    const prueba = document.getElementById("categoria").value;
    const prueba1 = document.getElementById("subcategoria").value;

    console.log(prueba);
    console.log(prueba1);

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
            Paciente:{" "}
            {dataSelected.name +
              " " +
              dataSelected.pat_lastname +
              " " +
              dataSelected.mom_lastname}
          </label>
          <label htmlFor="">
            Tipo de paciente:{" "}
            {dataSelected.user &&
              dataSelected.user.user_type &&
              dataSelected.user.user_type &&
              dataSelected.user.user_type.name}
          </label>
          <label htmlFor="">
            Empresa:{" "}
            {dataSelected.business_name ? dataSelected.business_name : "---"}
          </label>
        </div>

        <div className="container1">
          <label htmlFor="" className="mt-3">
            <strong>Seleccionar servicio</strong>
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
              <select
                class="form-select"
                aria-label="Default select example"
                disabled={datos.clinic_id === "1" ? false : true}
                name="service_id"
                id="subcategoria"
                onChange={(e) => {
                  handleOnChange(e);
                  console.log(e);
                  // setPrueba(e.target);
                }}
              >
                <option selected>Seleccione</option>

                {services &&
                  services[0] &&
                  services[0].services &&
                  services[0].services.map((data, i) => (
                    <option key={i} title={data.name} value={data.id}>
                      {data.name}
                    </option>
                  ))}
              </select>
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
              Declaración jurada
            </button>
            <button
              type="button"
              class="botones btn btn-primary"
              onClick={() => mostrarConsentimiento(dataSelected)}
            >
              Consentimiento informado
            </button>
            <button
              type="button"
              class="botones btn btn-primary"
              onClick={() => mostrarFichaCovid()}
            >
              Ficha COVID 19
            </button>
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
