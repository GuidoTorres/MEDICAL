/* eslint-disable */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { lasubir } from "../../data/LASubir";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";

import { paginacionOpciones } from "../../helpers/tablaOpciones";
import MDescargar from "./Modales/MDescargar";
import MSubirLaboratorio from "./MSubirLaboratorio";

import jsPDF from "jspdf";
import eclia from "../../assets/pdf Imagen/eclia.png";
import antigenosi from "../../assets/pdf Imagen/antigenoSi.png";
import antigenono from "../../assets/pdf Imagen/antigenoNo.png";
import molecular from "../../assets/pdf Imagen/molecular.png";
import rapida from "../../assets/pdf Imagen/rapida.png";
import anticuerpos from "../../assets/pdf Imagen/anticuerpos.png";
import firma from "../../assets/pdf Imagen/Firma.png";
import isos from "../../assets/pdf Imagen/isos.png";

const Historial = () => {
  const [busqueda, setBusqueda] = useState("");
  const [listRegistro, setListRegistro] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDescarga, setOpenDescarga] = useState(false);
  const [results, setResults] = useState({});
  const [tipoPrueba, setTipoPrueba] = useState({});
  const [servicios, setServicios] = useState({});
  const [filterData, setFilterData] = useState([]);

  const getResults = () => {
    fetchGETPOSTPUTDELETE("resultados/clinica", null, "POST")
      .then((data) => data.json())
      .then((datos) => setResults(datos));
  };

  const getServicios = () => {
    fetchGETPOSTPUTDELETE("services")
      .then((data) => data.json())
      .then((datos) => setServicios(datos.data));
  };

  useEffect(() => {
    getResults();
    getServicios();
  }, [filterData]);


  const columnas = [
    {
      name: "Ítem",
      selector: (row, index) => (index += 1),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Tipo de usuario",
      selector: (row) => (row.tipo_usuario ? row.tipo_usuario : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Nº de documento",
      selector: (row) => (row.dni ? row.dni : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Fecha",
      selector: (row) => (row.fecha_atencion ? row.fecha_atencion : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Nombre y apellido",
      selector: (row) => (row.paciente ? row.paciente : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },

    {
      name: "Visualización",
      button: true,
      cell: (e) => (
        <a href={e.resultado.pdf} target="_blank">
          <button className="table__tablebutton">
            <i className="far fa-file-pdf"></i>
          </button>
        </a>
      ),
    },
  ];

  const filtrarTabla = () => {
    const result =
      results.length > 0 &&
      results.filter(
        (data) => Number(data.servicio_id) === Number(tipoPrueba.id)
      );
    setFilterData(result);
  };

  console.log(filterData);

  useEffect(() => {
    filtrarTabla();
  }, [tipoPrueba]);

  // useEffect(() => {
  //   const filtrarElemento = () => {
  //     const search = filterData.filter((data) => {
  //       return (
  //         (data.dni ? data.dni.toString().includes(busqueda) : "") ||
  //         (data.fecha_atencion
  //           ? data.fecha_atencion.toString().includes(busqueda)
  //           : "") ||
  //         (data.paciente
  //           ? data.paciente
  //               .toString()
  //               .toLowerCase()
  //               .includes(busqueda.toLowerCase())
  //           : "")
  //       );
  //     });
  //     setListRegistro(search);
  //   };
  //   filtrarElemento();
  // }, [busqueda, filterData]);
  // console.log(filterData);

  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="barra">
            <p>Historial</p>
            <div className="laboratorio__resultados">
              <div>
                <label>Categoría</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    setTipoPrueba({ ...tipoPrueba, cat: e.target.value })
                  }
                >
                  <option>Seleccione</option>
                  <option value="1">COVID - 19</option>
                </select>
              </div>
              <div>
                <label>Sub-categoría</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  disabled={tipoPrueba.cat === "1" ? false : true}
                  onChange={(e) =>
                    setTipoPrueba({ ...tipoPrueba, id: e.target.value })
                  }
                >
                  <option>Seleccione</option>

                  {servicios &&
                    servicios[0] &&
                    servicios[0].services &&
                    servicios[0].services.slice(0, 4).map((data, i) => (
                      <option key={i} value={data.id}>
                        {data.abbreviation}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <div className="adminregistro__option">
              <div>
                <input
                  type="text"
                  placeholder="Buscar"
                  name="busqueda"
                  value={busqueda}
                  onChange={handleSearch}
                />
              </div>
              <div>
                <button
                  className="botones"
                  onClick={(e) => setOpenDescarga(true)}
                >
                  Descargar
                </button>
              </div>
            </div>

            <DataTable
              columns={columnas}
              data={filterData}
              pagination
              paginationComponentOptions={paginacionOpciones}
              fixedHeader
              striped
              highlightOnHover
              fixedHeaderScrollHeight="100%"
              noDataComponent={
                <div className="spinner">
                  <i className="fas fa-inbox table__icono"></i>
                  <p style={{ color: "lightgrey" }}>No hay datos</p>
                </div>
              }
            />
          </div>
        </div>
        {openModal && (
          <MSubirLaboratorio
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        )}
        {openDescarga === true ? (
          <MDescargar
            openDescarga={openDescarga}
            setOpenDescarga={setOpenDescarga}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Historial;
