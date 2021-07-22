import React, { useState } from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { fetchGETPOSTPUTDELETEJSON } from "../../helpers/fetch";

// USAR ESTADISTCAS RECEPCION /recepcionista/estadisticas

const Estadisticas = () => {
  const [fechas, setFechas] = useState({});
  const [estadisticas, setEstadisticas] = useState({});
  const data = {
    labels: [
      estadisticas && estadisticas.labels && estadisticas.labels[0]
        ? "Eclia"
        : "",
      estadisticas && estadisticas.labels && estadisticas.labels[1]
        ? "Rápida"
        : "",
      estadisticas && estadisticas.labels && estadisticas.labels[2]
        ? "Molecular"
        : "",
      estadisticas && estadisticas.labels && estadisticas.labels[3]
        ? "Antígeno"
        : "",
      estadisticas && estadisticas.labels && estadisticas.labels[3]
        ? "RT-PCR"
        : "",
    ],
    datasets: [
      {
        label: "Pruebas COVID19",
        data: estadisticas.data,
        fill: true,
        backgroundColor: [
          "rgba(75,192,192,0.2)",
          "rgba(75,192,192,0.2)",
          "rgba(75,192,192,0.2)",
          "rgba(75,192,192,0.2)",
        ],
        borderColor: "rgba(75,192,192,1)",
      },
    ],

    options: {
      maintainAspectRatio: false,
      responsive: true,
    },
  };
  const handleChange = (e) => {
    setFechas({
      ...fechas,
      [e.target.name]: e.target.value,
    });
  };

  console.log(fechas);
  const getEstadisticas = () => {
    fetchGETPOSTPUTDELETEJSON("receptionista/estadisticas", fechas, "POST")
      .then((resp) => resp.json())
      .then((res) => setEstadisticas(res));
  };
  console.log(estadisticas);
  return (
    <div className="container">
      {/* <h2 className="mt-3">Estadísticas</h2> */}

      <div className="row mt-2">
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 recepcion__estadistica">
          <div className="barra">
            <label htmlFor="">Seleccionar el intervalo de tiempo</label>
            <div className="adminestadistica__fecha">
              <label>Fecha</label>
              <div className="adminestadistica__subfecha">
                <div>
                  <label>Inicio:</label>
                  <input
                    type="date"
                    name="fecha_inicio"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div>
                  <label>Fin:</label>
                  <input
                    type="date"
                    name="fecha_fin"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
            </div>

            <button
              className="botones mt-5 "
              style={{
                width: "200px",
                borderRadius: "8px",
                marginBottom: "30px",
                marginLeft: "120px",
              }}
              onClick={() => getEstadisticas()}
            >
              Obtener estadísticas
            </button>
          </div>
        </div>

        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <div className="barra">
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
                <Bar className=" mt-5" data={data} />
              </div>
              <div
                class="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <Pie data={data} style={{ width: "50%", height: "40%" }}></Pie>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadisticas;
