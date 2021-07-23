import React, { useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { fempresa2 } from "../../data/FEmpresa";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";

import { paginacionOpciones } from "../../helpers/tablaOpciones";
import MEmpresa from "./MEmpresa";
import MLiquidacion from "./MLiquidacion";

const Liquidacion = () => {
  const [busqueda, setBusqueda] = useState("");
  const [listRegistro, setListRegistro] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [datos, setDatos] = useState({});
  const [liquidacion, setLiquidacion] = useState([]);

  const getLiquidacion = () => {
    fetchGETPOSTPUTDELETE("settlement")
      .then((info) => info.json())
      .then((info) => setLiquidacion(info));
  };

  useEffect(() => {
    getLiquidacion();
  }, []);

  console.log(liquidacion);

  const columnas = [
    {
      name: "Item",
      selector: "id",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Razón social",
      selector: "razon_social",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "RUC",
      selector: "ruc",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Fecha",
      selector: "fecha",
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
      selector: "impuesto",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Total",
      selector: "total",
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
    // {
    //   name: "Cargar Información",
    //   button: true,
    //   cell: (e) => (
    //     <button
    //       // onClick={() => handleDetalles(e)}
    //       className="table__tablebutton"
    //     >
    //       <i class="fas fa-folder-open"></i>
    //     </button>
    //   ),
    // },
  ];

  useEffect(() => {
    const filtrarElemento = () => {
      const search = fempresa2.filter((data) => {
        return (
          data.razon_social
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.ruc.toString().includes(busqueda) ||
          data.fecha
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.subtotal
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.impuesto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.total
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda)
        );
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda]);
  //
  const handleDetalles = (e) => {
    // console.log(e);
    setOpenModal(true);
    setDatos(e);
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
        />
      )}
    </div>
  );
};

export default Liquidacion;
