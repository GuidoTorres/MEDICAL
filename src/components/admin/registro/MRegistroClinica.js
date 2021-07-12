import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";

import { UploadAvatar } from "../../uploadAvatar/uploadAvatar";
import { customStyles } from "../../../helpers/tablaOpciones";
import { fetchGETPOSTPUTDELETE } from "../../../helpers/fetch";
import MapaGoogle from "../../Mapa/MapaGoogle";

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
  const [dataMapa, setDataMapa] = useState();
  const [data, setData] = useState({});

  const closeModal = () => {
    setOpenModal(false);
    setEditar(false);
    setDataSelected(null);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  console.log(data);

  const postClinics = () => {
    const formData = new FormData();

    formData.set("ruc", data.ruc || "");
    formData.set("business_name", data.business_name || "");
    formData.set("commercial_name", data.business_name || "");
    formData.set("logo", avatar ? avatar.file : "");
    formData.set("address", data.address || "");
    formData.set("reference", data.reference || "");
    formData.set("clinic_type_id", data.clinic_type_id || "");
    formData.set("map_latitude", dataMapa ? dataMapa.lat : "");
    formData.set("map_length", dataMapa ? dataMapa.lng : "");

    formData.set("contacts[0][name]", data.name || "");
    formData.set("contacts[0][phone]", data.phone || "");
    formData.set("contacts[0][email]", data.email || "");
    formData.set("contacts[0][contact_type]", 1);

    formData.set("work_days[0][day_id]", data.workday.monday || "");
    formData.set("work_days[0][opening]", data.workday.opening || "");
    formData.set("work_days[0][closing]", data.workday.closing || "");

    formData.set("work_days[1][day_id]", data.workday.tuesday || "");
    formData.set("work_days[1][opening]", data.workday.opening || "");
    formData.set("work_days[1][closing]", data.workday.closing || "");

    formData.set("work_days[2][day_id]", data.workday.wednesday || "");
    formData.set("work_days[2][opening]", data.workday.opening || "");
    formData.set("work_days[2][closing]", data.workday.closing || "");

    formData.set("work_days[3][day_id]", data.workday.thursday || "");
    formData.set("work_days[3][opening]", data.workday.opening || "");
    formData.set("work_days[3][closing]", data.workday.closing || "");

    formData.set("work_days[4][day_id]", data.workday.friday || "");
    formData.set("work_days[4][opening]", data.workday.opening || "");
    formData.set("work_days[4][closing]", data.workday.closing || "");

    formData.set("work_days[5][day_id]", data.workday.saturday || "");
    formData.set("work_days[5][opening]", data.workday.opening || "");
    formData.set("work_days[5][closing]", data.workday.closing || "");

    formData.set("work_days[6][day_id]", data.workday.sunday || "");
    formData.set("work_days[6][opening]", data.workday.opening || "");
    formData.set("work_days[6][closing]", data.workday.closing || "");

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

  const putClinics = () => {
    const formData = new FormData();

    // formData.set("corporation_id", 1);
    formData.set("ruc", data.ruc ? data.ruc : dataSelected.corporation.ruc);
    formData.set(
      "business_name",
      data.business_name
        ? data.business_name
        : dataSelected.corporation.business_name
    );
    formData.set(
      "commercial_name",
      data.business_name
        ? data.business_name
        : dataSelected.corporation.commercial_name
    );
    formData.set("logo", avatar ? avatar.file : "");
    formData.set(
      "address",
      data.address ? data.address : dataSelected.corporation.address.address
    );
    formData.set(
      "reference",
      data.reference
        ? data.reference
        : dataSelected.corporation.address.reference
    );
    formData.set(
      "clinic_type_id",
      data.clinic_type_id ? data.clinic_type_id : dataSelected.clinic_type_id
    );
    formData.set("map_latitude", dataMapa ? dataMapa.lat : "");
    formData.set("map_length]", dataMapa ? dataMapa.lng : "");

    formData.set("contacts[0][name]", data.name ? data.name : "");
    formData.set("contacts[0][phone]", data.phone ? data.phone : "");
    formData.set("contacts[0][email]", data.email ? data.email : "");
    formData.set("contacts[0][contact_type]", 1);

    formData.set("work_days[0][day_id]", data.workday.monday || "");
    formData.set("work_days[0][opening]", data.workday.opening || "");
    formData.set("work_days[0][closing]", data.workday.closing || "");

    formData.set("work_days[1][day_id]", data.workday.tuesday || "");
    formData.set("work_days[1][opening]", data.workday.opening || "");
    formData.set("work_days[1][closing]", data.workday.closing || "");

    formData.set("work_days[2][day_id]", data.workday.wednesday || "");
    formData.set("work_days[2][opening]", data.workday.opening || "");
    formData.set("work_days[2][closing]", data.workday.closing || "");

    formData.set("work_days[3][day_id]", data.workday.thursday || "");
    formData.set("work_days[3][opening]", data.workday.opening || "");
    formData.set("work_days[3][closing]", data.workday.closing || "");

    formData.set("work_days[4][day_id]", data.workday.friday || "");
    formData.set("work_days[4][opening]", data.workday.opening || "");
    formData.set("work_days[4][closing]", data.workday.closing || "");

    formData.set("work_days[5][day_id]", data.workday.saturday || "");
    formData.set("work_days[5][opening]", data.workday.opening || "");
    formData.set("work_days[5][closing]", data.workday.closing || "");

    formData.set("work_days[6][day_id]", data.workday.sunday || "");
    formData.set("work_days[6][opening]", data.workday.opening || "");
    formData.set("work_days[6][closing]", data.workday.closing || "");

    fetchGETPOSTPUTDELETE(
      `clinics/update/${dataSelected.id}`,
      formData,
      "POST"
    ).then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        closeModal();
        getClinica();
      }
    });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
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
          <form className="row mt-3" onSubmit={handleAgregar}>
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6  mregistro__cliente mb-3">
              <div className="mregistro__clinica">
                <div>
                  <label>RUC:</label>
                  <input
                    type="text"
                    name="ruc"
                    defaultValue={
                      dataSelected && dataSelected.corporation.ruc
                        ? dataSelected.corporation.ruc
                        : ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Razón social:</label>
                  <input
                    type="text"
                    name="business_name"
                    defaultValue={
                      dataSelected && dataSelected.corporation.business_name
                        ? dataSelected.corporation.business_name
                        : ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Responsable:</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={
                      dataSelected && dataSelected.responsible
                        ? dataSelected.responsible.name
                        : ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Teléfono:</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={
                      dataSelected && dataSelected.responsible
                        ? dataSelected.responsible.phone
                        : ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Correo:</label>
                  <input
                    type="text"
                    name="email"
                    defaultValue={
                      dataSelected && dataSelected.responsible
                        ? dataSelected.responsible.email
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
                      dataSelected && dataSelected.address
                        ? dataSelected.address.address
                        : ""
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
                      dataSelected && dataSelected.address
                        ? dataSelected.address.reference
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
                      // onChange={handleChange}
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
                      // onChange={handleChange}
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
                      dataSelected && dataSelected.work_day
                        ? dataSelected.work_day.opening
                        : ""
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        workday: { ...data.workday, opening: e.target.value },
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
                      dataSelected && dataSelected.work_day
                        ? dataSelected.work_day.closing
                        : ""
                    }
                    onChange={(e) =>
                      setData({
                        ...data,
                        workday: { ...data.workday, closing: e.target.value },
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
                        dataSelected.work_day &&
                        dataSelected.work_day.monday === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          workday: {
                            ...data.workday,
                            monday: e.target.checked === true ? 1 : 0,
                          },
                        })
                      }
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
                        dataSelected.work_day &&
                        dataSelected.work_day.tuesday === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          workday: {
                            ...data.workday,
                            tuesday: e.target.checked === true ? 2 : 0,
                          },
                        })
                      }
                    />
                    <label>M</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={
                        dataSelected &&
                        dataSelected.work_day &&
                        dataSelected.work_day.wednesday === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          workday: {
                            ...data.workday,
                            wednesday: e.target.checked === true ? 3 : 0,
                          },
                        })
                      }
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
                        dataSelected.work_day &&
                        dataSelected.work_day.thursday === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          workday: {
                            ...data.workday,
                            thursday: e.target.checked === true ? 4 : 0,
                          },
                        })
                      }
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
                        dataSelected.work_day &&
                        dataSelected.work_day.friday === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          workday: {
                            ...data.workday,
                            friday: e.target.checked === true ? 5 : 0,
                          },
                        })
                      }
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
                        dataSelected.work_day &&
                        dataSelected.work_day.saturday === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          workday: {
                            ...data.workday,
                            saturday: e.target.checked === true ? 6 : 0,
                          },
                        })
                      }
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
                        dataSelected.work_day &&
                        dataSelected.work_day.sunday === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          workday: {
                            ...data.workday,
                            sunday: e.target.checked === true ? 7 : 0,
                          },
                        })
                      }
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
                  <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
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
                  <button className="botones" onClick={putClinics}>
                    Editar
                  </button>
                ) : (
                  <button className="botones" onClick={postClinics}>
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
