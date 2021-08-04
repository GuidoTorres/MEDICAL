import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import eclia from "../../assets/pdf Imagen/eclia.png";
import antigenosi from "../../assets/pdf Imagen/antigenoSi.png";
import antigenono from "../../assets/pdf Imagen/antigenoNo.png";
import molecular from "../../assets/pdf Imagen/molecular.png";
import rapida from "../../assets/pdf Imagen/rapida.png";
import anticuerpos from "../../assets/pdf Imagen/anticuerpos.png";

import Swal from "sweetalert2";

// import { historial } from '../../data/PHistorial';
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";
import { paginacionOpciones } from "../../helpers/tablaOpciones";

const CargarResultado = () => {
  const [busqueda, setBusqueda] = useState("");
  // const [listResult, setListResult] = useState([]);
  const [result, setResult] = useState({});
  const [resultado, setResultado] = useState({});
  const [getDateAttention, setGetDateAttention] = useState([]);

  const getResult = () => {
    //cargar un pdf con los resultados
    fetchGETPOSTPUTDELETE("result_historial")
      .then((info) => info.json())
      .then((datos) => setResult(datos.data));
  };

  console.log(result);

  useEffect(() => {
    getResult();
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
    // {
    //   name: "Tipo de documento",
    //   selector: (row) =>
    //     row.person && row.person.document_type_id === 3
    //       ? "Carné de extranjería"
    //       : row.person && row.person.document_type_id === 2
    //       ? "Pasaporte"
    //       : row.person && row.person.document_type_id === 1
    //       ? "DNI"
    //       : "",
    //   sortable: true,
    //   style: {
    //     borderBotton: "none",
    //     color: "#555555",
    //   },
    // },
    {
      name: "Nº documento",
      selector: (row) => (row.person && row.person.dni ? row.person.dni : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Nombre",
      selector: (row) =>
        row.person && row.person.name && row.person.pat_lastname
          ? row.person.name + " " + row.person.pat_lastname
          : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },

    {
      name: "Tipo prueba",
      selector: (row) =>
        row.service && row.service.name ? row.service.name : "",

      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Fecha solicitud",
      selector: (row) => (row.date_creation ? row.date_creation : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Cargar Resultados",
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleDetalles(e)}
          className="table__tablebutton"
        >
          <i className="far fa-file-pdf" style={{ color: "grey" }}></i>
        </button>
      ),
    },
  ];

  //
  // useEffect(() => {
  //   const filtrarElemento = () => {
  //     const search = historial.filter((data) => {
  //       return (
  //         data.dni.toString().includes(busqueda) ||
  //         data.nombre
  //           .normalize('NFD')
  //           .replace(/[\u0300-\u036f]/g, '')
  //           .toLocaleLowerCase()
  //           .includes(busqueda) ||
  //         data.apellido
  //           .normalize('NFD')
  //           .replace(/[\u0300-\u036f]/g, '')
  //           .toLocaleLowerCase()
  //           .includes(busqueda) ||
  //         data.tipo
  //           .normalize('NFD')
  //           .replace(/[\u0300-\u036f]/g, '')
  //           .toLocaleLowerCase()
  //           .includes(busqueda) ||
  //         data.solicitud
  //           .normalize('NFD')
  //           .replace(/[\u0300-\u036f]/g, '')
  //           .toLocaleLowerCase()
  //           .includes(busqueda)
  //       );
  //     });
  //     setListRegistro(search);
  //   };
  //   filtrarElemento();
  // }, [busqueda]);

  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };

  const handleDetalles = (e) => {
    const input = document.getElementById("file-input");

    if (input) {
      input.click();
    }
    const formData = new FormData()
    formData.set("id", e.id)
    formData.set("pdf", input.files[0])

    fetchGETPOSTPUTDELETE("result", formData, "POST").then((info) => {
      console.log(info);
      if (info.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Se guardo el pdf correctamente.",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
        }).then((resp) => {
          if (resp.isConfirmed) {
            getResult();
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

            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
              onChangeCapture={(e) => handleDetalles(e)}
            />
          </div>

          <DataTable
            columns={columnas}
            data={result}
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

export default CargarResultado;
