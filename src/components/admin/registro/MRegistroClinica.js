/* eslint-disable */
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
    lat: -12.04318,
    lng: -77.02824,
  });
  const [workday, setWorkday] = useState([]);

  const [idFecha, setIdFecha] = useState(0);
  const [data, setData] = useState({
    address: null,
    ruc: null,
    business_name: null,
    name: null,
    phone: null,
    email: null,
    reference: null,
    clinic_type_id: null,
  });
  const [ruc, setRuc] = useState({});

  const [fechasElegidas, setFechasElegidas] = useState([]);
  const [departamentos, setDepartamentos] = useState({});
  const [provinces, setProvinces] = useState({});
  const [districts, setDistricts] = useState();
  const fechasDeSemana = [
    { id: 1, name: "Lunes" },
    { id: 2, name: "Martes" },
    { id: 3, name: "Miércoles" },
    { id: 4, name: "Jueves" },
    { id: 5, name: "Viernes" },
    { id: 6, name: "Sábado" },
    { id: 7, name: "Domingo" },
  ];

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

  const obtenerData = () => {
    setData({
      address: dataSelected.corporation.address.address,
      ruc: dataSelected.corporation.ruc,
      business_name: dataSelected.corporation.business_name,
      name: dataSelected.corporation.contacts[0].name,
      phone: dataSelected.corporation.contacts[0].phone,
      email: dataSelected.corporation.contacts[0].email,
      reference: dataSelected.corporation.address.reference,
      clinic_type_id: dataSelected.clinic_type_id,
    });
    setAvatar(dataSelected.corporation.logo);
    setDataMapa({
      lat: dataSelected.corporation.address.map_latitude,
      lng: dataSelected.corporation.address.map_length,
    });
    const _workday = dataSelected.corporation.work_day.map((w) => {
      return {
        day: w.id,
        opening: w.hours.opening,
        closing: w.hours.closing,
      };
    });
    setIdFecha(_workday[0].day);

    setWorkday(_workday);

    setFechasElegidas(
      fechasDeSemana.map((m) =>
        _workday.find((w) => w.day === m.id) ? m : null
      )
    );

    setTimeout(() => {
      document.getElementById("horario-ingreso").value = _workday[0].opening;
      document.getElementById("horario-final").value = _workday[0].closing;
    }, 0);
  };

  // console.log(fechasElegidas);

  useEffect(() => {
    if (data && data.ruc && data.ruc.length === 11) {
      getRuc();
    }
  }, [data.ruc]);

  useEffect(() => {
    if (editar) obtenerData();
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleWorkday = (e, nro) => {
    const arreglos = [...workday];

    if (e.target.checked) {
      arreglos.push({ day: nro, opening: "00:00", closing: "23:59" });
      setWorkday([...arreglos]);
    } else {
      if (workday.length > 1) {
        let position = workday.findIndex((arreglo) => arreglo.day === nro);

        arreglos.splice(position, 1);
        setWorkday([...arreglos]);
      } else {
        setWorkday([]);
        arreglos.pop();
      }
    }
    setFechasElegidas(
      fechasDeSemana.map((m) =>
        arreglos.find((w) => w.day === m.id) ? m : null
      )
    );
  };

  const seleccioneHorario = (e) => {
    setIdFecha(Number(e.target.value));
    // setHorarioSeleccionado(
    const w = workday.find((w) => w.day === Number(e.target.value));
    // );
    // console.log(workday.find((w) => w.day === Number(e.target.value)));
    document.getElementById("horario-ingreso").value = w.opening;
    document.getElementById("horario-final").value = w.closing;
  };

  const actualizarHorarioOpening = (e) => {
    // console.log(e.target.value);
    const arreglos = [...workday];
    let position = workday.findIndex((arreglo) => arreglo.day === idFecha);
    const _day = arreglos[position];

    arreglos.splice(position, 1, {
      day: _day.day,
      opening: e.target.value,
      closing: _day.closing,
    });
    setWorkday([...arreglos]);
  };

  const actualizarHorarioClosing = (e) => {
    const arreglos = [...workday];
    let position = workday.findIndex((arreglo) => arreglo.day === idFecha);
    const _day = arreglos[position];

    arreglos.splice(position, 1, {
      day: _day.day,
      opening: _day.opening,
      closing: e.target.value,
    });
    setWorkday([...arreglos]);
  };

  const postClinics = (e) => {
    const formData = new FormData();
    // console.log(data);

    formData.set("ruc", data.ruc || "");
    formData.set("business_name", ruc.razonSocial || data.business_name || "");
    formData.set("commercial_name", data.commercial_name || "");
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
    formData.set("department_id", data.department_id || "");
    formData.set("province_id", data.province_id || "");
    formData.set("district_id", data.district_id || "");

    workday.map((w, index) => {
      formData.set(`work_days[${index}][day_id]`, Number(w.day));

      formData.set(`work_days[${index}][opening]`, w.opening);
      formData.set(`work_days[${index}][closing]`, w.closing);
    });

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
        });
        getClinica();
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

  const putClinics = (e) => {
    const formData = new FormData();

    formData.set("corporation_id", 1);
    formData.set("ruc", data.ruc || "");
    formData.set("business_name", ruc.razonSocial || data.business_name || "");
    formData.set("commercial_name", data.commercial_name || "");
    formData.set("logo", avatar && avatar.file ? avatar.file : "");
    formData.set("address", ruc.direccion || data.address || "");
    formData.set("reference", data.reference || "");
    formData.set("clinic_type_id", data.clinic_type_id.toString());
    formData.set("map_latitude", dataMapa ? dataMapa.lat : "");
    formData.set("map_length", dataMapa ? dataMapa.lng : "");

    formData.set("contacts[0][name]", data.name || "");
    formData.set("contacts[0][phone]", data.phone || "");
    formData.set("contacts[0][email]", data.email || "");
    formData.set("contacts[0][contact_type]", 0);
    formData.set("district_id", data.district_id || "");

    // if (workday) {
    //   for (var [value] of Object.entries(workday)) {
    //     formData.set(`work_days[${value}][day_id]`, Number(value) + 1);
    //     if (data.apertura) {
    //       for (var [key2, value2] of Object.entries(data.apertura)) {
    //         formData.set(`work_days[${value}][${key2}]`, value2);
    //       }
    //     }
    //   }
    // }

    workday.map((w, index) => {
      formData.set(`work_days[${index}][day_id]`, Number(w.day));

      formData.set(`work_days[${index}][opening]`, w.opening);
      formData.set(`work_days[${index}][closing]`, w.closing);
    });

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
        });
        getClinica();
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

    if (
      // data.address !== "" &&
      // data.address !== null &&
      data.ruc !== "" &&
      data.ruc !== null &&
      // data.business_name !== "" &&
      // data.business_name !== null &&
      data.name !== "" &&
      data.name !== null &&
      data.phone !== "" &&
      data.phone !== null &&
      data.email !== "" &&
      data.email !== null &&
      data.reference !== "" &&
      data.reference !== null &&
      data.clinic_type_id !== null &&
      workday.length > 0 &&
      avatar !== null
    ) {
      if (editar) {
        putClinics();
        console.log(data);
        console.log(workday);
        // console.log(avatar);
        // console.log(dataMapa);
      } else {
        postClinics();
      }
    } else {
      console.log(data);
      console.log(workday);
      // console.log(avatar);
      // console.log(dataMapa);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe completar todos los datos",
      });
    }
  };

  const getDepartments = () => {
    fetchGETPOSTPUTDELETE("departamentos")
      .then((res) => res.json())
      .then((res) => setDepartamentos(res.departments));
  };
  useEffect(() => {
    getDepartments();
  }, []);
  const getProvinces = () => {
    //devuelve solo el objeto con el id = a department_id
    if (editar) {
      console.log("entro al editar true");
      const provincias =
        departamentos.length > 0 &&
        departamentos.filter((item) =>
          item.id ===
          dataSelected.corporation.address.district.province.department_id
            ? item
            : ""
        );
      setProvinces(provincias);

      const distritos =
        provinces.length > 0 &&
        provinces.map((data1, i) =>
          data1.provinces.filter((item, j) =>
            dataSelected.corporation.address.district_id ? item.districts : ""
          )
        );

      setDistricts(distritos);
    } else {
      console.log("entro al editar false");
      const provincias =
        departamentos.length > 0 &&
        departamentos.filter(
          (item) => Number(item.id) === Number(data.department_id)
        );
      setProvinces(provincias);
      const distritos =
        provinces.length > 0 &&
        provinces.map((data1, i) =>
          data1.provinces.filter((item, j) =>
            Number(item.id) === Number(data.province_id) ? item.districts : ""
          )
        );

      setDistricts(distritos);
    }
  };
  console.log(provinces);
  console.log(districts);
  // console.log(dataSelected.corporation.address.district.province.department_id);
  // console.log(dataSelected.corporation.address.district.province_id);
  // console.log(dataSelected.corporation.address.district_id);

  useEffect(() => {
    getProvinces();
  }, [data, dataSelected]);

  return (
    <div>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal modal__clinica"
        overlayClassName="modal-fondo ReactToMessage"
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
                    type="text"
                    name="ruc"
                    id="ruc"
                    style={{ border: "1px solid red !important" }}
                    // disabled={editar ? true : false}
                    defaultValue={data.ruc || ""}
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
                    defaultValue={ruc.razonSocial || data.business_name || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label className="label_commercial">Nombre comercial:</label>
                  <input
                    type="text"
                    name="commercial_name"
                    id="commercial_name"
                    defaultValue={data.name || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Responsable:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={data.name || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Teléfono:</label>
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    defaultValue={data.phone || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Correo:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={data.email || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Dirección:</label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={ruc.direccion || data.address || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Referencia:</label>
                  <input
                    type="text"
                    name="reference"
                    defaultValue={data.reference || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Departamento:</label>
                  <select
                    name="department_id"
                    onChange={(e) => handleChange(e)}
                    value={
                      dataSelected.corporation.address.district.province
                        .department_id
                    }
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
                  <label>Provincia:</label>
                  <select
                    name="province_id"
                    onChange={(e) => handleChange(e)}
                    value={
                      dataSelected.corporation.address.district.province_id
                    }
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
                  <label>Distrito:</label>
                  <select
                    name="district_id"
                    onChange={(e) => handleChange(e)}
                    value={dataSelected.corporation.address.district_id}
                  >
                    <option value="">Seleccione</option>
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
              <div className="mregistro__tipo">
                <h6>Tipo de Clínica</h6>
                <div>
                  <div>
                    <input
                      type="radio"
                      className="form-check-input"
                      name="clinic_type_id"
                      // disabled={data.clinic_type_id === 2 ? true : false}
                      defaultChecked={data.clinic_type_id === 1 ? true : false}
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
                      type="radio"
                      className="form-check-input"
                      name="clinic_type_id"
                      // disabled={data.clinic_type_id === 1 ? true : false}
                      defaultChecked={data.clinic_type_id === 2 ? true : false}
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
              <div className="mregistro__fecha">
                <h6>Días de atención</h6>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="monday"
                      defaultChecked={
                        workday.find((w) => w.day === 1) ? true : false
                      }
                      onChange={(e) => handleWorkday(e, 1)}
                    />
                    <label>L</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="tuesday"
                      defaultChecked={
                        workday.find((w) => w.day === 2) ? true : false
                      }
                      onChange={(e) => handleWorkday(e, 2)}
                    />
                    <label>M</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      defaultChecked={
                        workday.find((w) => w.day === 3) ? true : false
                      }
                      onChange={(e) => handleWorkday(e, 3)}
                    />
                    <label>M</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="thursday"
                      defaultChecked={
                        workday.find((w) => w.day === 4) ? true : false
                      }
                      onChange={(e) => handleWorkday(e, 4)}
                    />
                    <label>J</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="friday"
                      defaultChecked={
                        workday.find((w) => w.day === 5) ? true : false
                      }
                      onChange={(e) => handleWorkday(e, 5)}
                    />
                    <label>V</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="saturday"
                      defaultChecked={
                        workday.find((w) => w.day === 6) ? true : false
                      }
                      onChange={(e) => handleWorkday(e, 6)}
                    />
                    <label>S</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="sunday"
                      defaultChecked={
                        workday.find((w) => w.day === 7) ? true : false
                      }
                      onChange={(e) => handleWorkday(e, 7)}
                    />
                    <label>D</label>
                  </div>
                </div>
              </div>
              <div className="mregistro__tiempo">
                <h6>Seleccione horario por día</h6>
                <select onClick={(e) => seleccioneHorario(e)}>
                  {fechasElegidas.map((fds) =>
                    fds !== null ? (
                      <option key={fds.id} value={fds.id}>
                        {fds.name}
                      </option>
                    ) : (
                      <></>
                    )
                  )}
                </select>
                <div>
                  <label>Horario inicio de atención</label>
                  <input
                    type="time"
                    name="opening"
                    id="horario-ingreso"
                    // defaultValue={editar ? "00:00" : "00:00"}
                    onChange={(e) => actualizarHorarioOpening(e)}
                  />
                </div>
                <div>
                  <label>Horario final de atención</label>
                  <input
                    type="time"
                    name="closing"
                    id="horario-final"
                    // defaultValue={editar ? "00:00" : "23:59"}
                    onChange={(e) => actualizarHorarioClosing(e)}
                  />
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
                    // dataSelected={avatar}
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
                    // dataSelected={dataSelected}
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
