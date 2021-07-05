import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";

import Swal from "sweetalert2";

// import { registro } from '../../../data/ACRegistro';
import { paginacionOpciones } from "../../../helpers/tablaOpciones";
import { fetchGETPOSTPUTDELETE } from "../../../helpers/fetch";

import MRegistroClinica from "./MRegistroClinica";
// import { fetchGET } from '../../../helpers/fetch';

const RegistroClinica = () => {
  // console.log(events);
  const [busqueda, setBusqueda] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editar, setEditar] = useState(false);
  const [dataSelected, setDataSelected] = useState();
  const [metGetClinic, setMetGetClinic] = useState([]);
  // const [getRegistro, setGetRegistro] = useState();
  const [listRegistro, setListRegistro] = useState([]);

  const getClinica = () => {
    fetchGETPOSTPUTDELETE("clinics")
      .then((data) => data.json())
      .then((datos) => {
        setMetGetClinic(datos);
      });
  };

  useEffect(() => {
    getClinica();
  }, []);
  

  const columnas = [
    {
      name: "Item",
      selector: row => row.id ? row.id : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Razón social",
      selector: row => row.business_name ? row.business_name : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "RUC",
      selector: row => row.ruc ? row.ruc : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Responsable",
      selector: row => row.responsible && row.responsible.name ? row.responsible.name : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Telefono",
      selector: row => row.responsible && row.responsible.phone ? row.responsible.phone : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Correo",
      selector: row => row.responsible && row.responsible.email ? row.responsible.email : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Actividad",
      selector: row => row.clinic_type === 1 ? "Toma muestra" : "Toma y procesa",
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
      const search = metGetClinic.filter((data) => {
        return (
          data.ruc.toString().includes(busqueda) ||
          data.business_name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.responsible.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.responsible.phone.toString().includes(busqueda) ||
          data.responsible.email
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda)
          //   ||
          // data.actividad
          //   .normalize('NFD')
          //   .replace(/[\u0300-\u036f]/g, '')
          //   .toLocaleLowerCase()
          //   .includes(busqueda)
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
  const handleEliminar = (e) => {
    Swal.fire({
      title: "¿Desea eliminar?",
      text: `${e.business_name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "Se ha eliminado correctamente.", "success");
        fetchGETPOSTPUTDELETE(`clinics/${e.id}`, {}, "DELETE").then((result) =>
          result.json()
        ).then(data=> {
          if(data === "Has been deleted")
          console.log(data)
          getClinica();
        
        })
      }
    });
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
                Agregar clinica{" "}
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
            fixedHeaderScrollHeight="500px"
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
    </div>
  );
};

export default RegistroClinica;
