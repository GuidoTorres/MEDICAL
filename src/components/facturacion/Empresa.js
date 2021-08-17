/* eslint-disable */
import React, { useEffect, useState } from 'react';

import DataTable from 'react-data-table-component';
import { fempresa } from '../../data/FEmpresa';
import { fetchGETPOSTPUTDELETE } from '../../helpers/fetch';

import { paginacionOpciones } from '../../helpers/tablaOpciones';
import MEmpresa from './MEmpresa';

const Empresa = () => {
  const [busqueda, setBusqueda] = useState(null);
  const [listRegistro, setListRegistro] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [datos, setDatos] = useState({});
  const [corporations, setCorporations] = useState([]);

  // facuturacion empresa modal usar company discount

  const getCorporations = () => {
    fetchGETPOSTPUTDELETE('company')
      .then((info) => info.json())
      .then((info) => {
        setCorporations(info.data);
        setBusqueda('');
      });
  };

  useEffect(() => {
    getCorporations();
  }, []);

  // console.log(corporations);

  const columnas = [
    {
      name: 'Item',
      selector: (row, index) => (index += 1),
      sortable: true,
      grow: 0,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Razón social',
      selector: (row) => (row.corporation ? row.corporation.business_name : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'RUC',
      selector: (row) => (row.corporation ? row.corporation.ruc : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Responsable',
      selector: (row) =>
        row.corporation.contacts.length > 0
          ? row.corporation.contacts[0].name
          : '',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Telefono',
      selector: (row) =>
        row.corporation.contacts.length > 0
          ? row.corporation.contacts[0].phone
          : '',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Correo',
      selector: (row) =>
        row.corporation.contacts.length > 0
          ? row.corporation.contacts[0].email
          : '',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Detalles',
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleDetalles(e)}
          className="table__tablebutton"
        >
          <i className="far fa-folder-open"></i>
        </button>
      ),
    },
  ];

  useEffect(() => {
    const filtrarElemento = () => {
      if (busqueda !== '' && busqueda !== null) {
        const search = corporations.filter((data) => {
          return (
            (data.corporation
              ? data.corporation.business_name
                ? data.corporation.business_name
                    .toString()
                    .toLowerCase()
                    .includes(busqueda.toLowerCase())
                : ''
              : '') ||
            (data.corporation
              ? data.corporation
                ? data.corporation.ruc.toString().includes(busqueda)
                : ''
              : '') ||
            (data.corporation.contacts
              ? data.corporation.contacts.length > 0
                ? data.corporation.contacts[0].name
                    .toString()
                    .toLowerCase()
                    .includes(busqueda.toLowerCase())
                : ''
              : '') ||
            (data.corporation.contacts
              ? data.corporation.contacts.length > 0
                ? data.corporation.contacts[0].phone
                    .toString()
                    .toLowerCase()
                    .includes(busqueda.toLowerCase())
                : ''
              : '') ||
            (data.corporation.contacts
              ? data.corporation.contacts.length > 0
                ? data.corporation.contacts[0].email
                    .toString()
                    .toLowerCase()
                    .includes(busqueda.toLowerCase())
                : ''
              : '')
          );
        });
        setListRegistro(search);
      } else {
        setListRegistro(corporations);
      }
      // console.log(listRegistro);
    };
    filtrarElemento();
    return () => setListRegistro([]);
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
        <MEmpresa
          openModal={openModal}
          setOpenModal={setOpenModal}
          datos={datos}
        />
      )}
    </div>
  );
};

export default Empresa;
