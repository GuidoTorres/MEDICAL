import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import MapaGoogle from "../../Mapa/MapaGoogle";

import { UploadAvatar } from "../../uploadAvatar/uploadAvatar";
import { customStyles } from "../../../helpers/tablaOpciones";
import { fetchGETPOSTPUTDELETE, fetchRUC } from "../../../helpers/fetch";

const MRegistroClinica = ({
  openModal,
  setOpenModal,
  getClinica,
  dataSelected,
  setDataSelected,
  editar,
  setEditar,
}) => {
  const [avatar, setAvatar] = useState(null);
  const [dataMapa, setDataMapa] = useState({
    lat: 0,
    lng: 0,
  });
  const [workday, setWorkday] = useState([]);
  const [data, setData] = useState({
    ruc: "",
    business_name: "",
    name: "",
    phone: "",
    email: "",
  });
  const [ruc, setRuc] = useState({});

  const closeModal = () => {
    setOpenModal(false);
    setEditar(false);
    setDataSelected(null);
  };

  const getRuc = () => {
    fetchRUC(data.ruc, "GET")
      .then((res) => res.json())
      .then((res) => setRuc(res));
  };

  useEffect(() => {
    if (data && data.ruc && data.ruc.length === 11) {
      getRuc();
    }
  }, [data.ruc]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleWorkday = (e, nro) => {
    if (e.target.checked) {
      setWorkday((workday) => [
        ...workday,
        {
          day: nro,
        },
      ]);
    } else {
      if (workday.length > 1) {
        let position = workday.findIndex(
          (arreglo) => arreglo.day === workday.length
        );

        const arreglos = [...workday];
        arreglos.splice(position, 1);
        setWorkday([...arreglos]);
      } else {
        setWorkday([]);
      }
    }
  };

  const postClinics = (e) => {
    const formData = new FormData();

    formData.set("ruc", data.ruc || "");
    formData.set("business_name", ruc.razonSocial || data.business_name || "");
    formData.set(
      "commercial_name",
      ruc.razonSocial || data.business_name || ""
    );
    formData.set("logo", avatar && avatar.file ? avatar.file : "");
    formData.set("address", ruc.direccion || data.address || "");
    formData.set("reference", data.reference || "");
    formData.set("clinic_type_id", data.clinic_type_id || "");
    formData.set("map_latitude", dataMapa ? dataMapa.lat : "");
    formData.set("map_length", dataMapa ? dataMapa.lng : "");

    formData.set("contacts[0][name]", data.name || "");
    formData.set("contacts[0][phone]", data.phone || "");
    formData.set("contacts[0][email]", data.email || "");
    formData.set("contacts[0][contact_type]", 0);

    if (workday) {
      for (var [value] of Object.entries(workday)) {
        formData.set(`work_days[${value}][day_id]`, Number(value) + 1);
        if (data.apertura) {
          for (var [key2, value2] of Object.entries(data.apertura)) {
            formData.set(`work_days[${value}][${key2}]`, value2);
          }
        }
      }
    }

    fetchGETPOSTPUTDELETE("clinics", formData, "POST").then((resp) => {
      if (resp.status === 200) {
        closeModal();
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Se ha creado la clínica correctamente.",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
        }).then((resp) => {
          if (resp.isConfirmed) {
            getClinica();
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
  };

  console.log(dataSelected);
  const putClinics = (e) => {
    const formData = new FormData();

    formData.set("corporation_id", 1);
    formData.set(
      "ruc",
      dataSelected && dataSelected.corporation.ruc
        ? dataSelected.corporation.ruc
        : ""
    );
    formData.set(
      "business_name",
      data.business_name
        ? data.business_name
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.business_name
        ? dataSelected.corporation.business_name
        : ""
    );
    formData.set(
      "commercial_name",
      data.business_name
        ? data.business_name
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.commercial_name
        ? dataSelected.corporation.commercial_name
        : ""
    );
    formData.set("logo", avatar && avatar.file ? avatar.file : "");
    formData.set(
      "address",
      data.address
        ? data.address
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.address &&
          dataSelected.corporation.address.address
        ? dataSelected.corporation.address.address
        : ""
    );
    formData.set(
      "reference",
      data.reference
        ? data.reference
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.address &&
          dataSelected.corporation.address.reference
        ? dataSelected.corporation.address.reference
        : ""
    );
    formData.set(
      "clinic_type_id",
      data.clinic_type_id
        ? data.clinic_type_id
        : dataSelected && dataSelected.clinic_type_id
        ? dataSelected.clinic_type_id
        : ""
    );
    formData.set(
      "map_latitude",
      dataMapa
        ? dataMapa.lat
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.address &&
          dataSelected.corporation.address.map_latitude
        ? dataSelected.corporation.address.map_latitude
        : ""
    );
    formData.set(
      "map_length",
      dataMapa
        ? dataMapa.lng
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.address &&
          dataSelected.corporation.address.map_length
        ? dataSelected.corporation.address.map_length
        : ""
    );

    formData.set(
      "contacts[0][name]",
      data.name
        ? data.name
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.contacts &&
          dataSelected.corporation.contacts[0] &&
          dataSelected.corporation.contacts[0].name
        ? dataSelected.corporation.contacts[0].name
        : ""
    );
    formData.set(
      "contacts[0][phone]",
      data.phone
        ? data.phone
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.contacts &&
          dataSelected.corporation.contacts[0] &&
          dataSelected.corporation.contacts[0].phone
        ? dataSelected.corporation.contacts[0].phone
        : ""
    );
    formData.set(
      "contacts[0][email]",
      data.email
        ? data.email
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.contacts &&
          dataSelected.corporation.contacts[0] &&
          dataSelected.corporation.contacts[0].email
        ? dataSelected.corporation.contacts[0].email
        : ""
    );
    formData.set("contacts[0][contact_type]", 0);

    if (workday) {
      for (var [value] of Object.entries(workday)) {
        formData.set(`work_days[${value}][day_id]`, Number(value) + 1);
        if (data.apertura) {
          for (var [key2, value2] of Object.entries(data.apertura)) {
            formData.set(`work_days[${value}][${key2}]`, value2);
          }
        }
      }
    }

    console.log(dataSelected.corporation.logo);
    fetchGETPOSTPUTDELETE(
      `clinics/update/${dataSelected.id}`,
      formData,
      "POST"
    ).then((resp) => {
      // console.log(resp);
      if (resp.status === 200) {
        closeModal();
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Se actualizo la clínica correctamente.",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
        }).then((resp) => {
          if (resp.isConfirmed) {
            getClinica();
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
  };

  const submit = (e) => {
    e.preventDefault();

    if (data) {
      if (data.ruc.trim() === "" || null) {
        document.getElementById("ruc").style =
          "border:1px solid red !important";
      }

      if (data.business_name.trim() === "" || null) {
        document.getElementById("business_name").style =
          "border:1px solid red !important";
      }

      if (data.name.trim() === "" || null) {
        document.getElementById("name").style =
          "border:1px solid red !important";
      }

      if (data.phone.trim() === "" || null) {
        document.getElementById("phone").style =
          "border:1px solid red !important";
      }

      if (data.email.trim() === "" || null) {
        document.getElementById("email").style =
          "border:1px solid red !important";
      }
    }
    if (
      (data.ruc !== "" || null,
      data.business_name !== "" || null,
      data.name !== "" || null,
      data.phone !== "" || null,
      data.email !== "" || null)
    ) {
      postClinics();
    }

    if (editar) {
      document.getElementById("ruc").style = "border:none";
      document.getElementById("business_name").style = "border:none";
      document.getElementById("name").style = "border:none";
      document.getElementById("phone").style = "border:none";
      document.getElementById("email").style = "border:none";
      putClinics();
    }
  };

  return (
    <div>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal modal__clinica"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
        preventScroll={true}
        ariaHideApp={false}
      >
        <h3 className="title__modal">{"Registrar Clínica"}</h3>
        <div className="container">
          <form className="row mt-3 " onSubmit={(e) => submit(e)}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6  mregistro__cliente mb-3">
              <div className="mregistro__clinica">
                <div>
                  <label htmlFor="validationCustom01">RUC:</label>
                  <input
                    type="number"
                    name="ruc"
                    id="ruc"
                    style={{ border: "1px solid red !important" }}
                    disabled={editar ? true : false}
                    defaultValue={
                      dataSelected && dataSelected.corporation.ruc
                        ? dataSelected.corporation.ruc
                        : ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                  {/* {error ? <p style={{color:'red'}}>Campo obligatorio</p> : null} */}
                </div>
                <div>
                  <label>Razón social:</label>
                  <input
                    type="text"
                    name="business_name"
                    id="business_name"
                    defaultValue={
                      editar === true
                        ? dataSelected && dataSelected.corporation.business_name
                          ? dataSelected.corporation.business_name
                          : ""
                        : ruc.razonSocial
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Responsable:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={
                      dataSelected &&
                      dataSelected.corporation &&
                      dataSelected.corporation.contacts &&
                      dataSelected.corporation.contacts[0] &&
                      dataSelected.corporation.contacts[0].name
                        ? dataSelected.corporation.contacts[0].name
                        : ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Teléfono:</label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    defaultValue={
                      dataSelected &&
                      dataSelected.corporation &&
                      dataSelected.corporation.contacts &&
                      dataSelected.corporation.contacts[0] &&
                      dataSelected.corporation.contacts[0].phone
                        ? dataSelected.corporation.contacts[0].phone
                        : ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Correo:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={
                      dataSelected &&
                      dataSelected.corporation &&
                      dataSelected.corporation.contacts &&
                      dataSelected.corporation.contacts[0] &&
                      dataSelected.corporation.contacts[0].email
                        ? dataSelected.corporation.contacts[0].email
                        : ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Dirección:</label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={
                      editar
                        ? dataSelected && dataSelected.corporation.address
                          ? dataSelected.corporation.address.address
                          : ""
                        : ruc.direccion
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Referencia:</label>
                  <input
                    type="text"
                    name="reference"
                    defaultValue={
                      dataSelected &&
                      dataSelected.corporation &&
                      dataSelected.corporation.address &&
                      dataSelected.corporation.address.reference
                        ? dataSelected.corporation.address.reference
                        : null
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="mregistro__tipo">
                <h6>Tipo de Clínica</h6>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="clinic_type_id"
                      // disabled={data.clinic_type_id === 2 ? true : false}
                      defaultChecked={
                        dataSelected && dataSelected.clinic_type_id === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        e.target.checked === true
                          ? setData({ ...data, clinic_type_id: 1 })
                          : ""
                      }
                    />
                    <label>Toma muestra</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="clinic_type_id"
                      // disabled={data.clinic_type_id === 1 ? true : false}
                      defaultChecked={
                        dataSelected && dataSelected.clinic_type_id === 2
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        e.target.checked === true
                          ? setData({ ...data, clinic_type_id: 2 })
                          : ""
                      }
                    />
                    <label>Toma y analiza muestra</label>
                  </div>
                </div>
              </div>
              <div className="mregistro__tiempo">
                <div>
                  <label>Horario inicio de atención</label>
                  <input
                    type="time"
                    name="opening"
                    defaultValue={
                      dataSelected &&
                      dataSelected.corporation.work_day &&
                      dataSelected.corporation.work_day[0] &&
                      dataSelected.corporation.work_day[0].hours &&
                      dataSelected.corporation.work_day[0].hours.opening
                        ? dataSelected.corporation.work_day[0].hours.opening
                        : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        apertura: { ...data.apertura, opening: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label>Horario final de atención</label>
                  <input
                    type="time"
                    name="closing"
                    defaultValue={
                      dataSelected &&
                      dataSelected.corporation.work_day &&
                      dataSelected.corporation.work_day[0] &&
                      dataSelected.corporation.work_day[0].hours &&
                      dataSelected.corporation.work_day[0].hours.closing
                        ? dataSelected.corporation.work_day[0].hours.closing
                        : false
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        apertura: { ...data.apertura, closing: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
              <div className="mregistro__fecha">
                <h6>Días de atención</h6>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="monday"
                      defaultChecked={
                        dataSelected &&
                        dataSelected.corporation &&
                        dataSelected.corporation.work_day &&
                        dataSelected.corporation.work_day[0]
                          ? true
                          : false
                      }
                      onChange={(e) => handleWorkday(e, 0)}
                    />
                    <label>L</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="tuesday"
                      defaultChecked={
                        dataSelected &&
                        dataSelected.corporation &&
                        dataSelected.corporation.work_day &&
                        dataSelected.corporation.work_day[1]
                          ? true
                          : false
                      }
                      onChange={(e) => handleWorkday(e, 1)}
                    />
                    <label>M</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={
                        dataSelected &&
                        dataSelected.corporation &&
                        dataSelected.corporation.work_day &&
                        dataSelected.corporation.work_day[2]
                          ? true
                          : false
                      }
                      onChange={(e) => handleWorkday(e, 2)}
                    />
                    <label>M</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="thursday"
                      defaultChecked={
                        dataSelected &&
                        dataSelected.corporation &&
                        dataSelected.corporation.work_day &&
                        dataSelected.corporation.work_day[3]
                          ? true
                          : false
                      }
                      onChange={(e) => handleWorkday(e, 3)}
                    />
                    <label>J</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="friday"
                      defaultChecked={
                        dataSelected &&
                        dataSelected.corporation &&
                        dataSelected.corporation.work_day &&
                        dataSelected.corporation.work_day[4]
                          ? true
                          : false
                      }
                      onChange={(e) => handleWorkday(e, 4)}
                    />
                    <label>V</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="saturday"
                      defaultChecked={
                        dataSelected &&
                        dataSelected.corporation &&
                        dataSelected.corporation.work_day &&
                        dataSelected.corporation.work_day[5]
                          ? true
                          : false
                      }
                      onChange={(e) => handleWorkday(e, 5)}
                    />
                    <label>S</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="sunday"
                      defaultChecked={
                        dataSelected &&
                        dataSelected.corporation &&
                        dataSelected.corporation.work_day &&
                        dataSelected.corporation.work_day[6]
                          ? true
                          : false
                      }
                      onChange={(e) => handleWorkday(e, 6)}
                    />
                    <label>D</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 p-0">
              <div className="mregistro__logo">
                <p>
                  Logo <span>(.jpg, .jpeg, .jpg)</span>
                </p>
                <div>
                  <UploadAvatar
                    avatar={avatar}
                    setAvatar={setAvatar}
                    editar={editar}
                    dataSelected={dataSelected}
                  />
                </div>
              </div>
              <div className="mregistro__ubicacion">
                <div className="icons">
                  <p>Ubicación</p>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="mapa">
                  <MapaGoogle
                    dataMapa={dataMapa}
                    setDataMapa={setDataMapa}
                    editar={editar}
                    dataSelected={dataSelected}
                  />
                </div>
              </div>

              <div className="list-botones">
                <button className="botones" onClick={closeModal}>
                  Cancelar
                </button>
                {editar === true ? (
                  <button className="botones" type="submit">
                    Editar
                  </button>
                ) : (
                  <button className="botones" type="submit">
                    Agregar
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default MRegistroClinica;
