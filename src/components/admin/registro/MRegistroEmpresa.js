import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { fetchGETPOSTPUTDELETE } from "../../../helpers/fetch";
import { customStyles } from "../../../helpers/tablaOpciones";
import { UploadAvatar } from "../../uploadAvatar/uploadAvatar";

const MRegistroEmpresa = ({
  openModal,
  setOpenModal,
  getCorporations,
  dataSelected,
  setDataSelected,
  editar,
  setEditar,
}) => {
  const [avatar, setAvatar] = useState(null);
  const [empresa, setEmpresa] = useState({});
  // const [empresaEditar, setEditarEmpresa] = useState(null)

  const closeModal = () => {
    setOpenModal(false);
    setEditar(false);
    setDataSelected(null);
  };

  const postCorporation = () => {
    const formData = new FormData();

    formData.set("ruc", empresa && empresa.ruc);
    formData.set("business_name", empresa && empresa.business_name);
    formData.set("commercial_name", empresa && empresa.commercial_name);
    formData.set("logo", "AAAAAAA");

    formData.set("address", empresa && empresa.address.address);
    formData.set("reference", empresa && empresa.address.reference);


    formData.set("contacts[0][name]", empresa && empresa.contacts.name);
    formData.set("contacts[0][phone]", empresa && empresa.contacts.phone);
    formData.set("contacts[0][email]", empresa && empresa.contacts.email);
    formData.set("contacts[0][contact_type]", 1);

    formData.set("before", empresa && empresa.billing.before);
    formData.set("credit", empresa && empresa.billing.credit);

    formData.set(
      "services[0][service_id]",
      empresa && empresa.services.service_id
    );

    fetchGETPOSTPUTDELETE("company", formData, "POST").then((resp) => {
      if (resp) {
        closeModal();
        getCorporations();
      }
    });
  };

  console.log(dataSelected);

  const putCorporation = () => {
    
    const formData = new FormData();

    formData.set("ruc", empresa && empresa.ruc);
    formData.set("business_name", empresa && empresa.business_name);
    formData.set("commercial_name", empresa && empresa.commercial_name);
    formData.set("logo", "AAAAAAA");

    formData.set("address", empresa && empresa.address);
    formData.set("reference", empresa && empresa.reference);


    formData.set("contacts[0][name]", empresa && empresa.contacts[0].name);
    formData.set("contacts[0][phone]", empresa && empresa.contacts[0].phone);
    formData.set("contacts[0][email]", empresa && empresa.contacts[0].email);
    formData.set("contacts[0][contact_type]", 1);

    formData.set("contacts[1][name]", empresa && empresa.contacts[1].name);
    formData.set("contacts[1][phone]", empresa && empresa.contacts[1].phone);
    formData.set("contacts[1][email]", empresa && empresa.contacts[1].email);
    formData.set("contacts[1][contact_type]", 1);

    formData.set("before", empresa && empresa.before);
    formData.set("credit", empresa && empresa.credit);

    formData.set(
      "services[service_id]",
      1
    );
    fetchGETPOSTPUTDELETE(
      `company/${dataSelected.id}`,
      formData,
      "PUT"
    ).then((resp) => {
      if (resp) {
        closeModal();
        getCorporations();
      }
    }).catch(err => console.log(err))
  };

  useEffect(()=>{

    if(dataSelected){
      setEmpresa({
    ruc: dataSelected && dataSelected.corporation ? dataSelected.corporation.ruc : "",
    business_name: dataSelected && dataSelected.corporation ? dataSelected.corporation.business_name : "",
    commercial_name: dataSelected && dataSelected.corporation ? dataSelected.corporation.commercial_name : "",
    logo: "logo img",
    address: dataSelected && dataSelected.corporation && dataSelected.corporation.address ? dataSelected.corporation.address.address : "",
    reference: dataSelected && dataSelected.corporation && dataSelected.corporation.address ? dataSelected.corporation.address.reference : "",
    contacts:[
        {
            name:"name21",
            phone:"9534648781",
            email:"emailemail1",
            contact_type:1
        },
        {
            name:"name42",
            phone:9534648782,
            email:"emailemail2",
            contact_type:2
        }
    ],
    before: dataSelected && dataSelected.billing ? dataSelected.billing.before : "",
    credit: dataSelected && dataSelected.billing ? dataSelected.billing.credit : "",
    services:[
        {
            service_id:2
        }
    ]
      })
    } else{
      setEmpresa(null)
    }

  },[dataSelected])


  return (
    // <div className="">
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
    {editar ?
      <h3 className="title__modal">Editar Empresa</h3>
      :
      <h3 className="title__modal">Registar Empresa</h3>
    }
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mregistro__empresa">
            <div className="mregistro__datos">
              <div>
                <label>RUC:</label>
                <input
                  type="text"
                  name="ruc"
                  defaultValue={
                    dataSelected && dataSelected.corporation
                      ? dataSelected.corporation.ruc
                      : ""
                  }
                  onChange={(e) =>
                    setEmpresa({ ...empresa, ruc: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Razón social:</label>
                <input
                  type="text"
                  name="business_name"
                  defaultValue={
                    dataSelected && dataSelected.corporation
                      ? dataSelected.corporation.business_name
                      : ""
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
                    dataSelected && dataSelected.corporation
                      ? dataSelected.corporation.commercial_name
                      : ""
                  }
                  onChange={(e) =>
                    setEmpresa({ ...empresa, commercial_name: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Dirección:</label>
                <input
                  type="text"
                  name="address"
                  // defaultValue={
                  //   dataSelected && dataSelected.corporation.address
                  //     ? dataSelected.corporation.address.address
                  //     : ''
                  // }
                  onChange={(e) =>
                    setEmpresa({
                      ...empresa,
                      address: { ...empresa.address, address: e.target.value },
                    })
                  }
                />
              </div>
              <div>
                <label>Referencia:</label>
                <input
                  type="text"
                  name="reference"
                  // defaultValue={
                  //   dataSelected && dataSelected.corporation.address
                  //     ? dataSelected.corporation.address.reference
                  //     : ''
                  // }
                  onChange={(e) =>
                    setEmpresa({
                      ...empresa,
                      address: {
                        ...empresa.address,
                        reference: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div>
                <label>Rubro:</label>
                <select
                  aria-label="Default select example"
                  name="corporation_type_id"
                  onChange={(e) =>
                    setEmpresa({
                      ...empresa,
                      corporation_type_id: e.target.value,
                    })
                  }
                >
                  <option value="Agroindustria">Seleccione</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">One</option>
                  <option value="5">Two</option>
                  <option value="6">Three</option>
                </select>
              </div>
            </div>
            <div className="mregistro__contacto">
              <h6>Contácto de la empresa</h6>
              <div className="">
                <div>
                  <label>Responsable:</label>
                  <input
                    type="text"
                    name="contactsname"
                    defaultValue={
                      dataSelected &&
                      dataSelected.contacts &&
                      dataSelected.contacts[0]
                        ? dataSelected.contacts[0].name
                        : ""
                    }
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,
                        contacts: { ...empresa.contacts, name: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label>Teléfono:</label>
                  <input
                    type="text"
                    name="contactsphone"
                    defaultValue={
                      dataSelected &&
                      dataSelected.contacts &&
                      dataSelected.contacts[0]
                        ? dataSelected.contacts[0].phone
                        : ""
                    }
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,
                        contacts: {
                          ...empresa.contacts,
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
                    name="contactsemail"
                    defaultValue={
                      dataSelected &&
                      dataSelected.contacts &&
                      dataSelected.contacts[0]
                        ? dataSelected.contacts[0].email
                        : ""
                    }
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,
                        contacts: {
                          ...empresa.contacts,
                          email: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mregistro__recursos">
              <h6>Contácto en Recusos humanos</h6>
              <div className="">
                <div>
                  <label>Responsable:</label>
                  <input
                    type="text"
                    defaultValue={
                      dataSelected &&
                      dataSelected.contacts &&
                      dataSelected.contacts[0]
                        ? dataSelected.contacts[1].name
                        : ""
                    }

                    // onChange={(e) =>
                    //   setEmpresa({
                    //     ...empresa,
                    //     contacts: { ...empresa.contacts, name: e.target.value },
                    //   })
                    // }
                  />
                </div>
                <div>
                  <label>Teléfono:</label>
                  <input
                    type="text"
                    defaultValue={
                      dataSelected &&
                      dataSelected.contacts &&
                      dataSelected.contacts[0]
                        ? dataSelected.contacts[1].phone
                        : ""
                    }
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,
                        contacts: {
                          ...empresa.contacts,
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
                    defaultValue={
                      dataSelected &&
                      dataSelected.contacts &&
                      dataSelected.contacts[0]
                        ? dataSelected.contacts[1].email
                        : ""
                    }
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,
                        contacts: {
                          ...empresa.contacts,
                          email: e.target.value,
                        },
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
                <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
              </div>
            </div>
            <div className="mregistro__facturacion">
              <h6>Datos de facturación</h6>
              <div>
                <div>
                  <label>Facturación(días)</label>
                  <input
                    type="number"
                    defaultValue={
                      dataSelected && dataSelected.billing
                        ? dataSelected.billing.before
                        : ""
                    }
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,
                        billing: { ...empresa.billing, before: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <label>Crédito(días)</label>
                  <input
                    type="number"
                    defaultValue={
                      dataSelected && dataSelected.billing
                        ? dataSelected.billing.credit
                        : ""
                    }
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,
                        billing: { ...empresa.billing, credit: e.target.value },
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
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,
                        services: {
                          ...empresa.services,
                          service_id: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="">Seleccione</option>
                    <option value="1">Covid 19</option>
                  </select>
                </div>
                <div>
                  <label>Plan de atención</label>
                  <select
                    aria-label="Default select example"
                    onChange={(e) =>
                      setEmpresa({
                        ...empresa,
                        services: {
                          ...empresa.services,
                          service_id: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="">Seleccione</option>
                    <option value="1">Antígeno</option>
                    <option value="2">Electroquimioluminiscencia</option>
                    <option value="3">RT-PCR</option>
                    <option value="3">Inmunocromatografia</option>
                  </select>
                </div>
              </div>
              <div className="list-botones">
                {editar === true ? (
                  <button
                    className="botones mregistro__botones"
                    onClick={(e) => putCorporation(e)}
                  >
                    Editar
                  </button>
                ) : (
                  <button
                    className="botones mregistro__botones"
                    onClick={postCorporation}
                  >
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
        </div>
      </div>
    </Modal>
    // </div>
  );
};

export default MRegistroEmpresa;
