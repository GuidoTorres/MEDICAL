/* eslint-disable */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

import {
  customStyles,
  paginacionOpciones,
  mensajesTablaFacturacion,
} from "../../../helpers/tablaOpciones";
import MMEmpresa from "./MMEmpresa";

const MEmpresa = ({
  openModalEmpresa,
  setOpenModalEmpresa,
  dataEmpresa,
  setBusqueda,
  getEmpresas,
}) => {
  const [busquedaMEmpresa, setBusquedaMEmpresa] = useState("");
  const [listRegistro, setListRegistro] = useState([]);
  const [openModalParticular, setOpenModalParticular] = useState(false);
  const [data, setData] = useState([]);

  // console.log(dataEmpresa);

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
      selector: "total",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
  ];

  useEffect(() => {
    const filtrarElemento = () => {
      if (busquedaMEmpresa !== "" && busquedaMEmpresa !== null) {
        const search = dataEmpresa.attenciones.filter((data) => {
          return (
            data.id.toString().includes(busquedaMEmpresa) ||
            data.dni.toString().includes(busquedaMEmpresa) ||
            data.fecha_atencion.toString().includes(busquedaMEmpresa) ||
            data.paciente
              .toString()
              .toLowerCase()
              .includes(busquedaMEmpresa.toLowerCase()) ||
            data.categoria
              .toString()
              .toLowerCase()
              .includes(busquedaMEmpresa.toLowerCase()) ||
            data.servicio
              .toString()
              .toLowerCase()
              .includes(busquedaMEmpresa.toLowerCase()) ||
            data.subtotal.toString().includes(busquedaMEmpresa)
          );
        });
        setListRegistro(search);
      } else {
        setListRegistro(dataEmpresa.attenciones);
      }
    };
    filtrarElemento();
  }, [busquedaMEmpresa]);

  const handleSearch = (e) => {
    setBusquedaMEmpresa(([e.target.name] = e.target.value));
  };
  const handleLiquidar = () => {
    if (data.length > 0) {
      setOpenModalParticular(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe elegir al menos un paciente",
      });
    }
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
      overlayClassName="modal-fondo ReactToMessage"
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
                    value={busquedaMEmpresa}
                    onChange={handleSearch}
                    className="mb-1"
                  />
                </div>
              </div>

              <DataTable
                columns={columnas}
                data={listRegistro}
                contextMessage={mensajesTablaFacturacion}
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
            setBusqueda={setBusqueda}
            getEmpresas={getEmpresas}
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
