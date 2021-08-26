import React, { useState } from "react";
import Modal from "react-modal";
import {
  customStyles,
  paginacionOpciones,
} from "../../../helpers/tablaOpciones";
import DataTable from "react-data-table-component";

const MReservasMovil = ({ openModalMovil, setOpenModalMovil }) => {
  const closeModal = () => {
    setOpenModalMovil(false);
  };

  
  const [busqueda, setBusqueda] =  useState("");
  const [listRegistro, setListRegistro] = useState([]);

  const columnas = [
    {
      name: "Item",
      selector: "id",
      sortable: true,
      grow: 0,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Nombre",
      selector: "nombre",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Apellido",
      selector: "apellido",
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
      name: "Fecha",
      selector: "fecha",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Tipo de servicio",
      selector: "tipo",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Plan de atención",
      selector: "atencion",
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
  ];
  return (
    <Modal
      isOpen={openModalMovil}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal  mfacturacion__particular"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
      selectableRows
    >
      <h3 className="title__modal">Agregar Paciente</h3>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <div className="adminregistro__option">
                <div>
                  <input
                    type="text"
                    placeholder="Buscar"
                    name="busqueda"
                    // value={busqueda}
                    // onChange={handleSearch}
                  />
                </div>
              </div>

              <DataTable
                columns={columnas}
                // data={listRegistro}
                pagination
                paginationComponentOptions={paginacionOpciones}
                fixedHeader
                fixedHeaderScrollHeight="500px"
                noDataComponent={<i className="fas fa-inbox table__icono"></i>}
                selectableRows
              />
            </div>
            <div className="list-botones">
              <button className="botones">Cancelar</button>
              <button className="botones">Agregar</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MReservasMovil;
