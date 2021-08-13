/* eslint-disable */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import { customStyles } from "../../helpers/tablaOpciones";
import { Line } from "react-chartjs-2";
import { fetchGETPOSTPUTDELETEJSON } from "../../helpers/fetch";

const MHistorialPrecios = ({ precios, setPrecios, id }) => {
  const [historial, setHistorial] = useState({});
  const [info, setInfo] = useState({});
  const [labels, setLabels] = useState({});
  const [data1, setData1] = useState({});
  const [arr, setarr] = useState({});
  const closeModal = () => {
    setPrecios(false);
  };

  const getHistorial = () => {
    const data = {
      fecha_inicio: info.fecha_inicio,
      fecha_fin: info.fecha_fin,
      compania: id,
    };

    fetchGETPOSTPUTDELETEJSON("compania/precio/grafica-lineal", data, "POST")
      .then((res) => res.json())
      .then((res) => setHistorial(res));
  };

  const getLabels = () => {
    const colors = [
      "rgba(255, 99, 132,)",
      "rgba(255, 159, 64)",
      "rgba(255, 205, 86)",
      "rgba(75, 192, 192)",
      "rgba(54, 162, 235)",
    ];

    const dataSet =
      historial &&
      historial.data &&
      historial.data.map((item, i) => ({
        label: item.label,
        data: item.data,
        borderColor: colors[i],
        backgroundColor: colors[i],
      }));

    setarr(dataSet);
  };
  console.log(historial);

  useEffect(() => {
    getLabels();
  }, [historial]);

  const data = {
    labels: historial.labels,
    datasets: arr,
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      isOpen={precios}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal mhistorial_empresa"
      closeTimeoutMS={200}
      preventScroll={true}
      overlayClassName="modal-fondo"
      ariaHideApp={false}
    >
      <h3 className="title__modal">Historial de precios</h3>
      <div class="tab-content" id="myTabContent">
        <div
          className="historial_container"
          // style={{
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "center",
          // }}
        >
          <div
            class="fecha input-group mb-3"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label>Fecha inicio:</label>
            <input
              type="date"
              name="fecha_inicio"
              class="form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleChange}
            />
          </div>
          <div
            class="input-group mb-3"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label>Fecha fin:</label>

            <input
              type="date"
              name="fecha_fin"
              class="fecha form-control"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="button"
              class="botones btn btn-primary"
              onClick={() => getHistorial()}
            >
              Mostrar historial
            </button>
          </div>
        </div>

        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <Line className=" mt-5" data={data} />
        </div>
      </div>
    </Modal>
  );
};

export default MHistorialPrecios;
