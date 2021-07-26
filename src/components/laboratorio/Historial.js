import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { lasubir } from "../../data/LASubir";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";

import { paginacionOpciones } from "../../helpers/tablaOpciones";
import MDescargar from "./Modales/MDescargar";
import MSubirLaboratorio from "./MSubirLaboratorio";

import jsPDF from "jspdf";
import eclia from "../../assets/pdf Imagen/eclia.png";
import antigeno from "../../assets/pdf Imagen/antigeno.png";
import molecular from "../../assets/pdf Imagen/molecular.png";
import rapida from "../../assets/pdf Imagen/rapida.png";

const Historial = () => {
  const [busqueda, setBusqueda] = useState("");
  const [listRegistro, setListRegistro] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDescarga, setOpenDescarga] = useState(false);
  const [results, setResults] = useState({});
  const [tipoPrueba, setTipoPrueba] = useState({});
  const [servicios, setServicios] = useState({});
  const [filterData, setFilterData] = useState({});

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
  }, []);

  console.log(results);
  const columnas = [
    {
      name: "Ítem",
      selector: (row) => (row.nro_atencion ? row.nro_atencion : ""),
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
        <button
          onClick={() => handleDetalles(e)}
          className="table__tablebutton"
        >
          <i class="fas fa-file-pdf"></i>
        </button>
      ),
    },
  ];

  const filtrarTabla = () => {
    const result = Object.values(results).filter(
      (data) => data && data.prueba === tipoPrueba.id
    );

    setFilterData(result);
  };

  useEffect(() => {
    filtrarTabla();
  }, [tipoPrueba]);

  //   useEffect(() => {
  //     const filtrarElemento = () => {
  //       const search =
  //         filterData &&
  //         Object.values(filterData).filter((data) => {
  //           return (
  //             data.tipo_usuario
  //               .normalize("NFD")
  //               .replace(/[\u0300-\u036f]/g, "")
  //               .toLocaleLowerCase()
  //               .includes(busqueda) ||
  //             data.dni.toString().includes(busqueda) ||
  //             data.fecha_atencion
  //               .normalize("NFD")
  //               .replace(/[\u0300-\u036f]/g, "")
  //               .toLocaleLowerCase()
  //               .includes(busqueda) ||
  //             data.paciente
  //               .normalize("NFD")
  //               .replace(/[\u0300-\u036f]/g, "")
  //               .toLocaleLowerCase()
  //               .includes(busqueda)
  //           );
  //         });
  //       setListRegistro(search);
  //     };
  //     filtrarElemento();
  //   }, [busqueda]);

  const handleDetalles = (e) => {
    console.log(e);
    if (e.servicio_id == 5) {
      generarPDF(e, antigeno, "Formato Antígeno");
    } else if (e.servicio_id === 6) {
      generarPDF(e, eclia, "Formato Eclia");
    } else if (e.servicio_id === 7) {
      generarPDF(e, molecular, "Formato Molecular");
    } else if (e.servicio_id === 8) {
      generarPDF(e, rapida, "Formato Rapida");
    }
  };

  const generarPDF = (e, imagen, formato) => {
    console.log(e);
    const doc = new jsPDF("p", "pt");
    doc.setProperties({
      title: formato,
    });
    doc.setFontSize(10);

    doc.addImage(imagen, "PNG", 5, 20, 580, 800, "", "FAST");

    if (e.servicio_id === 5) {
      doc.text(
        328,
        135,
        `${
          e && e.genero  ? e.genero : ""
        }`
      );
      doc.text(90, 136, `${e.nro_atencion ? e.nro_atencion : ""}`);
      doc.text(60, 158, `${e.dni ? e.dni : ""}`);
      doc.text(428, 157, `${e.fecha_atencion ? e.fecha_atencion : ""}`);

      doc.text(90, 180, `${e.paciente ? e.paciente : ""}`);

      doc.text(
        280,
        268,
        `${
          e.resultado && e.resultado.result === 0 ? "No detectado" : "Detectado"
        }`
      );
    } else if (e.servicio_id == 6) {
      doc.text(
        328,
        120,
        `${
          e && e.person && e.person.gender_id === 1 ? "Masculino" : "Femenino"
        }`
      );
      doc.text(85, 119, `${e.nro_atencion ? e.nro_atencion : ""}`);
      doc.text(55, 141, `${e.dni ? e.dni : ""}`);
      doc.text(428, 141, `${e.fecha_atencion ? e.fecha_atencion : ""}`);

      doc.text(85, 163, `${e.paciente ? e.paciente : ""}`);
      doc.text(
        195,
        268,
        `${e.resultado && e.resultado.result_igm ? e.resultado.result_igm : ""}`
      );
      doc.text(
        285,
        268,
        `${e.resultado && e.resultado.result_igg ? e.resultado.result_igg : ""}`
      );
    } else if (e.servicio_id == 7) {
      doc.text(
        328,
        141,
        `${
          e && e.genero  ? e.genero : ""
        }`
      );

      doc.text(85, 140, `${e.nro_atencion ? e.nro_atencion : ""}`);
      doc.text(55, 163, `${e.dni ? e.dni : ""}`);
      doc.text(428, 163, `${e.fecha_atencion ? e.fecha_atencion : ""}`);

      doc.text(85, 185, `${e.paciente ? e.paciente : ""}`);
    } else if (e.servicio_id == 8) {
      doc.text(
        328,
        141,
        `${
          e && e.genero  ? e.genero : ""
        }`
      );
      doc.text(55, 163, `${e && e.person && e.person.dni ? e.person.dni : ""}`);
      doc.text(
        428,
        163,
        `${e && e.result && e.result.date ? e.result.date : ""}`
      );

      doc.text(
        85,
        185,
        `${
          e && e.person && e.person.name && e.person.pat_lastname
            ? e.person.name + " " + e.person.pat_lastname
            : ""
        }`
      );
    }

    window.open(doc.output("bloburl"), "_blank");
    var blob = doc.output("blob");
  };

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
                  class="form-select"
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
                    servicios[0].services.map((data, i) => (
                      <option key={i} value={data.name}>
                        {data.name}
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
