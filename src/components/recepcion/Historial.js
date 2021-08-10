import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";
import CodigoBarrasHistorial from "./Modales/CodigoBarrasHistorial";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";
import { generarDeclaracionJurada } from "../../helpers/GenerarPdfs/DeclaracionJurada";
import { generarConsentimientoInformado } from "../../helpers/GenerarPdfs/ConsentimientoInformado";
import { generarFichaCovid } from "../../helpers/GenerarPdfs/FichaCovid";

var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;
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

  const getImagen = () => {
    fetchGETPOSTPUTDELETE(
      "https://uat-getbyte.online/medicalRoma/public/storage/forms/16-16.jpg"
    )
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  useEffect(() => {
    getAttention();
    getImagen();
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
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Nombres y apellidos",
      selector: (row) => (row.fullName ? row.fullName : ""),
      sortable: true,
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
      selector: (row) => (row.user_type ? row.user_type : ""),
      sortable: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Tipo de atención",
      selector: (row) => (row.service_type ? row.service_type : ""),
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
              generarDeclaracionJurada(e);
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
              // convertirImagen(e);
              generarFichaCovid(e);
              // generarFichaCovid();
            }}
          ></i>{" "}
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

      {/* 

      <DeclaracionJurada

        declaracionJurada={declaracionJurada}
        setDeclaracionJurada = {setDeclaracionJurada}
      
      />

      <ConsentimientoInformado
      
        consentimiento={consentimiento}
        setConsentimiento={setConsetimiento}
      />

      <FichaCovid

        fichaCov = {fichaCov}
        setFichaCov ={setFichaCov}
      /> */}
    </>
  );
};

export default Historial;
