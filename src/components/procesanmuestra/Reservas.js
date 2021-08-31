/* eslint-disable */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

import { historial } from "../../data/PHistorial";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";
import { paginacionOpciones } from "../../helpers/tablaOpciones";
import MGenerarAtencion from "./Modales/MGenerarAtencion";

const Reservas = () => {
  const [busqueda, setBusqueda] = useState("");
  const [listRegistro, setListRegistro] = useState([]);
  const [getDateAttention, setGetDateAttention] = useState([]);
  const [listServicio, setListServicio] = useState([]);
  const [addRegistro, setAddRegistro] = useState(false);
  const [generarAtencion, setGenerarAtencion] = useState(false);
  const [editar, setEditar] = useState(false);
  const [dataSelected, setDataSelected] = useState({});
  const [formulario, setFormulario] = useState({});
  const [openGenerarAtencion, setOpenGenerarAtencion] = useState(false);

  //clinic care , attention por ahora
  //patient care para la tencion
  // en historial

  const getAttention = () => {
    fetchGETPOSTPUTDELETE("atenciones/clinica", null, "POST")
      .then((data) => data.json())
      .then((datos) => setGetDateAttention(datos));
  };

  const getForms = () => {
    fetchGETPOSTPUTDELETE("forms")
      .then((res) => res.json())
      .then((res) => setFormulario(res.data));
  };

  useEffect(() => {
    getAttention();
    getForms();
  }, []);

  const columnas = [
    {
      name: "Item",
      selector: (row, index) => (index += 1),
      sortable: true,
      grow: 0,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Tipo de documento",
      selector: (row) => (row.tipo_documento ? row.tipo_documento : ""),
      sortable: true,
      grow: 0,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Nº documento",
      selector: (row) => (row.dni ? row.dni : ""),
      sortable: true,
      grow: 0,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Nombre",
      selector: (row) =>
        row.paciente
          ? row.paciente.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },

    {
      name: "Tipo prueba",
      // selector:'tipo',

      selector: (row) => (row.prueba ? row.prueba : ""),

      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Fecha solicitud",
      // selector:'solicitud',

      selector: (row) => (row.fecha_solicitud ? row.fecha_solicitud : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Generar atención",
      button: true,
      cell: (e) => (
        <button onClick={() => openGenerar(e)} className="table__tablebutton">
          <i className="fas fa-stethoscope"></i>
        </button>
      ),
    },
    {
      name: "Atender",
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleDetalles(e)}
          className="table__tablebutton"
        >
          <i className="fas fa-angle-right"></i>
        </button>
      ),
    },
  ];

  const openGenerar = (e) => {
    setOpenGenerarAtencion(true);
    setDataSelected(e);
  };

  // const handleEditar = (e) => {
  //   setAddRegistro(true);
  //   setDataSelected(e);
  //   setEditar(true);
  // };
  //
  useEffect(() => {
    const filtrarElemento = () => {
      const search = getDateAttention.filter((data) => {
        return (
          (data.tipo_documento
            ? data.tipo_documento
                .toString()
                .toLowerCase()
                .includes(busqueda.toLowerCase())
            : "") ||
          (data.dni
            ? data.dni.toString().toLowerCase().includes(busqueda)
            : "") ||
          (data.paciente
            ? data.paciente.toString().toLowerCase().includes(busqueda)
            : "") ||
          (data.prueba
            ? data.prueba
                .toString()
                .toLowerCase()
                .includes(busqueda.toLowerCase())
            : "" || data.fecha_solicitud
            ? fecha_solicitud.toString().toLowerCase().includes(busqueda)
            : "")
        );
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda, getDateAttention]);

  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };
  const handleDetalles = (e) => {
    if (e.servicio_id === 5) {
      if (e.llenado_formulario === 24) {
        Swal.fire({
          title: "¿Atender paciente?",
          text: `${e.paciente ? e.paciente : ""}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Atender",
        }).then((result) => {
          if (result.isConfirmed) {
            fetchGETPOSTPUTDELETE(`attention/attend/${e.atencion_id}`).then(
              (data) => {
                console.log(data);
                if (data.status === 200) {
                  Swal.fire(
                    "Éxito!",
                    "Se generó la atención correctamente.",
                    "success"
                  );
                  getAttention();
                }
              }
            );
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Fichas incompletas",
          text: "Debe llenar todas las fichas para atender al paciente.",
        });
      }
    } else if (
      e.servicio_id === 4 ||
      e.servicio_id === 3 ||
      e.servicio_id === 2 ||
      e.servicio_id === 1
    ) {
      console.log("if servicios diferente a molecular");

      if (e.llenado_formulario === 8) {
        Swal.fire({
          title: "¿Atender paciente?",
          text: `${e.paciente ? e.paciente : ""}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Atender",
        }).then((result) => {
          if (result.isConfirmed) {
            fetchGETPOSTPUTDELETE(`attention/attend/${e.atencion_id}`).then(
              (data) => {
                console.log(data);
                if (data.status === 200) {
                  Swal.fire(
                    "Éxito!",
                    "Se generó la atención correctamente.",
                    "success"
                  );
                  getAttention();
                }
              }
            );
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Fichas incompletas",
          text: "Debe llenar todas las fichas para atender al paciente.",
        });
      }
    }
  };
  return (
    <div className="container">
      <div className="row">
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
          </div>

          <DataTable
            columns={columnas}
            data={listRegistro}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            striped
            highlightOnHover
            fixedHeaderScrollHeight="100%"
            noDataComponent={
              <div className="spinner">
                <i className="fas fa-inbox table__icono"></i>
                <p style={{ color: "grey" }}>No hay datos</p>
              </div>
            }
          />
        </div>
      </div>

      {openGenerarAtencion && (
        <MGenerarAtencion
          openGenerarAtencion={openGenerarAtencion}
          setOpenGenerarAtencion={setOpenGenerarAtencion}
          dataSelected={dataSelected}
          getAttention={getAttention}
          formulario={formulario}
        />
      )}
    </div>
  );
};

export default Reservas;
