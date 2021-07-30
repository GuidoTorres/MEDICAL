import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { ToastContainer } from 'react-toastify';

import Comentarios from './Modales/Comentarios';
import { paginacionOpciones } from '../../helpers/tablaOpciones';
import { fetchGETPOSTPUTDELETEJSON } from '../../helpers/fetch';

const EmpresaFacturacion = () => {
  const [busqueda, setBusqueda] = useState('');
  const [listFact, setListFact] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [comentarios, setComentarios] = useState({});
  const [listRegistro, setListRegistro] = useState('');

  const facturacionList = () => {
    fetchGETPOSTPUTDELETEJSON('settlement_empresa')
      .then((data) => data.json())
      .then((datos) => setListFact(datos));
  };

  useEffect(() => {
    facturacionList();
  }, []);

  const openModal = (e) => {
    setComentarios(e);
    setIsOpen(true);
  };

  const columnas = [
    {
      name: 'Ítem',
      selector: 'id',
      // sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Nº de factura',
      selector: (row) => (row && row.id ? '00' + row.id : ''),
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Sub total',
      selector: (row) => (row && row.subtotal ? row.subtotal : ''),
      // sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'IGV',
      selector: (row) => (row && row.igv ? row.igv : ''),
      // sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },

    {
      name: 'Monto',
      selector: (row) => (row && row.amount ? row.amount : ''),
      // sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Comentarios',
      button: true,
      cell: (e) => (
        <button
          onClick={() => openModal(e)}
          className="table__tablebutton eliminar"
        >
          <i className="far fa-comment-alt"></i>
        </button>
      ),
    },
    {
      name: 'Detalle',
      button: true,
      cell: (e) => (
        <button className="table__tablebutton eliminar">
          <i className="far fa-file-pdf"></i>
        </button>
      ),
    },
    {
      name: 'Factura',
      button: true,
      cell: (e) => (
        <button className="table__tablebutton eliminar">
          <i className="far fa-file-pdf"></i>
        </button>
      ),
    },
  ];

  useEffect(() => {
    const filtrarElemento = () => {
      const search = listFact.filter((data) => {
        return data.id.toString().includes(busqueda);
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda, listFact]);

  const handleOnChange = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };

  return (
    <>
      <div className="facturacion container ">
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
        <ToastContainer />
        <div className="row px-2">
          <div className="tabla table-responsive">
            <div className="tablaContenedor">
              <DataTable
                className="dataTable"
                columns={columnas}
                data={listRegistro}
                pagination
                paginationComponentOptions={paginacionOpciones}
                fixedHeader
                fixedHeaderScrollHeight="100%"
                noDataComponent={<i className="fas fa-inbox table__icono"></i>}
              />
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
      </div>
      {modalIsOpen && (
        <Comentarios
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          comentarios={comentarios}
        />
      )}
    </>
  );
};

export default EmpresaFacturacion;
