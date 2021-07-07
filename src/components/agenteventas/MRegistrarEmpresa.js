import React, { useState } from "react";
import Modal from "react-modal";
import { customStyles } from "../../helpers/tablaOpciones";
import { UploadAvatar } from "../../components/uploadAvatar/uploadAvatar";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";

const MRegistrarEmpresa = ({ openModal, setOpenModal }) => {
  const [avatar, setAvatar] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const closeModal = () => {
    setOpenModal(false);
    console.log("cerrar modal");
  };

  const handleChange = (e) => {
    setEmpresa({
      ...empresa,

      [e.target.name]: e.target.value,
    });
  };

  const postEmpresa = () => {
    const formData = new FormData();

    formData.set("ruc", empresa.ruc || "");
    formData.set("business_name", empresa.business_name || "");
    formData.set("commercial_name", empresa.commercial_name || "");
    formData.set("logo", "AAAAAAA");

    formData.set("address", empresa.address || "");
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

    formData.set("services[0][service_id]", empresa.service_id || "");

    fetchGETPOSTPUTDELETE("company", formData, "POST").then((resp) => {
      console.log(resp);
      if (resp.status === 200) {
        closeModal();
        // getCorporations();
      }
    });
  };

  console.log(empresa);

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
      <h3 className="title__modal">Registar Empresa</h3>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12 col-sm-12 col-md-6 col-xl-6 mregistro__empresa">
            <div className="mregistro__datos">
              <div>
                <label>RUC:</label>
                <input
                  type="text"
                  name="ruc"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label>Razón social:</label>
                <input
                  type="text"
                  name="business_name"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label>Nombre comercial:</label>
                <input
                  type="text"
                  name="commercial_name"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label>Dirección:</label>
                <input
                  type="text"
                  name="address"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label>Referencia:</label>
                <input
                  type="text"
                  name="reference"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <label>Rubro:</label>
                <select aria-label="Default select example">
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
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
                    name="name"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Teléfono:</label>
                  <input
                    type="text"
                    name="phone"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Correo:</label>
                  <input
                    type="text"
                    name="email"
                    onChange={(e) => handleChange(e)}
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
                    name="name1"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Teléfono:</label>
                  <input
                    type="text"
                    name="phone1"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Correo:</label>
                  <input
                    type="text"
                    name="email1"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6 col-xl-6">
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
                    name="before"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Crédito(días)</label>
                  <input
                    type="number"
                    name="credit"
                    onChange={(e) => handleChange(e)}
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
                    name="service_id"
                    onChange={(e) => handleChange(e)}
                  >
                    <option selected>Seleccione</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div>
                  <label>Plan de atención</label>
                  <select aria-label="Default select example">
                    <option selected>Seleccione</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
              <button className="botones mregistro__botones" onClick={()=> postEmpresa()}>Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    // </div>
  );
};

export default MRegistrarEmpresa;
