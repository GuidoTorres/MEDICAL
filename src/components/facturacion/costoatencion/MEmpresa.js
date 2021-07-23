import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DataTable from "react-data-table-component";

import {
  customStyles,
  paginacionOpciones,
} from "../../../helpers/tablaOpciones";
import MMEmpresa from "./MMEmpresa";

const MEmpresa = ({ openModalEmpresa, setOpenModalEmpresa, dataEmpresa }) => {
  const [busqueda, setBusqueda] = useState("");
  const [listRegistro, setListRegistro] = useState([]);
  const [openModalParticular, setOpenModalParticular] = useState(false);
  const [data, setData] = useState([]);

  // console.log(dataEmpresa);

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
      name: "DNI",
      selector: "dni",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Fecha Hora",
      selector: "fecha_atencion",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Nombre y apellido",
      selector: "paciente",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Tipo de servicio",
      selector: "categoria",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Plan de atención",
      selector: "servicio",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "SubTotal",
      selector: "subtotal",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
  ];

  useEffect(() => {
    const filtrarElemento = () => {
      const search = dataEmpresa.attenciones.filter((data) => {
        return (
          data.dni
            // .normalize("NFD")
            // .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.fecha_atencion
            // .normalize("NFD")
            // .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.paciente.toString().includes(busqueda) ||
          data.categoria
            // .normalize("NFD")
            // .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.servicio
            // .normalize("NFD")
            // .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.subtotal.toString().includes(busqueda)
          // data.impuesto.toString().includes(busqueda) ||
          // data.total.toString().includes(busqueda)
        );
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda]);

  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };
  const handleLiquidar = () => {
    setOpenModalParticular(true);
  };
  const closeModal = () => {
    setOpenModalEmpresa(false);
  };
  return (
    <Modal
      isOpen={openModalEmpresa}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal  mfacturacion__particular"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Detalles de atención</h3>
      <div className="container">
        <div className="row">
          <div className="col-12 fmparticular">
            <div className="fmparticular__tipo empresa__info">
              <label>Razón social</label>
              <input type="text" readOnly value={dataEmpresa.nombre} />
              <label>Ruc</label>
              <input type="text" readOnly value={dataEmpresa.ruc} />
            </div>
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
                data={dataEmpresa.attenciones}
                pagination
                paginationComponentOptions={paginacionOpciones}
                fixedHeader
                fixedHeaderScrollHeight="500px"
                noDataComponent={<i className="fas fa-inbox table__icono"></i>}
                selectableRows
                onSelectedRowsChange={(e) => setData(e.selectedRows)}
              />
            </div>
          </div>
        </div>
        {openModalParticular && (
          <MMEmpresa
            openModalParticular={openModalParticular}
            setOpenModalParticular={setOpenModalParticular}
            data={data}
            dataEmpresa={dataEmpresa}
            setOpenModalEmpresa={setOpenModalEmpresa}
          />
        )}
        <div className="list-botones">
          <button className="botones" onClick={closeModal}>
            Cancelar
          </button>
          <button className="botones" onClick={handleLiquidar}>
            Liquidar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MEmpresa;
