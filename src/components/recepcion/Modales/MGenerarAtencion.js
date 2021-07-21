import Modal from "react-modal";
import { customStyles } from "../../../helpers/tablaOpciones";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import DeclaracionJurada from "../FormatosPDF/DeclaracionJurada";
import ConsentimientoInformado from "../FormatosPDF/ConsentimientoInformado";
import FichaCovid19 from "../FormatosPDF/FichaCovid19";
import { fetchGETPOSTPUTDELETE } from "../../../helpers/fetch";

const MGenerarAtencion = ({
  generarAtencion,
  setGenerarAtencion,
  dataSelected,
  getAttention,
}) => {
  const closeModal = () => {
    setGenerarAtencion(false);
  };
  const [datos, setDatos] = useState({});
  const [condicion, setCondicion] = useState({});

  const [declaracion, setDeclaracion] = useState({});
  const [ficha, setFicha] = useState({});
  const [services, setServices] = useState({});
  const [clinics, setClinics] = useState({});

  const getServices = () => {
    fetchGETPOSTPUTDELETE("services")
      .then((res) => res.json())
      .then((res) => setServices(res.data));
  };
  const getClinics = () => {
    fetchGETPOSTPUTDELETE("clinics")
      .then((res) => res.json())
      .then((res) => setClinics(res.data));
  };
  useEffect(() => {
    getServices();
    getClinics();
  }, []);

  const getFecha = () => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.toLocaleString("default", { month: "long" });
    let year = newDate.getFullYear();

    return `${date}${" de "}${month}${" "}${"de "}${year}`;
  };
  
  console.log(dataSelected);

  const crearAtencion = () => {
    const formData = new FormData();
    formData.set("date_attention", getFecha() || "");
    formData.set("time_attention", getFecha() || "");
    formData.set("people_id", dataSelected.id || "");
    formData.set("service_id", datos.service_id || "");
    formData.set("clinic_id", 1 || "");
    formData.set("codebar", dataSelected.id);
    // formData.set("forms", "");

    // formData.set("user_type_id ", 2)

    fetchGETPOSTPUTDELETE("attention", formData, "POST").then((res) => {
      console.log(res);
      if (res.status === 200) {
        closeModal();
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Se ha genero la atención correctamente.",
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

  console.log(datos);

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
      <h3 className="title__modal">Generar atencion</h3>
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
          <label htmlFor="">Empresa: {dataSelected.business_name}</label>
        </div>

        <div className="container1">
          <label htmlFor="" className="mt-3">
            Seleccionar servicio
          </label>

          <div className="tipoServicio mt-3">
            <div className="">
              <label htmlFor="">Tipo de servicio:</label>
              <select
                class="form-select"
                aria-label="Default select example"
                name="clinic_id"
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
              />
            </div>

            <div className="containerPDF1">
              <ConsentimientoInformado
                dataSelected={dataSelected}
                datos={datos}
              />
            </div>

            <div className="containerPDF2">
              <FichaCovid19 ficha={ficha} setFicha={setFicha} />
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
