/* eslint-disable */
import { customStyles } from "../../helpers/tablaOpciones";
import Modal from "react-modal";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";

const MCargarInformacion = ({
  openModalCargarInfo,
  setOpenModalCargarInfo,
  datos,
}) => {
  const [pdf, setPdf] = useState(null);

  const closeModal = () => {
    setOpenModalCargarInfo(false);
  };

  const subirArchivo = () => {
    const formData = new FormData();
    formData.append("liquidacion", datos.id);
    formData.append("factura", pdf);

    fetchGETPOSTPUTDELETE("liquidacion/cargar-factura", formData, "POST")
      .then((info) => info.json())
      .then((info) => {
        console.log(info);
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
