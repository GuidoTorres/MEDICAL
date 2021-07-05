import React, { useEffect, useState } from "react";

import Modal from "react-modal";
import { fetchGETPOSTPUTDELETE } from "../../../helpers/fetch";
import { customStyles } from "../../../helpers/tablaOpciones";
import { UploadAvatar } from "../../uploadAvatar/uploadAvatar";

const MTrabajador = ({
  openModal,
  setOpenModal,
  getEmployee,
  dataSelected,
  editar,
  setEditar,
  setDataSelected,
}) => {
  const [avatar, setAvatar] = useState(null);
  const [trabajador, setTrabajador] = useState({});
  const [editarTrabajador, setEditarTrabajador] = useState(null);

  const closeModal = () => {
    setOpenModal(false);
    setEditar(false);
    setDataSelected(null);
  };

  const postEmployee = () => {
    const formData = new FormData();
    formData.set("dni", trabajador.dni || "");
    formData.set("name", trabajador.name || "");
    formData.set("pat_lastname", trabajador.pat_lastname || "");
    formData.set("mom_lastname", trabajador.mom_lastname || "");
    formData.set("email", trabajador.email || "");
    formData.set("cellphone", trabajador.cellphone || "");
    formData.set("photo",  "imagen");
    formData.set("role_id", trabajador.role_id || "");

    fetchGETPOSTPUTDELETE("employees", formData, "POST").then((resp) => {
      if (resp) {
        closeModal();
        getEmployee();
      }
      console.log(resp);
    });
  };

  const putEmployee = () => {
    const formData = new FormData();
    formData.set("dni", editarTrabajador.dni || "");
    formData.set("name", editarTrabajador.name || "");
    formData.set("pat_lastname", editarTrabajador.pat_lastname || "");
    formData.set("mom_lastname", editarTrabajador.mom_lastname || "");
    formData.set("email", editarTrabajador.email || "");
    formData.set("cellphone", editarTrabajador.cellphone || "");
    formData.set("photo", "avatar.file" || "");
    formData.set("role_id", editarTrabajador.role_id || "");
    fetchGETPOSTPUTDELETE(`employees/${dataSelected.id}`, formData, "PUT").then(
      (resp) => {
        console.log(resp);
        if (resp.status === 200) {
          closeModal();
          getEmployee();
        }
      }
    );
  };

  const handleOnChange = (e) => {

    if (editar === true) {
      setEditarTrabajador({
        ...editarTrabajador,
        [e.target.name]: e.target.value,
      });
    } else {
      setTrabajador({
        ...trabajador,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  useEffect(() => {
    if (dataSelected) {
      setEditarTrabajador({

        dni: dataSelected && dataSelected.person ? dataSelected.person.dni : "",
        name: dataSelected && dataSelected.person ? dataSelected.person.name : "",
        pat_lastname: dataSelected && dataSelected.person ? dataSelected.person.pat_lastname : "",
        mom_lastname:dataSelected && dataSelected.person ? dataSelected.person.mom_lastname: "",
        email:dataSelected && dataSelected.person ? dataSelected.person.email : "",
        cellphone:dataSelected && dataSelected.person ? dataSelected.person.cellphone: "",
        role_id: dataSelected && dataSelected.role ? dataSelected.role.id : "",
      });
    }
  }, [dataSelected]);

  console.log(editarTrabajador);

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__trabajador"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Registrar Trabajador</h3>
      <div className="container">
        <form className="row mt-3" onSubmit={handleSubmit}>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mregistro__trabajador">
            <div className="">
              <div>
                <label>DNI:</label>
                <input
                  type="text"
                  name="dni"
                  defaultValue={
                    dataSelected && dataSelected.person
                      ? dataSelected.person.dni
                      : ""
                  }
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label>Nombre:</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={
                    dataSelected && dataSelected.person
                      ? dataSelected.person.name
                      : ""
                  }
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label>A. Paterno:</label>
                <input
                  type="text"
                  name="pat_lastname"
                  defaultValue={
                    dataSelected &&
                    dataSelected.person &&
                    dataSelected.person.pat_lastname
                  }
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label>A. Materno:</label>
                <input
                  type="text"
                  name="mom_lastname"
                  defaultValue={
                    dataSelected &&
                    dataSelected.person &&
                    dataSelected.person.mom_lastname
                  }
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label>Correo:</label>
                <input
                  type="text"
                  name="email"
                  defaultValue={
                    dataSelected &&
                    dataSelected.person &&
                    dataSelected.person.email
                  }
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label>Teléfono:</label>
                <input
                  type="text"
                  name="cellphone"
                  defaultValue={
                    dataSelected &&
                    dataSelected.person &&
                    dataSelected.person.cellphone
                  }
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label>Tipo trabajador:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="role_id"
                  defaultValue={
                    dataSelected && dataSelected.person && dataSelected.role.id
                  }
                  onChange={handleOnChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="1">Laboratorio</option>
                  <option value="2">Organizador</option>
                  <option value="3">Recepcionista</option>
                  <option value="4">Transportista</option>
                  <option value="5">Facturacion</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 mregistro__trabajador">
            <div className="mregistro__ubicacion">
              <div className="icons">
                <p>Fotografía</p>
                {/* <i className="fab fa-algolia"></i> */}
              </div>
            </div>
            <div className="mregistro__logo">
              <p>
                Imagen <span>(.jpg, .jpeg, .jpg)</span>
              </p>
              <div>
                <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
              </div>
            </div>

            <div className="list-botones">
              <button className="botones" onClick={closeModal}>
                Cancelar
              </button>
              {editar === true ? (
                <button className="botones" onClick={putEmployee}>
                  Editar
                </button>
              ) : (
                <button className="botones" onClick={postEmployee}>
                  Agregar
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default MTrabajador;
