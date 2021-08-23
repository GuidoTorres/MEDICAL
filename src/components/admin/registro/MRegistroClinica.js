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
  const [ubicacion, setUbicacion] = useState();
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
      department_id:
        dataSelected &&
        dataSelected.corporation &&
        dataSelected.corporation.address &&
        dataSelected.corporation.address.district &&
        dataSelected.corporation.address.district.province &&
        dataSelected.corporation.address.district.province.department_id,
      province_id:
        dataSelected &&
        dataSelected.corporation &&
        dataSelected.corporation.address &&
        dataSelected.corporation.address.district &&
        dataSelected.corporation.address.district.province_id,
      district_id:
        dataSelected &&
        dataSelected.corporation &&
        dataSelected.corporation.address &&
        dataSelected.corporation.address.district_id,
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

    // setTimeout(() => {
    //   document.getElementById("horario-ingreso").value = _workday[0].opening;
    //   document.getElementById("horario-final").value = _workday[0].closing;
    // }, 0);
  };

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

    if (document.getElementById(`check${nro}`).checked) {
      document.getElementById(`horario-ingreso${nro}`).disabled = false;
      document.getElementById(`horario-final${nro}`).disabled = false;
    } else {
      document.getElementById(`horario-ingreso${nro}`).disabled = true;
      document.getElementById(`horario-final${nro}`).disabled = true;
    }
  };

  const actualizarHorarioOpening = (e, id) => {
    // console.log(e.target.value);
    console.log(id);
    const arreglos = [...workday];
    let position = workday.findIndex((arreglo) => arreglo.day === id);
    arreglos[position].opening = e.target.value;

    // arreglos.splice(position, id, {
    //   day: day && day.day ? day.day : "",
    //   opening: e.target.value,
    //   closing: day && day.closing ? day.closing : "",
    // });
    setWorkday([...arreglos]);
  };

  const actualizarHorarioClosing = (e, id) => {
    console.log(e.target.value);
    console.log(id);
    const arreglos = [...workday];
    console.log(arreglos);
    let position = workday.findIndex((arreglo) => arreglo.day === id);
    arreglos[position].closing = e.target.value;
    // const day = arreglos[position];
    // console.log(day);

    // arreglos.splice(position, 1, {
    //   day: day && day.day ? day.day : "",
    //   opening: day && day.opening ? day.opening : "",
    //   closing: e.target.value,
    // });
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


  const getWorkDay = (id) => {
    var encontrar = workday.findIndex((w) => w.day === id);
    if (encontrar !== -1) {
      return workday[encontrar].opening;
    } else {
      return "";
    }
  };

  const getClosing = (id) => {
    var encontrar = workday.findIndex((w) => w.day === id);
    if (encontrar !== -1) {
      return workday[encontrar].closing;
    } else {
      return "";
    }
  };

  useEffect(() => {
    if (data.department_id && editar) {
      const provincias =
        departamentos.length > 0 &&
        departamentos.filter(
          (item) => Number(item.id) === Number(data.department_id)
        );

      setProvinces(provincias);
    } else {
      const provincias =
        departamentos.length > 0 &&
        departamentos.filter(
          (item) => Number(item.id) === Number(data.department_id)
        );

      setProvinces(provincias);
    }
  }, [departamentos, data.department_id]);
  useEffect(() => {

    if (data.department_id && editar) {
      const distritos =
        provinces.length > 0 &&
        provinces.map((data1, i) =>
          data1.provinces.filter((item, j) =>
            Number(item.id) === Number(data.province_id) ? item.districts : ""
          )
        );
      setDistricts(distritos);
    } else {
      const distritos =
        provinces.length > 0 &&
        provinces.map((data1, i) =>
          data1.provinces.filter((item, j) =>
            Number(item.id) === Number(data.province_id) ? item.districts : ""
          )
        );

      setDistricts(distritos);
    }
  }, [provinces, data.province_id]);

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
                    value={data.department_id || ""}
                    name="department_id"
                    onChange={handleChange}
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
                    value={data.province_id || ""}
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
                    value={data.district_id || ""}
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
                {/* <h6>
                  <strong>Días de atención</strong>
                </h6> */}

                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Días de atención</th>
                      <th scope="col">Hora de Inicio</th>
                      <th scope="col">Hora de Fin</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        {" "}
                        <div>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="monday"
                            id="check1"
                            defaultChecked={
                              workday.find((w) => w.day === 1) ? true : false
                            }
                            onChange={(e) => handleWorkday(e, 1)}
                          />
                          <label>Lunes</label>
                        </div>
                      </th>
                      <td>
                        <input
                          type="time"
                          name="opening"
                          id="horario-ingreso1"
                          disabled
                          defaultValue={editar ? getWorkDay(1) : ""}
                          onChange={(e) => actualizarHorarioOpening(e, 1)}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          type="time"
                          name="closing"
                          id="horario-final1"
                          disabled
                          defaultValue={editar ? getClosing(1) : ""}
                          onChange={(e) => actualizarHorarioClosing(e, 1)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <div>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="tuesday"
                            id="check2"
                            defaultChecked={
                              workday.find((w) => w.day === 2) ? true : false
                            }
                            onChange={(e) => handleWorkday(e, 2)}
                          />
                          <label>Martes</label>
                        </div>
                      </th>
                      <td>
                        <input
                          type="time"
                          name="opening"
                          id="horario-ingreso2"
                          disabled
                          defaultValue={editar ? getWorkDay(2) : ""}
                          onChange={(e) => actualizarHorarioOpening(e, 2)}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          type="time"
                          name="closing"
                          id="horario-final2"
                          disabled
                          defaultValue={editar ? getClosing(2) : ""}
                          onChange={(e) => actualizarHorarioClosing(e, 2)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <div>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="wednesday"
                            id="check3"
                            defaultChecked={
                              workday.find((w) => w.day === 3) ? true : false
                            }
                            onChange={(e) => handleWorkday(e, 3)}
                          />
                          <label>Miercoles</label>
                        </div>
                      </th>
                      <td>
                        <input
                          type="time"
                          name="opening"
                          id="horario-ingreso3"
                          disabled
                          defaultValue={editar ? getWorkDay(3) : ""}
                          onChange={(e) => actualizarHorarioOpening(e, 3)}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          type="time"
                          name="closing"
                          id="horario-final3"
                          disabled
                          defaultValue={editar ? getClosing(3) : ""}
                          onChange={(e) => actualizarHorarioClosing(e, 3)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <div>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="thursday"
                            id="check4"
                            defaultChecked={
                              workday.find((w) => w.day === 4) ? true : false
                            }
                            onChange={(e) => handleWorkday(e, 4)}
                          />
                          <label>Jueves</label>
                        </div>
                      </th>
                      <td>
                        <input
                          type="time"
                          name="opening"
                          id="horario-ingreso4"
                          disabled
                          defaultValue={editar ? getWorkDay(4) : ""}
                          onChange={(e) => actualizarHorarioOpening(e, 4)}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          type="time"
                          name="closing"
                          id="horario-final4"
                          disabled
                          defaultValue={editar ? getClosing(4) : ""}
                          onChange={(e) => actualizarHorarioClosing(e, 4)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <div>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="friday"
                            id="check5"
                            defaultChecked={
                              workday.find((w) => w.day === 5) ? true : false
                            }
                            onChange={(e) => handleWorkday(e, 5)}
                          />
                          <label>Viernes</label>
                        </div>
                      </th>
                      <td>
                        <input
                          type="time"
                          name="opening"
                          id="horario-ingreso5"
                          disabled
                          defaultValue={editar ? getWorkDay(5) : ""}
                          onChange={(e) => actualizarHorarioOpening(e, 5)}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          type="time"
                          name="closing"
                          id="horario-final5"
                          disabled
                          defaultValue={editar ? getClosing(5) : ""}
                          onChange={(e) => actualizarHorarioClosing(e, 5)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <div>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="saturday"
                            id="check6"
                            defaultChecked={
                              workday.find((w) => w.day === 6) ? true : false
                            }
                            onChange={(e) => handleWorkday(e, 6)}
                          />
                          <label>Sabado</label>
                        </div>
                      </th>
                      <td>
                        <input
                          type="time"
                          name="opening"
                          id="horario-ingreso6"
                          disabled
                          defaultValue={editar ? getWorkDay(6) : ""}
                          onChange={(e) => actualizarHorarioOpening(e, 6)}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          type="time"
                          name="closing"
                          id="horario-final6"
                          disabled
                          defaultValue={editar ? getClosing(6) : ""}
                          onChange={(e) => actualizarHorarioClosing(e, 6)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        {" "}
                        <div>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            name="sunday"
                            id="check7"
                            defaultChecked={
                              workday.find((w) => w.day === 7) ? true : false
                            }
                            onChange={(e) => handleWorkday(e, 7)}
                          />
                          <label>Domingo</label>
                        </div>
                      </th>
                      <td>
                        <input
                          type="time"
                          name="opening"
                          id="horario-ingreso7"
                          disabled
                          defaultValue={editar ? getWorkDay(7) : ""}
                          onChange={(e) => actualizarHorarioOpening(e, 7)}
                        />
                      </td>
                      <td>
                        {" "}
                        <input
                          type="time"
                          name="closing"
                          id="horario-final7"
                          disabled
                          defaultValue={editar ? getClosing(7) : ""}
                          onChange={(e) => actualizarHorarioClosing(e, 7)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                  <p>
                    <strong>Ubicación</strong>
                  </p>
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
