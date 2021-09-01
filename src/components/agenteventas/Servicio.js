/* eslint-disable */
import React, { useEffect, useState } from "react";
import Persona from "./Persona";
import Empresa from "./Empresa";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";

const Servicio = () => {
  const [getServicio, setGetServicio] = useState([]);
  const [comDiscount, setComDiscount] = useState({});

  //modal de particular particualar discount create para la tabla igual

  //usuario particular

  const getServices = () => {
    fetchGETPOSTPUTDELETE("services")
      .then((info) => info.json())
      // .then((data) => console.log(data.data));
      .then((datos) => setGetServicio(datos.data));
  };

  console.log(getServicio);

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="table-responsive barra">
            <h6>Precio para el público en general</h6>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Tipo de prueba</th>
                  <th scope="col">Precio de vitrina</th>
                  <th scope="col">Costo Limite superior</th>
                  <th scope="col">Costo Limite inferior</th>
                </tr>
              </thead>
              <tbody>
                {getServicio.length > 0 &&
                  getServicio[0].services.map((servicio, i) => (
                    <tr key={i}>
                      <td>{servicio.name ? servicio.name : ""}</td>
                      <td>
                        {servicio.last_price && servicio.last_price.amount
                          ? servicio.last_price.amount
                          : ""}
                      </td>
                      <td>
                        {servicio.limite_superior
                          ? servicio.limite_superior
                          : ""}
                      </td>

                      <td>
                        {servicio.limite_inferior
                          ? servicio.limite_inferior
                          : ""}
                      </td>
                    </tr>
                  ))}
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
                  <Persona getServicio={getServicio} />
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
                  <Empresa getServicio={getServicio} />
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
