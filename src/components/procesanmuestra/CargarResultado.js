import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

import { historial } from '../../data/PHistorial';
import { paginacionOpciones } from '../../helpers/tablaOpciones';

const CargarResultado = () => {
  const [busqueda, setBusqueda] = useState('');
  const [listRegistro, setListRegistro] = useState([]);

  const columnas = [
    {
      name: 'Item',
      selector: 'id',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'DNI',
      selector: 'dni',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Nombre',
      selector: 'nombre',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Apellido',
      selector: 'apellido',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Tipo prueba',
      selector: 'tipo',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Fecha solicitud',
      selector: 'solicitud',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Cargar Resultados',
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleDetalles(e)}
          className="table__tablebutton"
        >
          <i class="far fa-file-pdf"></i>
        </button>
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
  const handleDetalles = () => {
    console.log('detalles');
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
            fixedHeaderScrollHeight="500px"
            noDataComponent={<i className="fas fa-inbox table__icono"></i>}
          />
        </div>
      </div>
    </div>
  );
};

export default CargarResultado;
