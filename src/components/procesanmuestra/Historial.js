/* eslint-disable */
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

import { historial } from '../../data/PHistorial';
import {
  fetchGETPOSTPUTDELETE,
  fetchGETPOSTPUTDELETEJSON,
} from '../../helpers/fetch';
import { paginacionOpciones } from '../../helpers/tablaOpciones';

const Historial = () => {
  const [busqueda, setBusqueda] = useState('');
  const [listRegistro, setListRegistro] = useState([]);
  const [getDateAttention, setGetDateAttention] = useState([]);

  //usar historial results

  const getAttention = () => {
    // fetchGETPOSTPUTDELETE(`resultados/clinica/${getDateAttention[0].clinic_id}`)

    fetchGETPOSTPUTDELETE('resultados/clinica', null, 'POST')
      .then((data) => data.json())
      .then((datos) => setGetDateAttention(datos));
  };

  useEffect(() => {
    getAttention();
  }, []);

  // console.log(getDateAttention);

  // console.log(getDateAttention);
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
      selector: (row) => (row.dni ? row.dni : ''),
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
      name: 'Fecha entrega',
      selector: (row) => (row.fecha_atencion ? row.fecha_atencion : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },

    {
      name: 'Detalles',
      button: true,
      cell: (e) =>
        e.resultado.pdf === null ? (
          <button className="table__tablebutton">
            <i className="far fa-file-pdf" style={{ color: 'grey' }}></i>
          </button>
        ) : (
          <a
            href={e.resultado.pdf}
            download
            target="_blank"
            style={{ color: 'grey' }}
          >
            <button disabled className="table__tablebutton">
              <i className="far fa-file-pdf" style={{ color: 'red' }}></i>
            </button>
          </a>
        ),
    },
  ];
  //
  useEffect(() => {
    const filtrarElemento = () => {
      const search = historial.filter((data) => {
        return (
          data.dni.toString().includes(busqueda) ||
          data.nombre
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.apellido
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.tipo
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.solicitud
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda)
        );
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda]);

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
            data={getDateAttention}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            striped
            highlightOnHover
            fixedHeaderScrollHeight="100%"
            noDataComponent={
              <div className="spinner">
                <i className="fas fa-inbox table__icono"></i>
                <p style={{ color: 'grey' }}>No hay datos</p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Historial;
