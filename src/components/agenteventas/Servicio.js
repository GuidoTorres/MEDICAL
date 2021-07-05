import React from 'react';
import Persona from './Persona';
import Empresa from './Empresa';

const Servicio = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="table-responsive barra">
            <h6>Precio para el publico en general</h6>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Tipo de prueba</th>
                  <th scope="col">Costo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mark</td>
                  <td>16</td>
                </tr>
                <tr>
                  <td>Jacob</td>
                  <td>14</td>
                </tr>
                <tr>
                  <td>Thornton</td>
                  <td>27</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="barra">
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
                    Precio para personas
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <Persona />
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Precio para empresas
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <Empresa />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicio;
