import React, { useState } from 'react';
import Modal from 'react-modal';
import { customStyles } from '../../helpers/tablaOpciones';
import { UploadAvatar } from '../../components/uploadAvatar/uploadAvatar';

const MRegistrarEmpresa = ({ openModal, setOpenModal }) => {
  const [avatar, setAvatar] = useState(null);
  const closeModal = () => {
    setOpenModal(false);
    console.log('cerrar modal');
  };

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
                <input type="text" />
              </div>
              <div>
                <label>Razón social:</label>
                <input type="text" />
              </div>
              <div>
                <label>Nombre comercial:</label>
                <input type="text" />
              </div>
              <div>
                <label>Dirección:</label>
                <input type="text" />
              </div>
              <div>
                <label>Referencia:</label>
                <input type="text" />
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
                  <input type="text" />
                </div>
                <div>
                  <label>Teléfono:</label>
                  <input type="text" />
                </div>
                <div>
                  <label>Correo:</label>
                  <input type="text" />
                </div>
              </div>
            </div>
            <div className="mregistro__recursos">
              <h6>Contácto en Recusos humanos</h6>
              <div className="">
                <div>
                  <label>Responsable:</label>
                  <input type="text" />
                </div>
                <div>
                  <label>Teléfono:</label>
                  <input type="text" />
                </div>
                <div>
                  <label>Correo:</label>
                  <input type="text" />
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
                  <input type="number" />
                </div>
                <div>
                  <label>Crédito(días)</label>
                  <input type="number" />
                </div>
              </div>
            </div>
            <div className="mregistro__facturacion">
              <h6>Seleccionar servicio</h6>
              <div>
                <div>
                  <label>Tipo de serivicio</label>
                  <select aria-label="Default select example">
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
              <button className="botones mregistro__botones">Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
    // </div>
  );
};

export default MRegistrarEmpresa;
