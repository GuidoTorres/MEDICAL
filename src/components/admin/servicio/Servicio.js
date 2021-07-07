import React, { useEffect, useState } from 'react';

import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';

// import { servicio } from '../../../data/AServicio';
import { fetchGETPOSTPUTDELETE } from '../../../helpers/fetch';
import { paginacionOpciones } from '../../../helpers/tablaOpciones';
import MDescargar from './MDescargar';
import MServicio from './MServicio';
import MSubCategoria from './MSubCategoria';

const Servicio = () => {
  const [busqueda, setBusqueda] = useState('');
  // const [listRegistro, setListRegistro] = useState([]);
  const [getServicio, setGetServicio] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [openSubModal, setopenSubModal] = useState(false);
  const [subCategoria, setSubCategoria] = useState([]);

  const [openHModal, setOpenHModal] = useState(false);
  // const [servicios, setServicios] = useState({});

  //TODO LISTAR
  // const resp = () => {
  //   fetchGETPOSTPUTDELETE('services')
  //     .then((data) => data.json())
  //     .then((datos) => setGetServicio(datos.services));
  // };

  // useEffect(() => {
  //   resp();
  // }, []);

  const getServices = () => {
    fetchGETPOSTPUTDELETE('services')
      .then((info) => info.json())
      // .then((data) => console.log(data.data));
      .then((datos) => setGetServicio(datos.data));
  };

  useEffect(() => {
    getServices();
  }, []);

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
      name: 'Categoria',
      selector: 'name',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Sub-categoria',
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleSubcategoria(e)}
          className="table__tablebutton"
        >
          <i className="fas fa-eye"></i>
        </button>
      ),
    },
    {
      name: 'Historial',
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleHistorial(e)}
          className="table__tablebutton"
        >
          <i className="far fa-file-excel"></i>
        </button>
      ),
    },
    {
      name: 'Editar',
      button: true,
      cell: (e) => (
        <button onClick={() => handleEditar(e)} className="table__tablebutton">
          <i className="fas fa-pencil-alt"></i>
        </button>
      ),
    },
    {
      name: 'Eliminar',
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleEliminar(e)}
          className="table__tablebutton"
        >
          <i className="far fa-trash-alt"></i>
        </button>
      ),
    },
  ];

  // useEffect(() => {
  //   const filtrarElemento = () => {
  //     const search = servicio.filter((data) => {
  //       return (
  //         data.categoria
  //           .normalize('NFD')
  //           .replace(/[\u0300-\u036f]/g, '')
  //           .toLocaleLowerCase()
  //           .includes(busqueda) ||
  //         data.subcategoria
  //           .normalize('NFD')
  //           .replace(/[\u0300-\u036f]/g, '')
  //           .toLocaleLowerCase()
  //           .includes(busqueda) ||
  //         data.precio.toString().includes(busqueda)
  //       );
  //     });
  //     setListRegistro(search);
  //   };
  //   filtrarElemento();
  // }, [busqueda]);
  //

  const handleEditar = () => {
    // setOpenModal(true);
  };
  const handleEliminar = (e) => {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: `${e.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', 'Se ha eliminado correctamente.', 'success');
        fetchGETPOSTPUTDELETE(`services/${e.id}`, {}, 'DELETE').then((result) =>
          result.json()
        );
      }
    });
  };

  const handleSubcategoria = (e) => {
    setopenSubModal(true);
    setSubCategoria(e);
  };

  const handleHistorial = () => {
    setOpenHModal(true);
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
            data={getServicio}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            fixedHeaderScrollHeight="500px"
            noDataComponent={
            <div className="spinner">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <i className="fas fa-inbox table__icono"></i>
          </div>}
          />
        </div>
      </div>
      {openModal && (
        <MServicio openModal={openModal} setOpenModal={setOpenModal} />
      )}
      {openSubModal && (
        <MSubCategoria
          openSubModal={openSubModal}
          setOpenSubModal={setopenSubModal}
          subCategoria={subCategoria}
        />
      )}
      {openHModal && (
        <MDescargar setOpenHModal={setOpenHModal} openHModal={openHModal} />
      )}
    </div>
  );
};

export default Servicio;
