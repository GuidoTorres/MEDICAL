import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { fempresa2 } from "../../data/FEmpresa";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";

import { paginacionOpciones } from "../../helpers/tablaOpciones";
import MEmpresa from "./MEmpresa";
import MLiquidacion from "./MLiquidacion";

const Liquidacion = () => {
  const [busqueda, setBusqueda] = useState(null);
  const [listRegistro, setListRegistro] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [datos, setDatos] = useState({});
  const [liquidacion, setLiquidacion] = useState([]);

  const getLiquidacion = () => {
    // console.log("a");
    fetchGETPOSTPUTDELETE("settlement")
      .then((info) => info.json())
      .then((info) => {
        // console.log(info);
        setLiquidacion(info.data);
        setBusqueda("");
      });
  };

  // console.log(liquidacion);
  useEffect(() => {
    getLiquidacion();
  }, []);

  // console.log(liquidacion);

  const columnas = [
    {
      name: "Ítem",
      selector: "id",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Razón social",

      selector: (row) =>
        row.company ? row.company.corporation.business_name : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "RUC",
      selector: (row) => (row.company ? row.company.corporation.ruc : ""),

      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Fecha",
      selector: "date_issue",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Sub total",
      selector: "subtotal",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Impuesto",
      selector: "igv",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Total",
      selector: "amount",
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
        <button
          onClick={() => handleDetalles(e)}
          className="table__tablebutton"
        >
          <i className="fas fa-pencil-alt"></i>{" "}
        </button>
      ),
    },
    {
      name: "Cargar Información",
      button: true,
      cell: (e) => (
        <button
          // onClick={() => handleDetalles(e)}
          className="table__tablebutton"
        >
          <i className="fas fa-folder-open"></i>
        </button>
      ),
    },
  ];

  useEffect(() => {
    const filtrarElemento = () => {
      if (busqueda !== "" && busqueda !== null) {
        const search = liquidacion.filter((data) => {
          return (
            data.id.toString().includes(busqueda) ||
            (data.company
              ? data.company.corporation.business_name
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              : "") ||
            (data.company
              ? data.company.corporation.ruc.toString().includes(busqueda)
              : "") ||
            (data.date_issue
              ? data.date_issue.toString().includes(busqueda)
              : "") ||
            (data.subtotal
              ? data.subtotal.toString().includes(busqueda)
              : "") ||
            (data.igv ? data.igv.toString().includes(busqueda) : "") ||
            (data.amount ? data.amount.toString().includes(busqueda) : "")
          );
        });
        setListRegistro(search);
      } else {
        setListRegistro(liquidacion);
      }
    };
    filtrarElemento();
    return () => setListRegistro([]);
  }, [busqueda]);
  //
  const handleDetalles = (e) => {
    // console.log(e);
    setOpenModal(true);
    setDatos(e);
    console.log(e);
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
            fixedHeaderScrollHeight="500px"
            noDataComponent={<i className="fas fa-inbox table__icono"></i>}
          />
        </div>
      </div>
      {openModal && (
        <MLiquidacion
          openModal={openModal}
          setOpenModal={setOpenModal}
          datos={datos}
          getLiquidacion={getLiquidacion}
          setBusqueda={setBusqueda}
        />
      )}
    </div>
  );
};

export default Liquidacion;
