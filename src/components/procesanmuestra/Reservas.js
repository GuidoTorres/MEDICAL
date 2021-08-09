import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

import { historial } from "../../data/PHistorial";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";
import { paginacionOpciones } from "../../helpers/tablaOpciones";

const Reservas = () => {
  const [busqueda, setBusqueda] = useState("");
  const [listRegistro, setListRegistro] = useState([]);

  const [getDateAttention, setGetDateAttention] = useState([]);

  //clinic care , attention por ahora
  //patient care para la tencion
  // en historial

  const getAttention = () => {
    fetchGETPOSTPUTDELETE("atenciones/clinica", null, "POST")
      .then((data) => data.json())
      .then((datos) => setGetDateAttention(datos));
  };

  useEffect(() => {
    getAttention();
  }, []);

  const columnas = [
    {
      name: "Item",
      selector: (row, index) => (index += 1),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Tipo de documento",
      selector: (row) => (row.tipo_documento ? row.tipo_documento : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Nº documento",
      selector: (row) => (row.dni ? row.dni : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Nombre",
      selector: (row) => (row.paciente ? row.paciente : ""),
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
  //
  useEffect(() => {
    const filtrarElemento = () => {
      const search = historial.filter((data) => {
        return (
          data.dni.toString().includes(busqueda) ||
          data.nombre
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.apellido
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.tipo
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.solicitud
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda)
        );
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda]);

  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };
  const handleDetalles = (e) => {
    Swal.fire({
      title: "¿Atender paciente?",
      text: `${e.paciente}`,
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
  };
  //
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
            data={getDateAttention}
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
    </div>
  );
};

export default Reservas;
