/* eslint-disable */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { fetchGETPOSTPUTDELETE, fetchRUC } from "../../../helpers/fetch";
import { customStyles } from "../../../helpers/tablaOpciones";
import { UploadAvatar } from "../../uploadAvatar/uploadAvatar";
import Swal from "sweetalert2";

const MRegistroEmpresa = ({
  openModal,
  setOpenModal,
  getCorporations,
  dataSelected,
  setDataSelected,
  editar,
  setEditar,
  servicios,
}) => {
  const [avatar, setAvatar] = useState(null);
  const [empresa, setEmpresa] = useState({
    ruc: "",
    business_name: "",
    name: "",
    phone: "",
    email: "",
  });
  const [service, setService] = useState([]);
  const [types, setTypes] = useState([]);
  const [ruc, setRuc] = useState({});
  const [error, setError] = useState(false);
  const [estado, setEstado] = useState([]);
  const [status, setStatus] = useState();

  const closeModal = () => {
    setOpenModal(false);
    setEditar(false);
    setDataSelected(null);
  };

  const getCorporationTypes = () => {
    fetchGETPOSTPUTDELETE("corporation_types")
      .then((data) => data.json())
      .then((datos) => {
        setTypes(datos.types);
      });
  };


  useEffect(() => {
    if (editar) {
      const prueba = dataSelected.company_service.map((item) => ({
        id: item.last_discount.service_id,
        state: item.state,
      }));
      setEstado(prueba);
    }
  }, [dataSelected]);

  console.log(estado);
  const getRuc = () => {
    fetchRUC(empresa.ruc, "GET")
      .then((res) => res.json())
      .then((res) => setRuc(res));
  };
  useEffect(() => {
    getCorporationTypes();
  }, []);

  useEffect(() => {
    if (empresa && empresa.ruc && empresa.ruc.length === 11) {
      getRuc();
    }
  }, [empresa.ruc]);

  useEffect(() => {
    const data1 = [];

    servicios &&
      servicios[0] &&
      servicios[0].services &&
      servicios[0].services.map((item) =>
        data1.push({
          service_id: item.id,
          state: 0,
        })
      );

    setService([...data1]);
  }, []);
  const handleService = (e, data) => {
    //editar
    if (e.target.checked && editar) {
      let position = dataSelected.company_service.findIndex(
        (arreglo) => arreglo.service_id === data.id
      );
      const arreglos = [...dataSelected.company_service];
      arreglos[position].state = 1;

      setService([...arreglos]);
    } else if (e.target.checked === false && editar) {
      let position = dataSelected.company_service.findIndex(
        (arreglo) => arreglo.service_id === data.id
      );
      const arreglos = [...dataSelected.company_service];
      arreglos[position].state = 0;
      console.log(arreglos);

      setService([...arreglos]);
    }

    //crear
    if (e.target.checked && editar === false) {
      let position = service.findIndex(
        (arreglo) => arreglo.service_id === data.id
      );
      const arreglos = [...service];
      arreglos[position].state = 1;

      setService([...arreglos]);
    } else if (e.target.checked === false && editar === false) {
      let position = service.findIndex(
        (arreglo) => arreglo.service_id === data.id
      );
      const arreglos = [...service];
      arreglos[position].state = 0;

      setService([...arreglos]);
    }
  };

  const postCorporation = (e) => {
    const formData = new FormData();

    formData.set("ruc", empresa.ruc || "");
    formData.set(
      "business_name",
      ruc.razonSocial || empresa.business_name || ""
    );
    formData.set("commercial_name", empresa.commercial_name || "");
    formData.set("logo", avatar ? avatar.file : "");

    formData.set("address", ruc.direccion || empresa.address || "");
    formData.set("reference", empresa.reference || "");

    formData.set("contacts[0][name]", empresa.name || "");
    formData.set("contacts[0][phone]", empresa.phone || "");
    formData.set("contacts[0][email]", empresa.email || "");
    formData.set("contacts[0][contact_type]", 1);

    formData.set("contacts[1][name]", empresa.name1 || "");
    formData.set("contacts[1][phone]", empresa.phone1 || "");
    formData.set("contacts[1][email]", empresa.email1 || "");
    formData.set("contacts[1][contact_type]", 2);

    formData.set("before", empresa.before || "");
    formData.set("credit", empresa.credit || "");

    if (service) {
      for (var [i, value] of Object.entries(service)) {
        formData.set(`services[${i}][service_id]`, value.service_id);
        formData.set(`services[${i}][state]`, value.state);
      }
    }

    fetchGETPOSTPUTDELETE("company", formData, "POST").then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        closeModal();
        Swal.fire({
          icon: "success",
          title: "??xito",
          text: "Se ha creado la empresa correctamente.",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
        });
        getCorporations();
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
  };

  const putCorporation = (e) => {
    const formData = new FormData();

    formData.set(
      "ruc",
      dataSelected && dataSelected.corporation.ruc
        ? dataSelected.corporation.ruc
        : ""
    );
    formData.set(
      "business_name",
      empresa.business_name
        ? empresa.business_name
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.business_name
        ? dataSelected.corporation.business_name
        : ""
    );
    formData.set(
      "commercial_name",
      empresa.commercial_name
        ? empresa.commercial_name
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.commercial_name
        ? dataSelected.corporation.commercial_name
        : ""
    );
    formData.set("logo", avatar ? avatar.file : "");

    if (empresa.address !== null || "") {
      formData.set(
        "address",
        empresa.address
          ? empresa.address
          : dataSelected &&
            dataSelected.corporation &&
            dataSelected.corporation.address &&
            dataSelected.corporation.address.address
          ? dataSelected.corporation.address.address
          : ""
      );
    }
    formData.set(
      "reference",
      empresa.reference
        ? empresa.reference
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.address &&
          dataSelected.corporation.address.reference
        ? dataSelected.corporation.address.reference
        : ""
    );

    formData.set(
      "contacts[0][name]",
      empresa.name
        ? empresa.name
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
      empresa.phone
        ? empresa.phone
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
      empresa.email
        ? empresa.email
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.contacts &&
          dataSelected.corporation.contacts[0] &&
          dataSelected.corporation.contacts[0].email
        ? dataSelected.corporation.contacts[0].email
        : ""
    );
    formData.set("contacts[0][contact_type]", 1);

    formData.set(
      "contacts[1][name]",
      empresa.name1
        ? empresa.name1
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.contacts &&
          dataSelected.corporation.contacts[1] &&
          dataSelected.corporation.contacts[1].name
        ? dataSelected.corporation.contacts[1].name
        : ""
    );
    formData.set(
      "contacts[1][phone]",
      empresa.phone1
        ? empresa.phone1
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.contacts &&
          dataSelected.corporation.contacts[1] &&
          dataSelected.corporation.contacts[1].phone
        ? dataSelected.corporation.contacts[1].phone
        : ""
    );
    formData.set(
      "contacts[1][email]",
      empresa.email1
        ? empresa.email1
        : dataSelected &&
          dataSelected.corporation &&
          dataSelected.corporation.contacts &&
          dataSelected.corporation.contacts[1] &&
          dataSelected.corporation.contacts[1].email
        ? dataSelected.corporation.contacts[1].email
        : ""
    );
    formData.set("contacts[1][contact_type]", 2);

    formData.set(
      "before",
      empresa.before
        ? empresa.before
        : dataSelected && dataSelected.billing && dataSelected.billing.before
        ? dataSelected.billing.before
        : ""
    );
    formData.set(
      "credit",
      empresa.credit
        ? empresa.credit
        : dataSelected && dataSelected.billing && dataSelected.billing.credit
        ? dataSelected.billing.credit
        : ""
    );

    if (service.length > 0) {
      for (var [i, value] of Object.entries(service)) {
        formData.set(`services[${i}][service_id]`, value.service_id);
        formData.set(`services[${i}][state]`, value.state);
      }
    }

    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    fetchGETPOSTPUTDELETE(
      `company/update/${dataSelected.id}`,
      formData,
      "POST"
    ).then((resp) => {
      setAvatar(null);
      setStatus(resp.status);
      if (resp.status === 200) {
        closeModal();
        Swal.fire({
          icon: "success",
          title: "??xito",
          text: "Se actualiz?? la empresa correctamente.",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
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
  };

  const submit = (e) => {
    e.preventDefault();

    if (empresa.ruc.trim() === "" || null) {
      document.getElementById("ruc").style = "border:1px solid red !important";
    }

    if (empresa.business_name.trim() === "" || null) {
      document.getElementById("business_name").style =
        "border:1px solid red !important";
    }

    if (empresa.name.trim() === "" || null) {
      document.getElementById("name").style = "border:1px solid red !important";
    }

    if (empresa.phone.trim() === "" || null) {
      document.getElementById("phone").style =
        "border:1px solid red !important";
    }

    if (empresa.email.trim() === "" || null) {
      document.getElementById("email").style =
        "border:1px solid red !important";
    }
    if (
      (editar === false && empresa.ruc.trim() !== null) ||
      ("" && empresa.business_name.trim() !== null) ||
      ("" && empresa.name.trim() !== null) ||
      ("" && empresa.phone.trim() !== null) ||
      ("" && empresa.email.trim() !== null) ||
      ""
    ) {
      postCorporation();
    }

    if (editar === true) {
      document.getElementById("ruc").style = "border:none";

      document.getElementById("business_name").style = "border:none";
      document.getElementById("name").style = "border:none";
      document.getElementById("phone").style = "border:none";
      document.getElementById("email").style = "border:none";

      putCorporation();
    }
  };
  useEffect(() => {
    if (status === 200) {
      getCorporations();
    }
  }, [status]);

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__empresa"
      closeTimeoutMS={200}
      preventScroll={true}
      overlayClassName="modal-fondo"
      ariaHideApp={false}
    >
      {editar ? (
        <h3 className="title__modal">Editar Empresa</h3>
      ) : (
        <h3 className="title__modal">Registar Empresa</h3>
      )}
      <div className="container">
        <form className="row mt-3" onSubmit={(e) => submit(e)}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mregistro__empresa">
            <div className="mregistro__datos">
              <div>
                <label>RUC:</label>
                <input
                  type="number"
                  name="ruc"
                  id="ruc"
                  disabled={editar ? true : false}
                  defaultValue={
                    dataSelected &&
                    dataSelected.corporation &&
                    dataSelected.corporation.ruc
                      ? dataSelected.corporation.ruc
                      : ""
                  }
                  onChange={(e) =>
                    setEmpresa({ ...empresa, ruc: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Raz??n social:</label>
                <input
                  type="text"
                  name="business_name"
                  id="business_name"
                  defaultValue={
                    editar
                      ? dataSelected &&
                        dataSelected.corporation &&
                        dataSelected.corporation.business_name
                        ? dataSelected.corporation.business_name
                        : ""
                      : ruc.razonSocial
                  }
                  onChange={(e) =>
                    setEmpresa({ ...empresa, business_name: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Nombre comercial:</label>
                <input
                  type="text"
                  name="commercial_name"
                  defaultValue={
                    dataSelected &&
                    dataSelected.corporation &&
                    dataSelected.corporation.commercial_name
                      ? dataSelected.corporation.commercial_name
                      : ""
                  }
                  onChange={(e) =>
                    setEmpresa({ ...empresa, commercial_name: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Direcci??n:</label>
                <input
                  type="text"
                  name="address"
                  defaultValue={
                    editar
                      ? dataSelected &&
                        dataSelected.corporation &&
                        dataSelected.corporation.address &&
                        dataSelected.corporation.address.address
                        ? dataSelected.corporation.address.address
                        : ""
                      : ruc.direccion
                  }
                  onChange={(e) =>
                    setEmpresa({
                      ...empresa,
                      address: e.target.value,
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
                    dataSelected &&
                    dataSelected.corporation &&
                    dataSelected.corporation.address &&
                    dataSelected.corporation.address.reference
                      ? dataSelected.corporation.address.reference
                      : ""
                  }
                  onChange={(e) =>
                    setEmpresa({
                      ...empresa,

                      reference: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label>Rubro:</label>
                <select
                  aria-label="Default select example"
                  name="corporation_type_id"
                  id="corporation_type_id"
                  defaultValue={
                    dataSelected &&
                    dataSelected.corporation &&
                    dataSelected.corporation.corporation_type_id
                      ? dataSelected.corporation.corporation_type_id
                      : ""
                  }
                  onChange={(e) =>
                    setEmpresa({
                      ...empresa,
                      corporation_type_id: e.target.value,
                    })
                  }
                >
                  <option value="Agroindustria">Seleccione</option>
                  {types.length > 0 &&
                    types.map((rubro, i) => (
                      <option key={i} value={i + 1}>
                        {rubro.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="mregistro__contacto">
              <h6>Cont??cto de la empresa</h6>
              <div className="">
                <div>
                  <label>Responsable:</label>
                  <input
                    type="text"
                    name="contactsname"
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
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Tel??fono:</label>
                  <input
                    type="number"
                    name="contactsphone"
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
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,

                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Correo:</label>
                  <input
                    type="email"
                    name="contactsemail"
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
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mregistro__recursos">
              <h6>Cont??cto en Recusos humanos</h6>
              <div className="">
                <div>
                  <label>Responsable:</label>
                  <input
                    type="text"
                    defaultValue={
                      dataSelected &&
                      dataSelected.corporation &&
                      dataSelected.corporation.contacts &&
                      dataSelected.corporation.contacts[1] &&
                      dataSelected.corporation.contacts[1].name
                        ? dataSelected.corporation.contacts[1].name
                        : ""
                    }
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,

                        name1: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Tel??fono:</label>
                  <input
                    type="number"
                    defaultValue={
                      dataSelected &&
                      dataSelected.corporation &&
                      dataSelected.corporation.contacts &&
                      dataSelected.corporation.contacts[1] &&
                      dataSelected.corporation.contacts[1].phone
                        ? dataSelected.corporation.contacts[1].phone
                        : ""
                    }
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,

                        phone1: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Correo:</label>
                  <input
                    type="email"
                    defaultValue={
                      dataSelected &&
                      dataSelected.corporation &&
                      dataSelected.corporation.contacts &&
                      dataSelected.corporation.contacts[1] &&
                      dataSelected.corporation.contacts[1].email
                        ? dataSelected.corporation.contacts[1].email
                        : ""
                    }
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,

                        email1: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
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
            <div className="mregistro__facturacion">
              <h6>Datos de facturaci??n</h6>
              <div>
                <div>
                  <label>Facturaci??n(d??as)</label>
                  <input
                    type="number"
                    defaultValue={
                      dataSelected &&
                      dataSelected.billing &&
                      dataSelected.billing.before
                        ? dataSelected.billing.before
                        : ""
                    }
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,
                        before: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label>Cr??dito(d??as)</label>
                  <input
                    type="number"
                    defaultValue={
                      dataSelected &&
                      dataSelected.billing &&
                      dataSelected.billing.credit
                        ? dataSelected.billing.credit
                        : ""
                    }
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,
                        credit: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mregistro__facturacion">
              <h6>Seleccionar servicio</h6>
              <div>
                <div>
                  <label>Tipo de servicio</label>
                  <select
                    aria-label="Default select example"
                    value={
                      dataSelected &&
                      dataSelected.company_service &&
                      dataSelected.company_service[0] &&
                      dataSelected.company_service[0].service
                        .service_category_id &&
                      dataSelected.company_service[0].service
                        .service_category_id
                    }
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,

                        service_id: e.target.value,
                      })
                    }
                  >
                    <option value="">Seleccione</option>
                    <option value="1">Covid 19</option>
                  </select>
                </div>
                <div>
                  <label style={{ width: "50%" }}>Plan de atenci??n</label>
                  <div className="mselect">
                    <div className="mselect__item">
                      {servicios &&
                        servicios[0] &&
                        servicios[0].services &&
                        servicios[0].services.map((data, i) => (
                          <>
                            <input
                              key={i}
                              type="checkbox"
                              className="w-auto"
                              id={`check${data.id}`}
                              value={data.id}
                              defaultChecked={
                                estado && estado[i] && estado[i].state === 1
                                  ? true
                                  : false
                              }
                              onChange={(e) => handleService(e, data)}
                            />
                            <label>{data.abbreviation}</label>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="list-botones">
                {editar === true ? (
                  <button className="botones mregistro__botones" type="submit">
                    Editar
                  </button>
                ) : (
                  <button className="botones mregistro__botones" type="submit">
                    Aceptar
                  </button>
                )}
                <button
                  className="botones mregistro__botones"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Modal>
    // </div>
  );
};

export default MRegistroEmpresa;
