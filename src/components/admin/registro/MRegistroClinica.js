import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import { UploadAvatar } from "../../uploadAvatar/uploadAvatar";
import { customStyles } from "../../../helpers/tablaOpciones";
import { fetchGETPOSTPUTDELETE } from "../../../helpers/fetch";
import MapaGoogle from "../../Mapa/MapaGoogle";

// import MapaGoogle from '../../../Mapa/MapaGoogle';
// import mapa from '../../../assets/mapa/mapa.jpg';

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
  const [data, setData] = useState();
  const [editarCLinica, setEditarClinica] = useState(null)


  const closeModal = () => {
    setOpenModal(false);
    setEditar(false);
    setDataSelected(null);
    // setCreateClinica(initialState);
  };

  const postClinics = () => {
    const formData = new FormData();

    formData.set("ruc",  data.ruc || "");
    formData.set("business_name",  data.business_name || "");
    formData.set("clinic_type",  data.clinic_type_id || "");
    formData.set("commercial_name",  data.business_name || "");
    formData.set("logo",  data.business_name || "");

    formData.set("address[id]",  1);

    formData.set("address[address]",  data.address.address || "");
    formData.set("address[reference]",  data.address.reference || "");
    formData.set("address[district_id]", 14);
    formData.set("address[map_latitude]", dataMapa && dataMapa.lat || "");
    formData.set("address[map_length]", dataMapa && dataMapa.lng || "");

    formData.set("responsible[name]",  data.responsible.name || "");
    formData.set("responsible[phone]",  data.responsible.phone || "");
    formData.set("responsible[email]",  data.responsible.email || "");
    formData.set("responsible[contact_type]", 1);
    formData.set("responsible[corporation_id]", 1);

    formData.set("workday[corporation_id]", 1);
    formData.set("workday[opening]",  data.workday.opening || "");
    formData.set("workday[closing]",  data.workday.closing || "");
    formData.set("workday[monday]",  data.workday.monday || "");
    formData.set("workday[tuesday]",  data.workday.tuesday || "");
    formData.set("workday[wednesday]",  data.workday.wednesday || "");
    formData.set("workday[thursday]",  data.workday.thursday || "");
    formData.set("workday[friday]",  data.workday.friday || "");
    formData.set("workday[saturday]",  data.workday.saturday || "");
    formData.set("workday[sunday]",  data.workday.sunday || "");
    fetchGETPOSTPUTDELETE("clinics", formData, "POST").then((resp) => {
      console.log(resp)
      if (resp.status === 200) {
        closeModal();
        getClinica();
      }
    });
  };

  const putClinics = () => {

    const formData = new FormData();
    formData.set("ruc", data && data.ruc);
    formData.set("business_name", data && data.business_name);
    formData.set("commercial_name", data && data.commercial_name);

    formData.set("clinic_type", 2);

    formData.set("address[address]", data && data.address.address);
    formData.set("address[reference]", data && data.address.reference);
    formData.set("address[district_id]", 14);
    formData.set("address[map_latitude]", data && data.address.map_latitude);
    formData.set("address[map_length]", data && data.address.map_length);

    formData.set("responsible[name]", data && data.responsible.name);
    formData.set("responsible[phone]", data && data.responsible.phone);
    formData.set("responsible[email]",data && data.responsible.email);
    formData.set("responsible[contact_type]", 1);

        formData.set("workday", null);


    // formData.set("workday[corporation_id]", 51);
    // formData.set(
    //   "workday[opening]",
    //   data && data.workday.opening
    // );
    // formData.set(
    //   "workday[closing]",
    //   data && data.workday.closing
    // );
    // formData.set(
    //   "workday[monday]",
    //   data && data.workday.monday
    // );
    // formData.set(
    //   "workday[tuesday]",
    //   data && data.workday.tuesday
    // );
    // formData.set(
    //   "workday[wednesday]",
    //   data && data.workday.wednesday
    // );
    // formData.set(
    //   "workday[thursday]",
    //   data && data.workday.thursday
    // );
    // formData.set(
    //   "workday[friday]",
    //   data && data.workday.friday
    // );
    // formData.set(
    //   "workday[saturday]",
    //   data && data.workday.saturday
    // );
    // formData.set(
    //   "workday[sunday]",
    //   data && data.workday.sunday
    // );

    fetchGETPOSTPUTDELETE(`clinics/${dataSelected.id}`, formData, "PUT").then(
      (resp) => {
        console.log(resp);
        if (resp) {
          closeModal();
          getClinica();
        }
      }
    );
  };

  const handleAgregar = (e) => {
    e.preventDefault();
  };
  console.log(data);
  // console.log(data);
  useEffect(()=>{

    if(dataSelected){

      setData({
    ...data,
    clinic_type: 2,
    ruc: dataSelected && dataSelected.ruc,
    business_name: dataSelected ? dataSelected.business_name : "",
    commercial_name: dataSelected ? dataSelected.commercial_name : "",
    logo: "image",
    address_id: 12,
    address: {
        address: dataSelected && dataSelected.address ? dataSelected.address.address : "",
        reference: dataSelected && dataSelected.address ? dataSelected.address.reference : "",
        map_latitude: dataSelected && dataSelected.address ? dataSelected.address.map_latitude : "",
        map_length: dataSelected && dataSelected.address ? dataSelected.address.map_length : "",
        district_id: 34
    },
    responsible: {
        name: dataSelected && dataSelected.responsible ? dataSelected.responsible.name : "",
        phone: dataSelected && dataSelected.responsible ? dataSelected.responsible.phone : "",
        email: dataSelected && dataSelected.responsible ? dataSelected.responsible.email : "",
        contact_type: 1,
        corporation_id: 12,
    },
    workday: {
        corporation_id: 12,
        opening: "16:06:21",
        closing: "09:24:23",
        monday: 0,
        tuesday: 1,
        wednesday: 0,
        thursday: 0,
        friday: 1,
        saturday: 0,
        sunday: 1
    }

      })
    }else{
      setData(null)
    }

  },[dataSelected])

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
                    defaultValue={dataSelected ? dataSelected.ruc : ""}
                    onChange={(e) => setData({ ...data, ruc: e.target.value })}
                  />
                </div>
                <div>
                  <label>Razón social:</label>
                  <input
                    type="text"
                    name="business_name"
                    defaultValue={
                      dataSelected ? dataSelected.business_name : ""
                    }
                    onChange={(e) =>
                      setData({ ...data, business_name: e.target.value })
                    }
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
                    onChange={(e) =>
                      setData({
                        ...data,
                        responsible: {
                          ...data.responsible,
                          name: e.target.value,
                        },
                      })
                    }
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
                    onChange={(e) =>
                      setData({
                        ...data,
                        responsible: {
                          ...data.responsible,
                          phone: e.target.value,
                        },
                      })
                    }
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
                    onChange={(e) =>
                      setData({
                        ...data,
                        responsible: {
                          ...data.responsible,
                          email: e.target.value,
                        },
                      })
                    }
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
                    onChange={(e) =>
                      setData({
                        ...data,
                        address: { ...data.address, address: e.target.value },
                      })
                    }
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
                    onChange={(e) =>
                      setData({
                        ...data,
                        address: { ...data.address, reference: e.target.value },
                      })
                    }
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
                      name=""
                      // onChange={handleChange}
                      defaultChecked={
                        dataSelected && dataSelected.clinic_type_id === 1
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          clinic_type_id: e.target.checked === true ? 1 : "",
                        })
                      }
                    />
                    <label>Toma muestra</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name=""
                      // onChange={handleChange}
                      defaultChecked={
                        dataSelected && dataSelected.clinic_type_id === 2
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        setData({
                          ...data,
                          clinic_type_id: e.target.checked === true ? 2 : "",
                        })
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
                            tuesday: e.target.checked === true ? 1 : 0,
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
                            wednesday: e.target.checked === true ? 1 : 0,
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
                            thursday: e.target.checked === true ? 1 : 0,
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
                            friday: e.target.checked === true ? 1 : 0,
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
                            saturday: e.target.checked === true ? 1 : 0,
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
                            sunday: e.target.checked === true ? 1 : 0,
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
