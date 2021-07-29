import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal";
import {
  fetchGETPOSTPUTDELETE,
  fetchGETPOSTPUTDELETEJSON,
} from "../../helpers/fetch";
import { customStyles } from "../../helpers/tablaOpciones";
import { UploadAvatar } from "../uploadAvatar/uploadAvatar";
import WebCamScreenshot from "../webcam/WebCamScreenshot";
import Swal from "sweetalert2";

const MCrearPaciente = ({
  addRegistro,
  setAddRegistro,
  dataSelected,
  getAttention,
  editar,
  setEditar,
  setDataSelected,
}) => {
  const [avatar, setAvatar] = useState(null);
  const [imagenes, setImagenes] = useState(false);
  const [paciente, setPaciente] = useState({
    document_type_id: "",
    dni: "",
    name: "",
    pat_lastname: "",
    mom_lastname: "",
    gender_id: "",
    birthday: "",
    cellphone: "",
    email: "",
    user_type_id: "",
    reference: "",
  });
  const [religions, setReligions] = useState({});
  const [company, setCompany] = useState({});
  const [departamentos, setDepartamentos] = useState({});
  const [provinces, setProvinces] = useState({});
  const [districts, setDistricts] = useState();

  const closeModal = () => {
    setAddRegistro(false);
    setEditar(false);
    setDataSelected(null);
  };
  const handleCambio = () => {
    setImagenes(true);
  };

  const handleChange = (e) => {
    setPaciente({
      ...paciente,
      [e.target.name]: e.target.value,
    });
  };

  const getDepartments = () => {
    fetchGETPOSTPUTDELETE("departamentos")
      .then((res) => res.json())
      .then((res) => setDepartamentos(res.departments));
  };

  const getReligions = () => {
    fetchGETPOSTPUTDELETE("religions", null, "GET")
      .then((res) => res.json())
      .then((res) => setReligions(res.religions));
  };

  console.log(religions);
  const getCompany = () => {
    fetchGETPOSTPUTDELETE("company", null, "GET")
      .then((res) => res.json())
      .then((res) => setCompany(res.data));
  };

  useEffect(() => {
    getReligions();
    getCompany();
    getDepartments();
  }, []);
  console.log(dataSelected);
  const crearPaciente = () => {
    if (paciente.document_type_id === "" || null) {
      document.getElementById("document").style =
        "border:1px solid red !important";
    }
    if (paciente.dni === "" || null) {
      document.getElementById("dni").style = "border:1px solid red !important";
    }
    if (paciente.name === "" || null) {
      document.getElementById("nombre").style =
        "border:1px solid red !important";
    }

    if (paciente.pat_lastname === "" || null) {
      document.getElementById("apellido1").style =
        "border:1px solid red !important";
    }
    if (paciente.mom_lastname === "" || null) {
      document.getElementById("apellido2").style =
        "border:1px solid red !important";
    }
    if (paciente.gender_id === "" || null) {
      document.getElementById("genero").style =
        "border:1px solid red !important";
    }
    if (paciente.birthday === "" || null) {
      document.getElementById("birthday").style =
        "border:1px solid red !important";
    }
    if (paciente.cellphone === "" || null) {
      document.getElementById("phone").style =
        "border:1px solid red !important";
    }
    if (paciente.email === "" || null) {
      document.getElementById("email").style =
        "border:1px solid red !important";
    }

    if (paciente.user_type_id === "" || null) {
      document.getElementById("user_type").style =
        "border:1px solid red !important";
    }
    if (paciente.reference === "" || null) {
      document.getElementById("reference").style =
        "border:1px solid red !important";
    }

    const formData = new FormData();
    formData.set("document_type_id", paciente.document_type_id || "");
    formData.set("dni", paciente.dni || "");
    formData.set("name", paciente.name || "");
    formData.set("pat_lastname", paciente.pat_lastname || "");
    formData.set("mom_lastname", paciente.mom_lastname || "");
    formData.set("gender_id", paciente.gender_id || "");
    formData.set("birthday", paciente.birthday || "");
    formData.set("religion_id", 1);
    formData.set("department_id", paciente.department_id || "");
    formData.set("civil_status_id", paciente.civil_status_id || "");
    formData.set("grade_id", paciente.grade_id || "");
    formData.set("cellphone", paciente.cellphone || "");
    formData.set("phone", paciente.phone || "");
    formData.set("email", paciente.email || "");
    formData.set("emergency_phone", paciente.emergy_phone || "");
    formData.set("contact_emergency", paciente.contact_emergency || "");
    formData.set("company_id", Number(paciente.company_id) || "");
    formData.set("workstation", paciente.workstation || "");
    formData.set("birthplace", "");
    formData.set("address", paciente.address || "");
    formData.set("reference", paciente.reference || "");
    formData.set("district_id", paciente.district_id || "");
    formData.set("department_id", paciente.district_id || "");
    formData.set("user_type_id", paciente.user_type_id || "");
    // formData.set("country_id", paciente.country_id || "");
    formData.set("grade_id", "");

    if (
      (paciente.document_type_id !== "" ||
        (null && paciente.document_type_id !== "") ||
        null,
      paciente.dni !== "" ||
        (null && paciente.ame !== "") ||
        (null && paciente.pat_lastname !== "") ||
        (null && paciente.mom_lastname !== "") ||
        (null && paciente.gender_id !== "") ||
        (null && paciente.birthday !== "") ||
        (null && paciente.cellphone !== "") ||
        (null && paciente.email !== "") ||
        (null && paciente.user_type_id !== "") ||
        null)
    ) {
      fetchGETPOSTPUTDELETE("patient", formData, "POST").then((data) => {
        if (data.status === 200) {
          closeModal();
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Se ha creado el paciente correctamente.",
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

  const actualizarPaciente = () => {
    const formData = new FormData();
    formData.set(
      "document_type_id",
      paciente.document_type_id
        ? paciente.document_type_id
        : dataSelected && dataSelected.document_type_id
        ? dataSelected.document_type_id
        : ""
    );
    formData.set(
      "dni",
      paciente.dni
        ? paciente.dni
        : dataSelected && dataSelected.dni
        ? dataSelected.dni
        : ""
    );
    formData.set(
      "name",
      paciente.name
        ? paciente.name
        : dataSelected && dataSelected.name
        ? dataSelected.name
        : ""
    );
    formData.set(
      "pat_lastname",
      paciente.pat_lastname
        ? paciente.pat_lastname
        : dataSelected && dataSelected.pat_lastname
        ? dataSelected.pat_lastname
        : ""
    );
    formData.set(
      "mom_lastname",
      paciente.mom_lastname
        ? paciente.mom_lastname
        : dataSelected && dataSelected.mom_lastname
        ? dataSelected.mom_lastname
        : ""
    );
    formData.set("gender_id", paciente.gender_id || "");
    formData.set("birthday", paciente.birthday || "");
    formData.set("religion_id", 1);
    formData.set("department_id", paciente.department_id || "");
    formData.set("civil_status_id", paciente.civil_status_id || "");
    formData.set("grade_id", paciente.grade_id || "");
    formData.set("cellphone", paciente.cellphone || "");
    formData.set("phone", paciente.phone || "");
    formData.set("email", paciente.email || "");
    formData.set("emergency_phone", paciente.emergy_phone || "");
    formData.set("contact_emergency", paciente.contact_emergency || "");
    formData.set("company_id", "");
    formData.set("workstation", paciente.workstation || "");
    formData.set("birthplace", "");
    formData.set("address", paciente.address || "");
    formData.set("reference", paciente.reference || "");
    formData.set("district_id", paciente.district_id || "");
    formData.set("department_id", paciente.district_id || "");
    formData.set("user_type_id", paciente.user_type_id || "");
    // formData.set("country_id", paciente.country_id || "");
    formData.set("grade_id", "");

    fetchGETPOSTPUTDELETE(`patient/${dataSelected.id}`, formData, "POST").then(
      (data) => {
        if (data.status === 200) {
          closeModal();
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Se actualizo el paciente correctamente.",
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
            title: "!Ups¡",
            text: "Algo salió mal.",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cerrar",
          });
        }
      }
    );
  };

  const getProvinces = () => {
    //devuelve solo el objeto con el id = a department_id
    const provincias =
      departamentos.length > 0 &&
      departamentos.filter(
        (data) => data.id === Number(paciente.department_id)
      );

    setProvinces(provincias);

    const distritos = provinces.length > 0 && provinces.map((data, i) => data);

    setDistricts(distritos);
  };

  useEffect(() => {
    getProvinces();
  }, [paciente]);

  return (
    <Modal
      isOpen={addRegistro}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal mrecepcion__usuario"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      {editar ? (
        <h3 className="title__modal">Editar paciente</h3>
      ) : (
        <h3 className="title__modal">Registro de nuevo paciente</h3>
      )}{" "}
      <div className="container">
        <div className="row">
          <div className="col-md-6 mreceptcion__crearusuario">
            <div>
              <p>Datos generales</p>
              <div>
                <label htmlFor="">Tipo de documento:</label>
                <select
                  name="document_type_id"
                  id="document"
                  defaultValue={
                    dataSelected && dataSelected.document_type_id === 1
                      ? 1
                      : dataSelected && dataSelected.document_type_id === 2
                      ? 2
                      : dataSelected && dataSelected.document_type_id === 3
                      ? 3
                      : ""
                  }
                  onChange={(e) => handleChange(e)}
                >
                  <option selected>Seleccione</option>
                  <option value="1">Dni</option>
                  <option value="2">Pasaporte</option>
                  <option value="3">Carne de extranjeria</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Número de documento:</label>
                <input
                  type="number"
                  placeholder=""
                  name="dni"
                  id="dni"
                  defaultValue={
                    dataSelected && dataSelected.dni ? dataSelected.dni : ""
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="">Apellido paterno:</label>
                <input
                  type="text"
                  placeholder=""
                  name="pat_lastname"
                  id="apellido1"
                  defaultValue={
                    dataSelected && dataSelected.pat_lastname
                      ? dataSelected.pat_lastname
                      : ""
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="">Apellido materno:</label>
                <input
                  type="text"
                  placeholder=""
                  name="mom_lastname"
                  id="apellido2"
                  defaultValue={
                    dataSelected && dataSelected.mom_lastname
                      ? dataSelected.mom_lastname
                      : ""
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label htmlFor="">Nombre:</label>
                <input
                  type="text"
                  placeholder=""
                  name="name"
                  id="nombre"
                  defaultValue={
                    dataSelected && dataSelected.name ? dataSelected.name : ""
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div>
              <p>Datos de nacimiento:</p>
              <div>
                <label htmlFor="">Sexo:</label>
                <select
                  name="gender_id"
                  id="genero"
                  defaultValue={
                    dataSelected && dataSelected.gender_id === 1
                      ? 1
                      : dataSelected && dataSelected.gender_id === 2
                      ? 2
                      : ""
                  }
                  onChange={(e) => handleChange(e)}
                >
                  <option selected>Seleccione</option>
                  <option value="1">Masculino</option>
                  <option value="2">Femenino</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Fecha de nacimiento:</label>
                <input
                  type="date"
                  placeholder=""
                  name="birthday"
                  id="birthday"
                  defaultValue={dataSelected && dataSelected.birthday}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {/* <div>
                <label htmlFor="">Edad:</label>
                <input type="number" placeholder="" />
              </div> */}
              <div>
                <label htmlFor="">Religión:</label>
                <select
                  name="religion_id"
                  defaultValue={
                    1
                  }
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Seleccione</option>
                  {religions.length > 0 &&
                    religions.map((data, i) => (
                      <option key={i} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="">País: </label>
                <select name="country_id" onChange={(e) => handleChange(e)}>
                  <option value="">Seleccione</option>
                  <option value="1">Perú</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Departmento:</label>
                <select name="department_id" onChange={(e) => handleChange(e)}>
                  <option value="">Seleccione</option>

                  {departamentos.length > 0 &&
                    departamentos.map((data, i) => (
                      <option value={data.id}>{data.name}</option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="">Provincia:</label>
                <select name="province_id" onChange={(e) => handleChange(e)}>
                  <option value="">Seleccione</option>

                  {provinces.length > 0 &&
                    provinces.map((data, i) =>
                      data.provinces.map((prov, i) => (
                        <option key={i} value={prov.id}>
                          {prov.name}
                        </option>
                      ))
                    )}
                </select>
              </div>
              <div>
                <label htmlFor="">Distrito: </label>
                <select name="district_id" onChange={(e) => handleChange(e)}>
                  <option value="">Seleccione</option>
                  {provinces.length > 0 &&
                    provinces.map((data, i) =>
                      data.provinces[i].districts.map((dat, i) => (
                        <option key={i} value={i}>
                          {dat.name}
                        </option>
                      ))
                    )}
                </select>
              </div>
            </div>
            <div>
              <p>Datos de domicilio</p>
              <div>
                <label htmlFor="">País: </label>
                <select>
                  <option selected>Seleccione</option>
                  <option value="1">Perú</option>
                </select>
              </div>

              <div>
                <label htmlFor="">Departmento:</label>
                <select
                // name="department_id2" onChange={(e) => handleChange(e)}
                >
                  <option value="">Seleccione</option>

                  {departamentos.length > 0 &&
                    departamentos.map((data, i) => (
                      <option value={data.id}>{data.name}</option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="">Provincia:</label>
                <select
                // name="province_id" onChange={(e) => handleChange(e)}
                >
                  <option value="">Seleccione</option>
                  {provinces.length > 0 &&
                    provinces.map((data, i) =>
                      data.provinces.map((prov, i) => (
                        <option key={i} value={prov.id}>
                          {prov.name}
                        </option>
                      ))
                    )}
                </select>
              </div>

              <div>
                <label htmlFor="">Distrito: </label>
                <select>
                  <option selected>Seleccione</option>
                  {provinces.length > 0 &&
                    provinces.map((data, i) =>
                      data.provinces[i].districts.map((dat, i) => (
                        <option key={i} value={i}>
                          {dat.name}
                        </option>
                      ))
                    )}
                </select>
              </div>
              <div>
                <label htmlFor="">Dirección:</label>
                <input
                  type="text"
                  placeholder=""
                  name="reference"
                  id="reference"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 mreceptcion__crearusuario">
            <div>
              <p>Otros datos</p>
              <div>
                <label htmlFor="">Estado civil:</label>
                <select
                  name="civil_status_id"
                  onChange={(e) => handleChange(e)}
                >
                  <option selected>Seleccione</option>
                  <option value="1">Soltero</option>
                  <option value="2">Casado</option>
                  <option value="3">Divorciado</option>
                  <option value="4">Viudo</option>
                </select>
              </div>

              <div>
                <label htmlFor="">Grado de instrucción:</label>
                <select name="grade_id" onChange={(e) => handleChange(e)}>
                  <option value="">Seleccione</option>
                  <option value="1">Primaria</option>
                  <option value="2">Secundaria</option>
                  <option value="3">Superior</option>
                </select>
              </div>

              <div>
                <label htmlFor="">Teléfono celular:</label>
                <input
                  type="text"
                  placeholder=""
                  name="cellphone"
                  id="phone"
                  onChange={(e) => handleChange(e)}
                  defaultValue={
                    dataSelected && dataSelected.cellphone
                      ? dataSelected.cellphone
                      : ""
                  }
                />
              </div>

              <div>
                <label htmlFor="">Teléfono fijo:</label>
                <input
                  type="text"
                  placeholder=""
                  name="phone"
                  onChange={(e) => handleChange(e)}
                  defaultValue={
                    dataSelected && dataSelected.phone ? dataSelected.phone : ""
                  }
                />
              </div>

              <div>
                <label htmlFor="">Correo:</label>
                <input
                  type="text"
                  placeholder=""
                  name="email"
                  id="email"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label htmlFor="">Teléfono de emergencia:</label>
                <input
                  type="text"
                  placeholder=""
                  name="emergency_phone"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label htmlFor="">Contacto de emergencia:</label>
                <input
                  type="text"
                  placeholder=""
                  name="contact_emergency"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div>
              <p>Puesto ocupacional</p>
              <div>
                <input
                  type="text"
                  placeholder=""
                  name="workstation"
                  onChange={(e) => handleChange(e)}
                  defaultValue={
                    dataSelected && dataSelected.workstation
                      ? dataSelected.workstation
                      : ""
                  }
                />
              </div>
              {/*  */}
              <div>
                <label htmlFor="">Tipo de usuario:</label>
                <select
                  name="user_type_id"
                  id="user_type"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Seleccione</option>
                  <option value="1">Empresa</option>
                  <option value="2">Particular</option>
                </select>
              </div>
              {paciente.user_type_id === "1" ? (
                <div>
                  <label htmlFor="">Empresa:</label>
                  <select name="company_id" onChange={(e) => handleChange(e)}>
                    <option value="">Seleccione</option>

                    {company &&
                      company.map((data, i) => (
                        <option key={i} value={data.id}>
                          {data.corporation.business_name}
                        </option>
                      ))}
                  </select>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <div>
                <p>Fotografía</p>
                <i className="fas fa-camera" onClick={handleCambio}></i>
              </div>
              <div>
                {!imagenes ? (
                  <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
                ) : (
                  <WebCamScreenshot />
                )}
              </div>
            </div>

            <div className="list-botones">
              <button className="botones" onClick={closeModal}>
                Cancelar
              </button>

              {editar ? (
                <button className="botones" onClick={actualizarPaciente}>
                  Editar
                </button>
              ) : (
                <button className="botones" onClick={crearPaciente}>
                  Agregar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MCrearPaciente;
