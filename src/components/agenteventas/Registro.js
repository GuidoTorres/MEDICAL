/* eslint-disable */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

import { registro } from "../../data/ACRegistro";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";
import { paginacionOpciones } from "../../helpers/tablaOpciones";
import MRegistrarEmpresa from "./MRegistrarEmpresa";

const Registro = () => {
  const [busqueda, setBusqueda] = useState("");
  const [listRegistro, setListRegistro] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [corporations, setCorporations] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [editar, setEditar] = useState(false);
  const [servicios, setServicios] = useState({});

  const getCorporations = () => {
    fetchGETPOSTPUTDELETE("company")
      .then((info) => info.json())
      .then((datos) => setCorporations(datos.data));
  };

  const getServices = () => {
    fetchGETPOSTPUTDELETE("services")
      .then((info) => info.json())
      .then((datos) => setServicios(datos.data));
  };

  useEffect(() => {
    getCorporations();
    getServices();
  }, []);

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
      name: "Razón social",
      selector: (row) =>
        row.corporation.business_name ? row.corporation.business_name : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "RUC",
      selector: (row) => (row.corporation.ruc ? row.corporation.ruc : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Responsable",
      selector: (row) =>
        row.corporation && row.corporation.contacts[0]
          ? row.corporation.contacts[0].name
          : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Teléfono",
      selector: (row) =>
        row.corporation && row.corporation.contacts[0]
          ? row.corporation.contacts[0].phone
          : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Correo",
      selector: (row) =>
        row.corporation && row.corporation.contacts[0]
          ? row.corporation.contacts[0].email
          : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    // {
    //   name: 'Actividad',
    //   selector: 'actividad',
    //   sortable: true,
    //   style: {
    //     borderBotton: 'none',
    //     color: '#555555',
    //   },
    // },
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
  //
  useEffect(() => {
    const filtrarElemento = () => {
      const search =
        corporations.length > 0 &&
        corporations.filter((data) => {
          return (
            (data.corporation
              ? data.corporation.business_name
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              : "") ||
            (data.corporation
              ? data.corporation.ruc.toString().includes(busqueda)
              : "") ||
            (data.corporation
              ? data.corporation.contacts
                ? data.corporation.contacts[0].name
                    .toString()
                    .toLowerCase()
                    .includes(busqueda.toLowerCase())
                : ""
              : "") ||
            (data.corporation
              ? data.corporation.contacts
                ? data.corporation.contacts[0].phone
                    .toString()
                    .toLowerCase()
                    .includes(busqueda.toLowerCase())
                : ""
              : "") ||
            (data.corporation
              ? data.corporation.contacts
                ? data.corporation.contacts[0].email
                    .toString()
                    .toLowerCase()
                    .includes(busqueda.toLowerCase())
                : ""
              : "")
          );
        });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda, corporations]);

  const handleEditar = (e) => {
    setOpenModal(true);
    setDataSelected(e);
    setEditar(true);
  };
  const handleEliminar = (e) => {
    Swal.fire({
      title: "¿Desea eliminar?",
      text: `${e.razon}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "Se ha eliminado correctamente.", "success");
      }
    });
  };
  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };
  const handleAddRegistro = () => {
    setOpenModal(true);
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
            <div>
              <label>
                Agregar empresa{" "}
                <i
                  className="fas fa-plus-circle"
                  onClick={handleAddRegistro}
                ></i>{" "}
              </label>
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
        <MRegistrarEmpresa
          openModal={openModal}
          setOpenModal={setOpenModal}
          dataSelected={dataSelected}
          setDataSelected={setDataSelected}
          editar={editar}
          setEditar={setEditar}
          getCorporations={getCorporations}
          servicios={servicios}
        />
      )}
    </div>
  );
};

export default Registro;
