/* eslint-disable */
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

import {
  fetchGETPOSTPUTDELETE,
  fetchGETPOSTPUTDELETEJSON,
} from '../../helpers/fetch';
import { paginacionOpciones } from '../../helpers/tablaOpciones';

const Historial = () => {
  const [busqueda, setBusqueda] = useState('');
  const [listRegistro, setListRegistro] = useState([]);
  const [dataHistorial, setDataHistorial] = useState([]);

  const getHistorial = () => {
    fetchGETPOSTPUTDELETE(`historial/atencion`, null, 'POST')
      .then((data) => data.json())
      .then((datos) => setDataHistorial(datos));
  };

  useEffect(() => {
    getHistorial();
  }, []);

  console.log(dataHistorial);

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
      name: 'Tipo de documento',
      selector: (row) => (row.tipo_documento ? row.tipo_documento : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Nº documento',
      selector: (row) => (row ? row.dni : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Nombres y apellidos',
      selector: (row) => (row.paciente ? row.paciente : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },

    {
      name: 'Tipo de prueba',
      selector: (row) => (row.prueba ? row.prueba : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Fecha solicitud',
      selector: (row) => (row.fecha_solicitud ? row.fecha_solicitud : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Fecha atención',
      selector: (row) => (row.fecha_atencion ? row.fecha_atencion : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
  ];
  //
  useEffect(() => {
    const filtrarElemento = () => {
      const search =
        dataHistorial.length > 0 &&
        dataHistorial.filter((data) => {
          return (
            (data.tipo_documento
              ? data.tipo_documento
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              : '') ||
            (data.dni
              ? data.dni.toString().toLowerCase().includes(busqueda)
              : '') ||
            (data.paciente
              ? data.paciente.toString().toLowerCase().includes(busqueda)
              : '') ||
            (data.prueba
              ? data.prueba
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              : '' || data.fecha_solicitud
              ? fecha_solicitud.toString().toLowerCase().includes(busqueda)
              : '')
          );
        });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda, dataHistorial]);
  // console.log(listRegistro);
  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };

  //
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
            striped
            highlightOnHover
            fixedHeaderScrollHeight="100%"
            noDataComponent={
              <div className="spinner">
                <i className="fas fa-inbox table__icono"></i>
                <p style={{ color: 'lightgrey' }}>No hay datos</p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Historial;
