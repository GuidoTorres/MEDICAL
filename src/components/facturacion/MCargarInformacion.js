/* eslint-disable */
import { customStyles } from "../../helpers/tablaOpciones";
import Modal from "react-modal";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";
import { useState } from "react";
import Swal from "sweetalert2";

const MCargarInformacion = ({
  openModalCargarInfo,
  setOpenModalCargarInfo,
  datos,
}) => {
  const [pdf, setPdf] = useState(null);

  const closeModal = () => {
    setOpenModalCargarInfo(false);
  };

  console.log(datos);

  const subirArchivo = () => {
    const formData = new FormData();
    // formData.append("liquidacion", datos.id);
    formData.append("file", pdf);

    fetchGETPOSTPUTDELETE(
      `billing/${datos.detail[0].settlement_id}`,
      formData,
      "POST"
    ).then((info) => {
      if (info.status === 200) {
        closeModal();
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Se cargó el resultado correctamente.",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
        });
        getAtencion();
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

    closeModal();
  };

  return (
    <>
      <Modal
        isOpen={openModalCargarInfo}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal  mfacturacion__cargar"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
        preventScroll={true}
        ariaHideApp={false}
      >
        <h3 className="title__modal">Cargar Información</h3>
        <div className="box__inputs">
          <div>
            <label>Factura</label>
            <input readOnly value={datos.code} />
          </div>
          <div>
            <label>Subir archivo</label>
            <input type="file" onChange={(e) => setPdf(e.target.files[0])} />
          </div>
        </div>
        <div className="box__buttons">
          <button className="btn botones" onClick={closeModal}>
            Cancelar
          </button>
          <button className="btn btn-success" onClick={subirArchivo}>
            Subir
          </button>
        </div>
      </Modal>
    </>
  );
};

export default MCargarInformacion;
