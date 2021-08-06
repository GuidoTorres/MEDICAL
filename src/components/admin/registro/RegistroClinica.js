import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

import { paginacionOpciones } from "../../../helpers/tablaOpciones";
import { fetchGETPOSTPUTDELETE } from "../../../helpers/fetch";

import MRegistroClinica from "./MRegistroClinica";
import Mlocazion from "./Mlocazion";

const RegistroClinica = () => {
  const [busqueda, setBusqueda] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editar, setEditar] = useState(false);
  const [dataSelected, setDataSelected] = useState();
  // const [getRegistro, setGetRegistro] = useState();
  const [listRegistro, setListRegistro] = useState([]);
  const [metGetClinic, setMetGetClinic] = useState([]);
  const [modalLocalizacion, setModalLocalizacion] = useState(false);
  const [clinicasFiltradas, setClinicasFiltradas] = useState({});
  const getClinica = () => {
    fetchGETPOSTPUTDELETE("clinics")
      .then((data) => data.json())
      .then((datos) => {
        setMetGetClinic(datos.data);
      });
  };

  // Funcion para filtra la clinica roma de la tabla
  // const filtrarMedical = () => {
  //   const clinics = metGetClinic.filter((item) => item.id !== 1);
  //   console.log(clinics);
  //   setClinicasFiltradas(clinics);
  // };

  useEffect(() => {
    getClinica();
    // filtrarMedical();
  }, []);

  console.log(metGetClinic);

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
      name: "Razón social",
      selector: (row) =>
        row.corporation && row.corporation.business_name
          ? row.corporation.business_name
          : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "RUC",
      selector: (row) =>
        row.corporation && row.corporation.ruc ? row.corporation.ruc : "",
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
    {
      name: "Actividad",
      selector: (row) =>
        row.clinic_type_id === 1 ? "Toman muestra" : "Procesan muestra ",
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
      name: "Administrar lugares",
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleLocalizacion(e)}
          className="table__tablebutton"
        >
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
      const search =
        // metGetClinic.length !==undefined &&

        metGetClinic.filter((data) => {
          return (
            (data.corporation
              ? data.corporation.ruc
                ? data.corporation.ruc.toString().includes(busqueda)
                : ""
              : "") ||
            (data.corporation
              ? data.corporation.business_name
                ? data.corporation.business_name
                    .toString()
                    .toLowerCase()
                    .includes(busqueda.toLowerCase())
                : ""
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
                    .includes(busqueda)
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
  }, [busqueda, metGetClinic]);

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
  const handleLocalizacion = () => {
    setModalLocalizacion(true);
  };
  const handleEliminar = (e) => {
    Swal.fire({
      title: "¿Desea eliminar?",
      text: `${e.corporation.business_name}`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetchGETPOSTPUTDELETE(`clinics/delete/${e.id}`).then((result) => {
          if (result.status === 200) {
            Swal.fire(
              "Eliminado!",
              "Se ha eliminado correctamente.",
              "success"
            ).then((resp) => {
              if (resp.isConfirmed) {
                getClinica();
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
  return (
    <div className="container">
      <div className="row">
        <h3 className="titulo">Registro de clínicas</h3>
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
                Agregar clínica{" "}
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
            noDataComponent={<i className="fas fa-inbox table__icono"></i>}
          />
        </div>
      </div>
      {openModal && (
        <MRegistroClinica
          openModal={openModal}
          setOpenModal={setOpenModal}
          getClinica={getClinica}
          dataSelected={dataSelected}
          setDataSelected={setDataSelected}
          editar={editar}
          setEditar={setEditar}
        />
      )}
      {modalLocalizacion && (
        <Mlocazion
          modalLocalizacion={modalLocalizacion}
          setModalLocalizacion={setModalLocalizacion}
        />
      )}
    </div>
  );
};

export default RegistroClinica;
