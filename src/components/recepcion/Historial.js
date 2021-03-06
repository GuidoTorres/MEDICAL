/* eslint-disable */
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";
import CodigoBarrasHistorial from "./Modales/CodigoBarrasHistorial";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";
import { generarDeclaracionJurada } from "../../helpers/GenerarPdfs/DeclaracionJurada";
import { generarConsentimientoInformado } from "../../helpers/GenerarPdfs/ConsentimientoInformado";
import { generarFichaCovid } from "../../helpers/GenerarPdfs/FichaCovid";

const Historial = () => {
  const [busqueda, setBusqueda] = useState("");
  // const [addRegistro, setAddRegistro] = useState(false);
  const [codigoHistorial, setCodigoHistorial] = useState(false);
  const [attention, setAttention] = useState([]);
  const [dataBarCode, setDataBarCode] = useState({});
  const [listRegistro, setListRegistro] = useState([]);

  const getAttention = () => {
    fetchGETPOSTPUTDELETE("attention_history")
      // fetchGETPOSTPUTDELETE('attention')

      .then((data) => data.json())
      .then((datos) => setAttention(datos.data));
  };

  useEffect(() => {
    getAttention();
  }, []);

  function CodigoBarras(e) {
    setCodigoHistorial(true);
    setDataBarCode(e);
  }

  // const handleAddRegistro = () => {
  //   setAddRegistro(true);
  // };

  const paginacionOpciones = {
    rowsPerPageText: "Fila por pagina",
    rangerSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

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
      grow: 1,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Nº de documento",
      selector: (row) => (row.DNI ? row.DNI : ""),
      sortable: true,
      grow: 0,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Estado",
      selector: (row) => (row.user_type ? row.user_type : ""),
      sortable: true,
      grow: 0,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Tipo de atención",
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
      name: "Código de barras",
      button: true,
      cell: (e) => (
        <button className="table__tablebutton editar">
          <i class="fas fa-barcode" onClick={() => CodigoBarras(e)}></i>
        </button>
      ),
    },
    {
      name: "Declaración jurada",
      button: true,
      cell: (e) => (
        <button className="table__tablebutton editar">
          <i
            class="far fa-file-pdf"
            onClick={() => {
              e.declaration.answers ? generarDeclaracionJurada(e) : "";
            }}
          ></i>{" "}
        </button>
      ),
    },
    {
      name: "Consentimiento informado",
      button: true,
      cell: (e) => (
        <button className="table__tablebutton editar">
          <i
            class="far fa-file-pdf"
            onClick={() => {
              generarConsentimientoInformado(e);
            }}
          ></i>{" "}
        </button>
      ),
    },
    {
      name: "Ficha COVID19",
      button: true,
      cell: (e) => (
        <button className="table__tablebutton editar">
          <i
            class="far fa-file-pdf"
            onClick={() => {
              generarFichaCovid(e);
            }}
          ></i>{" "}
        </button>
      ),
    },
  ];

  useEffect(() => {
    const filtrarElemento = () => {
      const search =
        attention &&
        attention.filter((data) => {
          return (
            (data.fullName
              ? data.fullName
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              : "") ||
            (data.DNI
              ? data.DNI.toString().includes(busqueda.toLocaleLowerCase())
              : "") ||
            (data.type_user
              ? data.type_user
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              : "") ||
            (data.service_type
              ? data.service_type
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

  const handleOnChange = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };
  return (
    <>
      <div className="container">
        {/* <h3 className="mt-3">Historial</h3> */}
        <div>
          <div>
            <input
              type="text"
              className="inputBuscar"
              placeholder="Buscar"
              name="busqueda"
              value={busqueda}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <label className="mt-2">
          Las reservas de servicios que se realizaron en su local son las
          siguientes:
        </label>
        <ToastContainer />
        <div className="row px-2">
          <div className=" table-responsive">
            <DataTable
              className="dataTable"
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

      <CodigoBarrasHistorial
        codigoHistorial={codigoHistorial}
        setCodigoHistorial={setCodigoHistorial}
        dataBarCode={dataBarCode}
      />
    </>
  );
};

export default Historial;
