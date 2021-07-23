import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

import { paginacionOpciones } from '../../helpers/tablaOpciones';
import { fetchGETPOSTPUTDELETEJSON } from '../../helpers/fetch';
import OMLista from './OMLista';
import { useDispatch, useSelector } from 'react-redux';
import { lista, listarOrganizador } from '../../actions/organizador';

const Solicitud = () => {
  const [busqueda, setBusqueda] = useState('');
  const [listRegistro, setListRegistro] = useState({});
  const [oranizadorxd, setOranizadorxd] = useState([]);
  const [modalList, setModalList] = useState(false);
  const [search, setSearch] = useState([]);

  const getSolicitudes = () => {
    // const dispatch = useDispatch()
    fetchGETPOSTPUTDELETEJSON('reservation/organizer')
      .then((data) => data.json())
      .then((datos) => setOranizadorxd(datos.data));
  };
  // console.log(listOrganizador);
  const abrirModal = (e) => {
    fetchGETPOSTPUTDELETEJSON(`reservation/get/${e.id}`)
      .then((data) => data.json())
      .then((resultados) => setListRegistro(resultados));
    // dispatch(lista(123456));
    // console.log(dispatch);
    // setModalList(true);
  };

  useEffect(() => {
    getSolicitudes();
  }, []);

  const columnas = [
    {
      name: 'Item',
      selector: (row) => (row ? row.id : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Usuario',
      selector: (row) => (row ? row.users.username : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Distrito',
      selector: (row) => (row ? row.address.district.name : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Fecha solicitada',
      selector: (row) => (row ? row.attention_date : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Hora solicitada',
      selector: (row) => (row ? row.attention_time : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Atención',
      button: true,
      cell: (e) => (
        <button onClick={() => abrirModal(e)} className="table__tablebutton">
          <i className="fas fa-angle-right"></i>
        </button>
      ),
    },
  ];
  //
  useEffect(() => {
    const filtrarElemento = () => {
      const search = oranizadorxd.filter((data) => {
        return (
          data.address.district.name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.attention_date.toString().includes(busqueda) ||
          data.attention_time.toString().includes(busqueda)
        );
      });
      setSearch(search);
    };
    filtrarElemento();
  }, [busqueda, oranizadorxd]);
  console.log(oranizadorxd);
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
            data={search}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            fixedHeaderScrollHeight="100%"
            highlightOnHover
            striped
            noDataComponent={<i className="fas fa-inbox table__icono"></i>}
          />
        </div>
      </div>
      {modalList && (
        <OMLista
          modalList={modalList}
          setModalList={setModalList}
          listRegistro={listRegistro}
        />
      )}
    </div>
  );
};

export default Solicitud;
