/* eslint-disable */
import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { fetchGETPOSTPUTDELETE } from "../../../helpers/fetch";
import { paginacionOpciones } from "../../../helpers/tablaOpciones";
import MUsuario from "./MUsuario";

const Usuario = () => {
  const [busqueda, setBusqueda] = useState("");
  const [listRegistro, setListRegistro] = useState([]);
  const [getUsuario, setGetUsuario] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [generarAtencion, setGenerarAtencion] = useState(false);
  const [dataSelected, setDataSelected] = useState({});

  // //TODO LISTAR
  const resp = () => {
    fetchGETPOSTPUTDELETE("users")
      .then((data) => data.json())
      .then((datos) => setGetUsuario(datos));
  };

  useEffect(() => {
    resp();
  }, []);

  console.log(dataSelected);

  const columnas = [
    {
      name: "Ítem",
      selector: (row, index) => (index += 1),
      sortable: true,
      grow: 0,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Tipo documento",
      selector: (row) =>
        row.document_type === 3
          ? "Carné de extranjería"
          : row.document_type === 2
          ? "Pasaporte"
          : row.document_type === 1
          ? "DNI"
          : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Nº Documento",
      selector: (row) => row.dni || "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Tipo usuario",
      selector: (row) => row.user_type || "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Empresa",
      selector: (row) => (row.company ? row.company : "-----"),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Teléfono",
      selector: (row) => row.phone || "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Correo",
      selector: (row) => row.email || "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },

    {
      name: "Editar",
      button: true,
      cell: (e) => (
        <button onClick={() => handleEditar(e)} className="table__tablebutton">
          <i className="fas fa-pencil-alt"></i>
        </button>
      ),
    },
    {
      name: "Eliminar",
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleEliminar(e)}
          className="table__tablebutton"
        >
          <i className="far fa-trash-alt"></i>
        </button>
      ),
    },
  ];

  useEffect(() => {
    const filtrarElemento = () => {
      console.log(getUsuario);
      const search = getUsuario.filter((data) => {
        return (
          (data.dni ? data.dni.toString().includes(busqueda) : "") ||
          (data.user_type
            ? data.user_type
                .toString()
                .toLowerCase()
                .includes(busqueda.toLowerCase())
            : "") ||
          (data.company
            ? data.company
                .toString()
                .toLowerCase()
                .includes(busqueda.toLowerCase())
            : "") ||
          (data.phone
            ? data.phone
                .toString()
                .toLowerCase()
                .includes(busqueda.toLowerCase())
            : "") ||
          (data.email
            ? data.email
                .toString()
                .toLowerCase()
                .includes(busqueda.toLowerCase())
            : "")
        );
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda, getUsuario]);

  const handleEditar = (e) => {
    setOpenModal(true);
    setDataSelected(e);
  };

  const handleEliminar = (e) => {
    console.log(e);
    Swal.fire({
      title: "¿Desea eliminar?",
      text: `${e.dni}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchGETPOSTPUTDELETE(`users/${e.id}`, {}, "DELETE").then((result) => {
          if (result.status === 204) {
            Swal.fire(
              "Eliminado!",
              "Se ha eliminado correctamente.",
              "success"
            ).then((response) => {
              if (response.isConfirmed) {
                resp();
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "!Ups¡",
              text: "Algo salió mal.",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Cerrar",
            });
          }
        });
      }
    });
  };
  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };
  return (
    <div className="container">
      <div className="row">
        <h3 className="titulo">Usuarios</h3>
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
                <p style={{ color: "lightgrey" }}>No hay datos</p>
              </div>
            }
          />
        </div>
      </div>
      {openModal && (
        <MUsuario
          openModal={openModal}
          setOpenModal={setOpenModal}
          dataSelected={dataSelected}
          resp={resp}
        />
      )}
    </div>
  );
};

export default Usuario;
