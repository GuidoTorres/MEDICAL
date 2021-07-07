import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

const Estadisticas = () => {
  const data = {
    labels: ['lunes', 'martes', 'miercoles', 'jueves'],
    datasets: [
      {
        label: 'First dataset',
        data: [33, 53, 85, 41],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],

    options: {
      maintainAspectRatio: false,
      responsive: true,
    },
  };
  return (
    <div className="container">
      {/* <h2 className="mt-3">Estadísticas</h2> */}

      <label htmlFor="">Seleccionar el intervalo de tiempo</label>

      <div className="row mt-2">
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 recepcion__estadistica barra">
            <div className="adminestadistica__fecha">
              <label>Día</label>
              <div className="adminestadistica__subfecha">
                <div>
                  <label>Inicio:</label>
                  <input type="number" />
                </div>
                <div>
                  <label>Fin:</label>
                  <input type="number" />
                </div>
              </div>
            </div>
            <div className="adminestadistica__fecha">
              <label>Mes</label>
              <div className="adminestadistica__subfecha">
                <div>
                  <label>Inicio:</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Seleccionar</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div>
                  <label>Fin:</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Seleccionar</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="adminestadistica__fecha">
              <label>Año</label>
              <div className="adminestadistica__subfecha">
                <div>
                  <label>Inicio:</label>
                  <input type="number" />
                </div>
                <div>
                  <label>Fin:</label>
                  <input type="number" />
                </div>
              </div>
            </div>

        </div>

        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 barra">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Totales
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Tipo de prueba
              </button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <Bar className="bar mt-5" data={data} />
            </div>
            <div
              class="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <Doughnut
                data={data}
                style={{ width: '50%', height: '40%', marginLeft: '100px' }}
              ></Doughnut>
            </div>
          </div>
        </div>
        <button
          className="botones mt-5"
          style={{ width: '200px', borderRadius: '8px', marginBottom: '30px' }}
        >
          Descargar Excel
        </button>
      </div>
    </div>
  );
};

export default Estadisticas;
