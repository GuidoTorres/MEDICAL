/* eslint-disable */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import CodigoBarras from "./Modales/CodigoBarras";
import { paginacionOpciones } from "../../helpers/tablaOpciones";
import Swal from "sweetalert2";
import {
  fetchGETPOSTPUTDELETE,
  fetchGETPOSTPUTDELETEJSON,
} from "../../helpers/fetch";

const Atencion = () => {
  const [busqueda, setBusqueda] = useState("");
  const [listRegistro, setListRegistro] = useState([]);
  const [attention, setAttention] = useState([]);

  const getAttention = () => {
    fetchGETPOSTPUTDELETE("attention_clinic")
      .then((data) => data.json())
      .then((datos) => setAttention(datos.data));
  };

  useEffect(() => {
    getAttention();
  }, []);

  const columnas = [
    {
      name: "Ítem",
      selector: (row, index) => (index += 1),
      sortable: true,
      grow: 0,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Nombres y apellidos",
      selector: (row) =>
        row.fullName
          ? row.fullName.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : "",
      sortable: true,
      grow: 2,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Nº de documento",
      selector: (row) => (row.DNI ? row.DNI : ""),
      sortable: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Estado",
      selector: (row) => (row.type_user ? row.type_user : ""),
      sortable: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Tipo de prueba",
      selector: (row) =>
        row.service_details.abbreviation
          ? row.service_details.abbreviation
          : "",
      sortable: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Atención",
      button: true,
      cell: (e) => (
        <button
          className="table__tablebutton editar"
          onClick={() => generarAtencion(e)}
        >
          <i className="fas fa-angle-right"></i>
        </button>
      ),
    },
  ];

  useEffect(() => {
    const filtrarElemento = () => {
      const search = attention.filter((data) => {
        return (
          (data.fullName
            ? data.fullName
                .toString()
                .toLowerCase()
                .includes(busqueda.toLowerCase())
            : "") ||
          (data.dni ? data.dni.toString().includes(busqueda) : "") ||
          (data.type_user
            ? data.type_user
                .toString()
                .toLowerCase()
                .includes(busqueda.toLowerCase())
            : "") ||
          (data.service_details
            ? data.service_details.abbreviation
                .toString()
                .toLowerCase()
                .includes(busqueda.toLowerCase())
            : "")
        );
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda, attention]);

  const generarAtencion = (e) => {
    if (e.service_details.id === 5) {
      if (e.llenado_formulario === 24) {
        Swal.fire({
          title: "¿Desea Atender al paciente?",
          text: `${e.fullName ? e.fullName : "No hay datos"}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Atender",
        }).then((result) => {
          console.log(result);
          if (result.isConfirmed) {
            fetchGETPOSTPUTDELETEJSON(`attention/attend/${e.id}`).then(
              (data) => {
                if (data.status === 200) {
                  Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Se generó la atención correctamente.",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Aceptar",
                  }).then((resp) => {
                    if (resp.isConfirmed) {
                      getAttention();
                    }
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Ups¡",
                    text: "Algo salió mal.",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Cerrar",
                  });
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
      e.service_details.id === 4 ||
      e.service_details.id === 3 ||
      e.service_details.id === 2 ||
      e.service_details.id === 1
    ) {
      if (e.llenado_formulario === 8) {
        Swal.fire({
          title: "¿Desea Atender al paciente?",
          text: `${e.fullName ? e.fullName : "No hay datos"}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Atender",
        }).then((result) => {
          if (result.isConfirmed) {
            fetchGETPOSTPUTDELETEJSON(`attention/attend/${e.id}`).then(
              (data) => {
                if (data.status === 200) {
                  Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Se generó la atención correctamente.",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Aceptar",
                  }).then((resp) => {
                    if (resp.isConfirmed) {
                      getAttention();
                    }
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Ups¡",
                    text: "Algo salió mal.",
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Cerrar",
                  });
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

  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
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
    </div>
  );
};

export default Atencion;
