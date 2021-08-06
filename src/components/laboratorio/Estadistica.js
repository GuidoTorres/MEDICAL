import React, { useEffect, useState } from "react";
import {
  fetchGETPOSTPUTDELETEJSON,
  fetchGETPOSTPUTDELETE,
} from "../../helpers/fetch";
import GraficoBarra from "./GraficoBarra";

const Estadistica = () => {
  const [estadistica, setEstadistica] = useState({});
  const [fechas, setFecha] = useState({});
  const [categoria, setCategoria] = useState({});
  const [servicios, setServicios] = useState({});
  const [tipoPrueba, setTipoPrueba] = useState({
    servicios: [],
  });
  const [checks, setChecks] = useState({
    check1: 0,
    check2: 0,
  });

  console.log(fechas);
  console.log(tipoPrueba.servicios);

  const traerHistorial = () => {
    const data = {
      servicios: tipoPrueba.servicios,
      fecha_inicio: fechas.fecha_inicio,
      fecha_fin: fechas.fecha_fin,
    };

    fetchGETPOSTPUTDELETEJSON(
      "resultados/mi-clinica/estadisticas-servicios",
      data,
      "POST"
    )
      .then((res) => res.json())
      .then((res) => setEstadistica(res));
  };

  const getServicios = () => {
    fetchGETPOSTPUTDELETE("services")
      .then((data) => data.json())
      .then((datos) => setServicios(datos.data));
  };
  const handleChange = (e) => {
    setFecha({
      ...fechas,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getServicios();
  }, []);
  useEffect(() => {
    if (checks.check1 === 1) {
      document.getElementById("categoria").disabled = false;
    } else {
      document.getElementById("categoria").disabled = true;
    }

    if (checks.check2 === 1) {
      document.getElementById("subcategoria").disabled = false;
    } else {
      document.getElementById("subcategoria").disabled = true;
    }
  }, [checks]);

  console.log(tipoPrueba.servicios);

  return (
    <div className="container mb-3">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 ">
          <div className="barra">
            <p className="">Seleccionar pruebas</p>
            <div className="laboratorio__estadistica">
              <div>
                <div className="">
                  <div className="">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      onChange={(e) =>
                        setChecks({
                          ...checks,
                          check1: e.target.checked ? 1 : 0,
                        })
                      }
                    />
                    <label>Categoría</label>
                  </div>
                  <div className="adminusuario__date">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="categoria"
                      disabled
                      onChange={(e) => setCategoria({ data: e.target.value })}
                    >
                      <option>Seleccionar</option>
                      <option value="Covid 19">Covid 19</option>
                    </select>
                  </div>
                </div>
                <textarea
                  disabled
                  placeholder={categoria ? categoria.data : ""}
                ></textarea>
              </div>
              <div className="">
                <div>
                  <div className="">
                    <input
                      type="checkbox"
                      id="select1"
                      className="form-check-input"
                      onChange={(e) =>
                        setChecks({
                          ...checks,
                          check2: e.target.checked ? 1 : 0,
                        })
                      }
                    />
                    <label>Sub categoría</label>
                  </div>
                  <div className="adminusuario__date">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="subcategoria"
                      name="data"
                      onChange={(e) =>
                        setTipoPrueba({
                          servicios: [
                            ...tipoPrueba.servicios,
                            Number(e.target.value),
                          ],
                        })
                      }
                    >
                      <option value="">Seleccione</option>
                      {servicios &&
                        servicios[0] &&
                        servicios[0].services &&
                        servicios[0].services.map((data, i) => (
                          <option key={i} data={data.name} value={data.id}>
                            {data.abbreviation}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <textarea
                  disabled
                  placeholder={tipoPrueba ? tipoPrueba.servicios : ""}
                ></textarea>
              </div>
            </div>
          </div>
          <div className=" barra">
            <p className="">Seleccionar intervalo de tiempo</p>
            <div className="laboratorio__estadistica-intervalo mt-3">
              <div className="tiempo">
                {/* <div> */}
                <div>
                  <label>Inicio: </label>
                  <input
                    type="date"
                    name="fecha_inicio"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Fin: </label>
                  <input type="date" name="fecha_fin" onChange={handleChange} />
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-6 ">
          <div className=" barra mb-3">
            <div className="">
              <GraficoBarra estadistica={estadistica} tipoPrueba={tipoPrueba} />
            </div>
            <div className="list-botones">
              <button className="mt-5 botones" onClick={() => traerHistorial()}>
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadistica;
