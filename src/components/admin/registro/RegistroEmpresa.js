import React, { useEffect, useState } from 'react';

import DataTable from 'react-data-table-component';
import { paginacionOpciones } from '../../../helpers/tablaOpciones';
import { fetchGETPOSTPUTDELETE } from '../../../helpers/fetch';
import Swal from 'sweetalert2';

import MRegistroEmpresa from './MRegistroEmpresa';

const RegistroEmpresa = () => {
  const [busqueda, setBusqueda] = useState('');
  const [listRegistro, setListRegistro] = useState([]);
  const [getRegistro, setGetRegistro] = useState([]);
  const [corporations, setCorporations] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [editar, setEditar] = useState(false);
  const [openModal, setOpenModal] = useState(false);



  const getCorporations = () => {
    fetchGETPOSTPUTDELETE('company')
      .then((info) => info.json())
      .then((datos) => setCorporations(datos.data));
  };

  useEffect(() => {
    getCorporations();
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
      name: 'Razón social',
      selector: 'corporation.business_name',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'RUC',
      selector: 'corporation.ruc',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Responsable',
      selector: 'commercial_name',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Telefono',
      // selector: 'contacts[0].phone',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Correo',
      // selector: 'contacts[0].email',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Actividad',
      selector: 'actividad',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
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
  useEffect(() => {
    const filtrarElemento = () => {
      const search = getRegistro.filter((data) => {
        return (
          data.ruc.toString().includes(busqueda) ||
          data.business_name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.commercial_name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.contacts.phone.toString().includes(busqueda) ||
          data.contacts.email
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.actividad
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda)
        );
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda, getRegistro]);
  //

  console.log(corporations);
  const handleAddRegistro = () => {
    setOpenModal(true);
  };
  const handleEditar = (e) => {
    setOpenModal(true);
    setDataSelected(e);
    setEditar(true);
  };
  const handleEliminar = (e) => {
    // console.log(e.id);
    Swal.fire({
      title: '¿Desea eliminar?',
      text: `${e.corporation.business_name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', 'Se ha eliminado correctamente.', 'success');
        fetchGETPOSTPUTDELETE(`company/${e.id}`, {}, 'DELETE').then(
          (result) => {
            result.json();
            getCorporations();
          }
        );
        // resp();
      }
    });
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
            <div>
              <label>
                Agregar Empresa
                <i
                  className="fas fa-plus-circle"
                  onClick={handleAddRegistro}
                ></i>{' '}
              </label>
            </div>
          </div>

          <DataTable
            columns={columnas}
            data={corporations}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            fixedHeaderScrollHeight="500px"
            noDataComponent={<i className="fas fa-inbox table__icono"></i>}
          />
        </div>
      </div>
      {openModal && (
        <MRegistroEmpresa
          openModal={openModal}
          setOpenModal={setOpenModal}
          getCorporations={getCorporations}
          dataSelected={dataSelected}
          setDataSelected= {setDataSelected}
          editar={editar}
          setEditar={setEditar}
        />
      )}
    </div>
  );
};

export default RegistroEmpresa;
