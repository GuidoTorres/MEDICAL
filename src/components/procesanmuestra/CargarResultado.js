/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";

import Swal from "sweetalert2";

// import { historial } from '../../data/PHistorial';
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";
import { paginacionOpciones } from "../../helpers/tablaOpciones";

const CargarResultado = () => {
  const inputRef = useRef(null);
  const [busqueda, setBusqueda] = useState("");
  const [listResult, setListResult] = useState([]);
  const [result, setResult] = useState({});
  const [id, setId] = useState();
  const [resultado, setResultado] = useState({});

  const getResult = () => {
    //cargar un pdf con los resultados
    fetchGETPOSTPUTDELETE("atenciones/resultado-pendiente", null, "POST")
      .then((info) => info.json())
      .then((datos) => setResult(datos));
  };

  useEffect(() => {
    getResult();
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
      selector: (row) => (row.prueba ? row.prueba : ""),

      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Fecha solicitud",
      selector: (row) => (row.fecha_solicitud ? row.fecha_solicitud : ""),
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
        <button onClick={() => onChangeFile(e)} className="table__tablebutton">
          <i className="far fa-file-pdf" style={{ color: "grey" }}></i>
        </button>
      ),
    },
  ];
  console.log(result);

  //
  useEffect(() => {
    const filtrarElemento = () => {
      const search =
        result.length > 0 &&
        result.filter((data) => {
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
      setListResult(search);
    };
    filtrarElemento();
  }, [busqueda, result]);

  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };

  const onChangeFile = (e) => {
    setResultado({ ...resultado, id: e.atencion_id });
    inputRef.current.click();
    console.log("onchangefile");
  };

  const upload = (e) => {
    setResultado({ ...resultado, pdf: e.target.files[0] });
    console.log("upload");

    const formData = new FormData();
    formData.set("id", resultado.id);
    formData.set("pdf", e.target.files[0]);

    if (e.target.files[0] !== undefined) {
      CargarPdf(formData);
    }
  };

  const CargarPdf = (pdf) => {
    console.log("entro al if ");
    fetchGETPOSTPUTDELETE("result", pdf, "POST").then((info) => {
      inputRef.current.value = "";
      setResultado({});
      if (info.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Se guardó el pdf correctamente.",
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
        inputRef.current.value = "";
      }
    });
  };
  console.log(busqueda);

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
                ref={inputRef}
                value={busqueda}
                onChange={(e) => handleSearch(e)}
              />
            </div>

            <input
              type="file"
              id="file-input"
              ref={inputRef}
              onChange={upload}
              style={{ display: "none" }}
            />
          </div>

          <DataTable
            columns={columnas}
            data={listResult}
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
