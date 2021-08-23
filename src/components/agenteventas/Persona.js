/* eslint-disable */
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

import { servicio } from "../../data/AVServicio";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";
import { paginacionOpciones } from "../../helpers/tablaOpciones";
import MPersona from "./MPersona";

const Persona = () => {
  const [busqueda, setBusqueda] = useState("");
  const [listRegistro, setListRegistro] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataSelected, setDataSelected] = useState({});
  const [editar, setEditar] = useState(false);

  const [particular, setParticular] = useState([]);

  const getParticularDiscount = () => {
    fetchGETPOSTPUTDELETE("particular_discount")
      .then((data) => data.json())
      .then((datos) => {
        setParticular(datos.data);
      });
  };

  useEffect(() => {
    getParticularDiscount();
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
        // maxWidth: "40px",
      },
    },
    {
      name: "DNI",
      selector: (row) =>
        row.user && row.user.person && row.user.person.dni
          ? row.user.person.dni
          : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
        // maxWidth: "80px",
      },
    },
    {
      name: "Nombres y apellidos",
      selector: (row) =>
        row.user &&
        row.user.person &&
        row.user.person.name &&
        row.user.person.pat_lastname
          ? row.user.person.name + " " + row.user.person.pat_lastname
          : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },

    {
      name: "Tipo de prueba",
      selector: (row) =>
        row.service && row.service.name ? row.service.name : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Descuento para usuario (%)",
      selector: (row) => (row.percent ? row.percent + "%" : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
        display: "flex",
        marginLeft: "20px",
      },
    },
    {
      name: "Total",
      selector: (row) => (row.amount ? row.amount : ""),
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
  //
  useEffect(() => {
    const filtrarElemento = () => {
      const search = particular.filter((data) => {
        return (
          (data.user
            ? data.user.person
              ? data.user.person.dni
                ? data.user.person.dni.toString().includes(busqueda)
                : ""
              : ""
            : "") ||
          (data.user
            ? data.user.person
              ? data.user.person.name
                ? data.user.person.name
                    .toString()
                    .toLowerCase()
                    .includes(busqueda.toLowerCase())
                : ""
              : ""
            : "") ||
          (data.service
            ? data.service.name
              ? data.service.name
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              : ""
            : "") ||
          (data.percent ? data.percent.toString().includes(busqueda) : "") ||
          (data.amount ? data.amount.toString().includes(busqueda) : "")
        );
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda, particular]);

  const handleEliminar = (e) => {
    console.log(e);
    Swal.fire({
      title: "¿Desea eliminar?",
      text: `${e.nombre}`,
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

  const handleEditar = (e) => {
    setOpenModal(true);
    setDataSelected(e);
    setEditar(true);
  };

  return (
    <div className="container mt-4">
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
                Agregar{" "}
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
        <MPersona
          setOpenModal={setOpenModal}
          openModal={openModal}
          dataSelected={dataSelected}
          setDataSelected={setDataSelected}
          editar={editar}
          setEditar={setEditar}
          getParticularDiscount={getParticularDiscount}
        />
      )}
    </div>
  );
};

export default Persona;
