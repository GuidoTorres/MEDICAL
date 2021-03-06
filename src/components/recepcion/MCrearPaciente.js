/* eslint-disable */
import React, { useEffect } from "react";
import { useState } from "react";
import Modal from "react-modal";
import {
  fetchDNI,
  fetchGETPOSTPUTDELETE,
  fetchGETPOSTPUTDELETEJSON,
} from "../../helpers/fetch";
import { customStyles } from "../../helpers/tablaOpciones";
import { UploadAvatar } from "../uploadAvatar/uploadAvatar";
import WebCamScreenshot from "../webcam/WebCamScreenshot";
import Swal from "sweetalert2";
import ImagenPaciente from "../uploadAvatar/ImagenPaciente";

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
  const [paciente2, setPaciente2] = useState({});
  const [religions, setReligions] = useState({});
  const [company, setCompany] = useState({});
  const [departamentos, setDepartamentos] = useState({});
  const [provinces, setProvinces] = useState({});
  const [districts, setDistricts] = useState();
  const [dni, setDni] = useState({});

  const [provinces1, setProvinces1] = useState({});
  const [districts1, setDistricts1] = useState({});

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

  const getCompany = () => {
    fetchGETPOSTPUTDELETE("company", null, "GET")
      .then((res) => res.json())
      .then((res) => setCompany(res.data));
  };
  const getDni = () => {
    fetchDNI(paciente.dni, "GET")
      .then((res) => res.json())
      .then((res) => setDni(res));
  };
  useEffect(() => {
    if (editar) ObtenerData();
  }, []);

  const ObtenerData = () => {
    setPaciente({
      country_b: dataSelected.country_b,
      department_b: dataSelected.department_b,
      province_b: dataSelected.province_b,
      district_b: dataSelected.district_b,
      country_id: dataSelected.country_id,
      department_id: dataSelected.department_id,
      province_id: dataSelected.province_id,
      district_id: dataSelected.district_id,
      grade_id: dataSelected.grade_id,
    });
  };

  useEffect(() => {
    if (paciente && paciente.dni && paciente.dni.length === 8) {
      getDni();
    }
  }, [paciente.dni]);

  useEffect(() => {
    getReligions();
    getCompany();
    getDepartments();
  }, []);

  const crearPaciente = () => {
    // if (paciente.document_type_id === "" || null) {
    //   document.getElementById("document").style =
    //     "border:1px solid red !important";
    // }
    // if (paciente.dni === "" || null) {
    //   document.getElementById("dni").style = "border:1px solid red !important";
    // }
    // if (paciente.name === "" || null) {
    //   document.getElementById("nombre").style =
    //     "border:1px solid red !important";
    // }

    // if (paciente.pat_lastname === "" || null) {
    //   document.getElementById("apellido1").style =
    //     "border:1px solid red !important";
    // }
    // if (paciente.mom_lastname === "" || null) {
    //   document.getElementById("apellido2").style =
    //     "border:1px solid red !important";
    // }
    // if (paciente.gender_id === "" || null) {
    //   document.getElementById("genero").style =
    //     "border:1px solid red !important";
    // }
    // if (paciente.birthday === "" || null) {
    //   document.getElementById("birthday").style =
    //     "border:1px solid red !important";
    // }
    // if (paciente.cellphone === "" || null) {
    //   document.getElementById("phone").style =
    //     "border:1px solid red !important";
    // }
    // if (paciente.email === "" || null) {
    //   document.getElementById("email").style =
    //     "border:1px solid red !important";
    // }

    // if (paciente.user_type_id === "" || null) {
    //   document.getElementById("user_type").style =
    //     "border:1px solid red !important";
    // }
    // if (paciente.reference === "" || null) {
    //   document.getElementById("reference").style =
    //     "border:1px solid red !important";
    // }

    const formData = new FormData();
    formData.set("document_type_id", paciente.document_type_id || "");
    formData.set("dni", paciente.dni || "");
    formData.set("name", dni.nombres || paciente.name || "");
    formData.set(
      "pat_lastname",
      dni.apellidoPaterno || paciente.pat_lastname || ""
    );
    formData.set(
      "mom_lastname",
      dni.apellidoMaterno || paciente.mom_lastname || ""
    );
    formData.set("gender_id", paciente.gender_id || "");
    formData.set("birthday", paciente.birthday || "");
    formData.set("religion_id", 1);
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
    formData.set("reference", paciente.address || "");
    formData.set("district_id", paciente.district_id || "");
    formData.set("country_b", paciente.country_b || "");
    formData.set("department_b", paciente.department_b || "");
    formData.set("province_b", paciente.province_b || "");
    formData.set("district_b", paciente.district_b || "");
    formData.set("country_id", paciente.country_id || "");
    formData.set("department_id", paciente.department_id || "");
    formData.set("province_id", paciente.province_id || "");
    formData.set("district_id", paciente.district_id || "");

    formData.set("civil_status_id", paciente.civil_status_id || "");
    formData.set("user_type_id", paciente.user_type_id || "");

    // if (
    //   (paciente.document_type_id !== "" ||
    //     (null && paciente.document_type_id !== "") ||
    //     null,
    //   paciente.dni !== "" ||
    //     (null && paciente.ame !== "") ||
    //     (null && paciente.pat_lastname !== "") ||
    //     (null && paciente.mom_lastname !== "") ||
    //     (null && paciente.gender_id !== "") ||
    //     (null && paciente.birthday !== "") ||
    //     (null && paciente.cellphone !== "") ||
    //     (null && paciente.email !== "") ||
    //     (null && paciente.user_type_id !== "") ||
    //     null)
    // ) {
    fetchGETPOSTPUTDELETE("patient", formData, "POST").then((data) => {
      if (data.status === 200) {
        closeModal();
        Swal.fire({
          icon: "success",
          title: "??xito",
          text: "Se cre?? el paciente correctamente.",
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
          title: "!Ups??",
          text: "Algo sali?? mal.",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Cerrar",
        });
      }
    });
    // }
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
    formData.set(
      "gender_id",
      paciente.gender_id
        ? paciente.gender_id
        : dataSelected && dataSelected.gender_id
        ? dataSelected.gender_id
        : ""
    );
    formData.set(
      "birthday",
      paciente.birthday
        ? paciente.birthday
        : dataSelected && dataSelected.birthday
        ? dataSelected.birthday
        : ""
    );
    formData.set(
      "religion_id",
      paciente.religion_id
        ? paciente.religion_id
        : dataSelected.religion_id
        ? dataSelected.religion_id
        : ""
    );

    formData.set(
      "civil_status_id",
      paciente.civil_status_id
        ? paciente.civil_status_id
          ? dataSelected && dataSelected.civil_status_id
          : dataSelected.civil_status_id
        : ""
    );
    formData.set(
      "grade_id",
      paciente.grade_id
        ? paciente.grade_id
        : dataSelected && dataSelected.grade_id
        ? dataSelected.grade_id
        : ""
    );
    formData.set(
      "cellphone",
      paciente.cellphone
        ? paciente.cellphone
        : dataSelected && dataSelected.cellphone
        ? dataSelected.cellphone
        : ""
    );
    formData.set(
      "phone",
      paciente.phone
        ? paciente.phone
        : dataSelected && dataSelected.phone
        ? dataSelected.phone
        : ""
    );
    formData.set(
      "email",
      paciente.email
        ? paciente.email
        : dataSelected && dataSelected.email
        ? dataSelected.email
        : ""
    );
    formData.set(
      "emergency_phone",
      paciente.emergency_phone
        ? paciente.emergency_phone
        : dataSelected && dataSelected.emergency_phone
        ? dataSelected.emergency_phone
        : ""
    );
    formData.set(
      "contact_emergency",
      paciente.contact_emergency
        ? paciente.contact_emergency
        : dataSelected && dataSelected.contact_emergency
        ? dataSelected.contact_emergency
        : ""
    );
    formData.set("company_id", "");
    formData.set(
      "workstation",
      paciente.workstation
        ? paciente.workstation
        : dataSelected && dataSelected.workstation
        ? dataSelected.workstation
        : ""
    );
    formData.set("birthplace", "");
    formData.set(
      "address",
      paciente.address
        ? paciente.address
        : dataSelected && dataSelected.address && dataSelected.address.address
        ? dataSelected.address.address
        : ""
    );
    formData.set("reference", paciente.reference || "");
    formData.set(
      "country_b",
      paciente.country_b
        ? paciente.country_b
        : dataSelected && dataSelected.country_b
        ? dataSelected.country_b
        : ""
    );
    formData.set(
      "department_b",
      paciente.department_b
        ? paciente.department_b
        : dataSelected && dataSelected.department_b
        ? dataSelected.department_b
        : ""
    );
    formData.set(
      "province_b",
      paciente.province_b
        ? paciente.province_b
        : dataSelected && dataSelected.province_b
        ? dataSelected.province_b
        : ""
    );
    formData.set(
      "district_b",
      paciente.district_b
        ? paciente.district_b
        : dataSelected && dataSelected.district_b
        ? dataSelected.district_b
        : ""
    );
    formData.set(
      "country_id",
      paciente.country_id
        ? paciente.country_id
        : dataSelected && dataSelected.country_id
        ? dataSelected.country_id
        : ""
    );

    formData.set(
      "department_id",
      paciente.department_id
        ? paciente.department_id
        : dataSelected && dataSelected.department_id
        ? dataSelected.department_id
        : ""
    );
    formData.set(
      "province_id",
      paciente.province_id
        ? paciente.province_id
        : dataSelected && dataSelected.province_id
        ? dataSelected.province_id
        : ""
    );
    formData.set(
      "district_id",
      paciente.district_id
        ? paciente.district_id
        : dataSelected && dataSelected.district_id
        ? dataSelected.district_id
        : ""
    );
    formData.set(
      "user_type_id",
      paciente.user_type_id
        ? paciente.user_type_id
        : dataSelected && dataSelected.user && dataSelected.user.user_type_id
        ? dataSelected.user.user_type_id
        : ""
    );
    // formData.set("country_id", paciente.country_id || "");
    formData.set("photo", avatar && avatar.file ? avatar.file : "");

    fetchGETPOSTPUTDELETE(`patient/${dataSelected.id}`, formData, "POST").then(
      (data) => {
        if (data.status === 200) {
          closeModal();
          Swal.fire({
            icon: "success",
            title: "??xito",
            text: "Se actualiz?? el paciente correctamente.",
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
            title: "!Ups??",
            text: "Algo sali?? mal.",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Cerrar",
          });
        }
      }
    );
  };

  useEffect(() => {
    if (paciente.department_id && editar) {
      const provincias =
        departamentos.length > 0 &&
        departamentos.filter(
          (data) => data.id === Number(paciente.department_id)
        );

      setProvinces1(provincias);
    } else {
      const provincias =
        departamentos.length > 0 &&
        departamentos.filter(
          (data) => data.id === Number(paciente.department_id)
        );

      setProvinces1(provincias);
    }
  }, [departamentos, paciente.department_id]);

  useEffect(() => {
    if (paciente.department_id && editar) {
      const distritos =
        provinces1.length > 0 &&
        provinces1.map((data, i) =>
          data.provinces.filter((item, j) =>
            Number(item.id) === Number(paciente.province_id)
              ? item.districts
              : ""
          )
        );
      setDistricts1(distritos);
    } else {
      const distritos =
        provinces1.length > 0 &&
        provinces1.map((data, i) =>
          data.provinces.filter((item, j) =>
            Number(item.id) === Number(paciente.province_id)
              ? item.districts
              : ""
          )
        );
      setDistricts1(distritos);
    }
  }, [provinces1, paciente.province_id]);
  console.log(dataSelected);

  useEffect(() => {
    if (paciente.department_b && editar) {
      const provincias =
        departamentos.length > 0 &&
        departamentos.filter(
          (data) => data.id === Number(paciente.department_b)
        );

      setProvinces(provincias);
    } else {
      const provincias =
        departamentos.length > 0 &&
        departamentos.filter(
          (data) => data.id === Number(paciente.department_b)
        );

      setProvinces(provincias);
    }
  }, [departamentos, paciente.department_b]);

  useEffect(() => {
    if (paciente.department_b && editar) {
      const distritos =
        provinces.length > 0 &&
        provinces.map((data, i) =>
          data.provinces.filter((item, j) =>
            Number(item.id) === Number(paciente.province_b)
              ? item.districts
              : ""
          )
        );
      setDistricts(distritos);
    } else {
      const distritos =
        provinces.length > 0 &&
        provinces.map((data, i) =>
          data.provinces.filter((item, j) =>
            Number(item.id) === Number(paciente.province_b)
              ? item.districts
              : ""
          )
        );
      setDistricts(distritos);
    }
  }, [provinces, paciente.province_b]);

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
              <p>
                <strong>Datos generales:</strong>
              </p>
              <div className="mt-2">
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
                  <option value="1">DNI</option>
                  <option value="2">Pasaporte</option>
                  <option value="3">Carne de extranjeria</option>
                </select>
              </div>
              <div>
                <label htmlFor="">N??mero de documento:</label>
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
                    editar
                      ? dataSelected && dataSelected.pat_lastname
                        ? dataSelected.pat_lastname
                        : ""
                      : dni.apellidoPaterno
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
                    editar
                      ? dataSelected && dataSelected.mom_lastname
                        ? dataSelected.mom_lastname
                        : ""
                      : dni.apellidoMaterno
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
                    editar
                      ? dataSelected && dataSelected.name
                        ? dataSelected.name
                        : ""
                      : dni.nombres
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div>
              <p>
                <strong>Datos de nacimiento:</strong>
              </p>
              <div className="mt-2">
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
                  <option>Seleccione</option>
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
                <label htmlFor="">Religi??n:</label>
                <select
                  name="religion_id"
                  value={dataSelected && dataSelected.religion_id}
                  onChange={(e) => handleChange(e)}
                >
                  <option>Seleccione</option>
                  {religions.length > 0 &&
                    religions.map((data, i) => (
                      <option key={i} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="">Pa??s: </label>
                <select
                  value={paciente.country_b || ""}
                  name="country_b"
                  onChange={(e) => handleChange(e)}
                >
                  <option>Seleccione</option>
                  <option value="1">Per??</option>
                  <option value="2">Venezuela</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Departmento:</label>
                <select
                  value={paciente.department_b || ""}
                  name="department_b"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Seleccione</option>

                  {departamentos.length > 0 &&
                    departamentos.map((data, i) => (
                      <option key={i} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="">Provincia:</label>
                <select
                  value={paciente.province_b}
                  name="province_b"
                  onChange={(e) => handleChange(e)}
                >
                  <option>Seleccione</option>

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
                <select
                  value={paciente.district_b || ""}
                  name="district_b"
                  onChange={(e) => handleChange(e)}
                >
                  <option>Seleccione</option>
                  {districts &&
                    districts[0] &&
                    districts[0][0] &&
                    districts[0][0].districts.map((data, i) => (
                      <option key={i} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div>
              <p>
                <strong>Datos de domicilio:</strong>
              </p>
              <div className="mt-2">
                <label htmlFor="">Pa??s: </label>
                <select
                  value={paciente.country_b || ""}
                  name="country_id"
                  onChange={(e) => handleChange(e)}
                >
                  <option>Seleccione</option>
                  <option value="1">Per??</option>
                  <option value="2">Venezuela</option>
                </select>
              </div>

              <div>
                <label htmlFor="">Departamento:</label>
                <select
                  name="department_id"
                  value={paciente.department_id}
                  onChange={(e) => handleChange(e)}
                >
                  <option>Seleccione</option>

                  {departamentos.length > 0 &&
                    departamentos.map((data, i) => (
                      <option key={i} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="">Provincia:</label>
                <select
                  // name="province_id" onChange={(e) => handleChange(e)}
                  value={paciente.province_id || ""}
                  name="province_id"
                  onChange={(e) => handleChange(e)}
                >
                  <option>Seleccione</option>
                  {provinces1.length > 0 &&
                    provinces1.map((data, i) =>
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
                <select
                  name="district_id"
                  value={paciente.district_id || ""}
                  onChange={(e) => handleChange(e)}
                >
                  <option>Seleccione</option>
                  {districts1 &&
                    districts1[0] &&
                    districts1[0][0] &&
                    districts1[0][0].districts.map((data, i) => (
                      <option key={i} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="">Direcci??n:</label>
                <input
                  type="text"
                  placeholder=""
                  name="address"
                  id="reference"
                  defaultValue={
                    dataSelected &&
                    dataSelected.address &&
                    dataSelected.address.address
                      ? dataSelected.address.address
                      : ""
                  }
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 mreceptcion__crearusuario">
            <div>
              <p>
                <strong>Otros datos:</strong>
              </p>
              <div>
                <label htmlFor="">Estado civil:</label>
                <select
                  name="civil_status_id"
                  defaultValue={
                    dataSelected && dataSelected.civil_status_id
                      ? dataSelected.civil_status_id
                      : ""
                  }
                  onChange={(e) => handleChange(e)}
                >
                  <option>Seleccione</option>
                  <option value="1">Casado</option>
                  <option value="2">Soltero</option>
                  <option value="3">Viudo</option>
                  <option value="4">Divorciado</option>
                </select>
              </div>

              <div>
                <label htmlFor="">Grado de instrucci??n:</label>
                <select
                  value={paciente.grade_id || ""}
                  name="grade_id"
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Seleccione</option>
                  <option value="1">Primaria</option>
                  <option value="2">Secundaria</option>
                  <option value="3">Universitaria</option>
                  <option value="3">T??cnica</option>
                </select>
              </div>

              <div>
                <label htmlFor="">Tel??fono celular:</label>
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
                <label htmlFor="">Tel??fono fijo:</label>
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
                  defaultValue={
                    dataSelected && dataSelected.email ? dataSelected.email : ""
                  }
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div>
                <label htmlFor="">Tel??fono de emergencia:</label>
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
              <div>
                <label htmlFor="">Puesto ocupacional:</label>
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
            </div>
            <div>
              <div>
                <label htmlFor="">Tipo de usuario:</label>
                <select
                  name="user_type_id"
                  id="user_type"
                  defaultValue={
                    dataSelected &&
                    dataSelected.user &&
                    dataSelected.user.user_type &&
                    dataSelected.user.user_type.id
                      ? dataSelected.user.user_type.id
                      : ""
                  }
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
                <p>
                  <strong>Fotograf??a:</strong>
                </p>
                <i className="fas fa-camera" onClick={handleCambio}></i>
              </div>
              <div>
                {!imagenes ? (
                  <ImagenPaciente
                    avatar={avatar}
                    setAvatar={setAvatar}
                    dataSelected={dataSelected}
                  />
                ) : (
                  <WebCamScreenshot />
                )}
              </div>
            </div>

            <div
              className="list-botones"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
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
