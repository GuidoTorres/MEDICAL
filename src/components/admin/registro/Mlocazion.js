import React, { useState } from 'react';
import Modal from 'react-modal';
import MapaGoogle from '../../Mapa/MapaGoogle';

import { customStyles } from '../../../helpers/tablaOpciones';

const Mlocazion = ({ modalLocalizacion, setModalLocalizacion }) => {
  const [dataMapa, setDataMapa] = useState({
    lat: 0,
    lng: 0,
  });
  const closeModal = () => {
    setModalLocalizacion(false);
  };
  return (
    <div>
      <Modal
        isOpen={true}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal modal__clinica-localizacion"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
        preventScroll={true}
        ariaHideApp={false}
      >
        <h3 className="title__modal">Localización</h3>
        <div className="container">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Departamento</th>
                  <th scope="col">Provicincia</th>
                  <th scope="col">Distrito</th>
                  <th scope="col">Dirección</th>
                  <th scope="col">Referencia</th>
                  <th scope="col">Editar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Lima</td>
                  <td>Lima</td>
                  <td>Ate</td>
                  <td>mz k lt 77</td>
                  <td>metro</td>
                  <td>
                    <button
                      className="btn-info"
                      style={{
                        border: 'none',
                        padding: '4px 8px',
                        color: 'white',
                        borderRadius: '5px',
                      }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Lima</td>
                  <td>Lima</td>
                  <td>Ate</td>
                  <td>mz k lt 77</td>
                  <td>metro</td>
                  <td>
                    <button
                      className="btn-info"
                      style={{
                        border: 'none',
                        padding: '4px 8px',
                        color: 'white',
                        borderRadius: '5px',
                      }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Lima</td>
                  <td>Lima</td>
                  <td>Ate</td>
                  <td>mz k lt 77</td>
                  <td>metro</td>
                  <td>
                    <button
                      className="btn-info"
                      style={{
                        border: 'none',
                        padding: '4px 8px',
                        color: 'white',
                        borderRadius: '5px',
                      }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Lima</td>
                  <td>Lima</td>
                  <td>Ate</td>
                  <td>mz k lt 77</td>
                  <td>metro</td>
                  <td>
                    <button
                      className="btn-info"
                      style={{
                        border: 'none',
                        padding: '4px 8px',
                        color: 'white',
                        borderRadius: '5px',
                      }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Lima</td>
                  <td>Lima</td>
                  <td>Ate</td>
                  <td>mz k lt 77</td>
                  <td>metro</td>
                  <td>
                    <button
                      className="btn-info"
                      style={{
                        border: 'none',
                        padding: '4px 8px',
                        color: 'white',
                        borderRadius: '5px',
                      }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Localización
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <form className="">
                    <div className="localizacion-data">
                      <div className="textolocation">
                        <div className="">
                          <label>Departamento</label>
                          <input
                            type="text"
                            placeholder="Departamento"
                            name="departamento"
                          />
                        </div>
                        <div className="">
                          <label>Provicincia</label>
                          <input
                            type="text"
                            placeholder="Provicincia"
                            name="provincia"
                          />
                        </div>
                        <div className="">
                          <label>Distrito</label>
                          <input
                            type="text"
                            placeholder="Distrito"
                            name="distrito"
                          />
                        </div>
                        <div className="">
                          <label>Dirección</label>
                          <input
                            type="text"
                            placeholder="Dirección"
                            name="direccion"
                          />
                        </div>
                        <div className="">
                          <label>Referencia</label>
                          <input
                            type="text"
                            placeholder="Referencia"
                            name="referencia"
                          />
                        </div>
                      </div>
                      <div className="mapalocation">
                        <MapaGoogle
                          dataMapa={dataMapa}
                          setDataMapa={setDataMapa}
                          // editar={editar}
                          // dataSelected={dataSelected}
                        />
                      </div>
                    </div>
                    <div className="localization-boton">
                      <button className="botones">Agregar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="list-botones">
            <button className="botones">Salir</button>
          </div> */}
        </div>
      </Modal>
    </div>
  );
};

export default Mlocazion;
