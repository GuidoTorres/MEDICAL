import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { transportista } from '../../data/OTransportista';
import { fetchGETPOSTPUTDELETEJSON } from '../../helpers/fetch';
import { paginacionOpciones } from '../../helpers/tablaOpciones';

const Transportista = () => {
  const [busqueda, setBusqueda] = useState('');
  const [listRegistro, setListRegistro] = useState([]);
  const [listTransportista, setListTransportista] = useState([]);

  const getTransportista = () => {
    fetchGETPOSTPUTDELETEJSON('transportistas_asignados')
      .then((data) => data.json())
      .then((result) => setListTransportista(result));
  };
  useEffect(() => {
    getTransportista();
  }, []);

  console.log(listTransportista);

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
      name: 'Nombre Apellido',
      // selector: (row) =>
      //   row && row.person.username ? row.person.username : '',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Tipo vehículo',
      selector: (row) =>
        row.vehicle && row.vehicle.name ? row.vehicle.name : '',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Placa',
      selector: (row) =>
        row.vehicle && row.vehicle.license_plate
          ? row.vehicle.license_plate
          : '',
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
      const search = listTransportista.filter((data) => {
        return (
          // data.person.username
          //   .normalize('NFD')
          //   .replace(/[\u0300-\u036f]/g, '')
          //   .toLocaleLowerCase()
          //   .includes(busqueda) ||
          data.vehicle.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.vehicle.user_id.toString().includes(busqueda)
        );
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda, listTransportista]);

  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };

  return (
    <div className="container">
      <div className="row">
        {/* <h3>Horarios disponibles</h3> */}

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
            highlightOnHover
            striped
            fixedHeaderScrollHeight="100%"
            noDataComponent={<i className="fas fa-inbox table__icono"></i>}
          />
        </div>
      </div>
    </div>
  );
};

export default Transportista;
