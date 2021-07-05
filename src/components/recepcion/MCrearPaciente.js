import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { customStyles } from '../../helpers/tablaOpciones';
import { UploadAvatar } from '../uploadAvatar/uploadAvatar';
import WebCamScreenshot from '../webcam/WebCamScreenshot';

const MCrearPaciente = ({ addRegistro, setAddRegistro }) => {
  const [avatar, setAvatar] = useState(null);
  const [imagenes, setImagenes] = useState(false);
  const closeModal = () => {
    setAddRegistro(false);
  };
  const handleCambio = () => {
    setImagenes(true);
  };
  return (
    <Modal
      isOpen={addRegistro}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal mrecepcion__usuario"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Registro de nuevo usuario</h3>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mreceptcion__crearusuario">
            <div>
              <p>Datos generales</p>
              <div>
                <label htmlFor="">Tipo de documento:</label>
                <select>
                  <option selected>Seleccione</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Número de documento:</label>
                <input type="text" placeholder="" />
              </div>
              <div>
                <label htmlFor="">Apellido paterno:</label>
                <input type="text" placeholder="" />
              </div>
              <div>
                <label htmlFor="">Apellido materno:</label>
                <input type="text" placeholder="" />
              </div>
              <div>
                <label htmlFor="">Nombre:</label>
                <input type="text" placeholder="" />
              </div>
            </div>
            <div>
              <p>Datos de nacimiento:</p>
              <div>
                <label htmlFor="">Sexo:</label>
                <select>
                  <option selected>Seleccione</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Fecha de nacimiento:</label>
                <input type="text" placeholder="" />
              </div>
              <div>
                <label htmlFor="">Edad:</label>
                <input type="text" placeholder="" />
              </div>
              <div>
                <label htmlFor="">Religión:</label>
                <input type="text" placeholder="" />
              </div>
              <div>
                <label htmlFor="">País: </label>
                <select>
                  <option value="">Seleccione</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Departmento:</label>
                <select>
                  <option value="">Seleccione</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Provincia:</label>
                <select>
                  <option value="">Seleccione</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Distrito: </label>
                <select>
                  <option value="">Seleccione</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div>
              <p>Datos de domicilio</p>
              <div>
                <label htmlFor="">País: </label>
                <select>
                  <option selected>Seleccione</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              <div>
                <label htmlFor="">Departmento: </label>
                <select>
                  <option selected>Seleccione</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              <div>
                <label htmlFor="">Provincia:</label>
                <select>
                  <option selected>Seleccione</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              <div>
                <label htmlFor="">Distrito: </label>
                <select>
                  <option selected>Seleccione</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div>
                <label htmlFor="">Dirección:</label>
                <input type="text" placeholder="" />
              </div>
            </div>
          </div>
          <div className="col-md-6 mreceptcion__crearusuario">
            <div>
              <p>Otros datos</p>
              <div>
                <label htmlFor="">Estado civil:</label>
                <select>
                  <option selected>Seleccione</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              <div>
                <label htmlFor="">Grado de instrucción:</label>
                <select>
                  <option value="">Seleccione</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              <div>
                <label htmlFor="">Teléfono celular:</label>
                <input type="text" placeholder="" />
              </div>

              <div>
                <label htmlFor="">Teléfono fijo:</label>
                <input type="text" placeholder="" />
              </div>

              <div>
                <label htmlFor="">Correo:</label>
                <input type="text" placeholder="" />
              </div>

              <div>
                <label htmlFor="">Teléfono de emergencia:</label>
                <input type="text" placeholder="" />
              </div>

              <div>
                <label htmlFor="">Contacto de emergencia:</label>
                <input type="text" placeholder="" />
              </div>
            </div>
            <div>
              <p>Puesto ocupacional</p>
              <div>
                <input type="text" placeholder="" />
              </div>
              {/*  */}
              <div>
                <label htmlFor="">Tipo de usuario:</label>
                <select>
                  <option value="">Seleccione</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div>
                <input type="text" placeholder="Buscar" />
              </div>
              <div>
                <input type="text" placeholder="" disabled />
              </div>
            </div>
            <div>
              <div>
                <p>Fotografía</p>
                <i class="fas fa-camera" onClick={handleCambio}></i>
              </div>
              <div>
                {!imagenes ? (
                  <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
                ) : (
                  <WebCamScreenshot />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MCrearPaciente;
