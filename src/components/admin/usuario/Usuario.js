import React, { useEffect, useState } from 'react';

import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { usuario } from '../../../data/ACUsuario';
import { fetchGETPOSTPUTDELETE } from '../../../helpers/fetch';
import { paginacionOpciones } from '../../../helpers/tablaOpciones';
import MUsuario from './MUsuario';

const Usuario = () => {
  const [busqueda, setBusqueda] = useState('');
  const [listRegistro, setListRegistro] = useState([]);
  const [getUsuario, setGetUsuario] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // //TODO LISTAR
  const resp = () => {
    fetchGETPOSTPUTDELETE('users')
      .then((data) => data.json())
      .then((datos) => setGetUsuario(datos));
  };

  useEffect(() => {
    resp();
  }, []);

  // console.log(getUsuario);
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
      name: 'Tipo documento',
      selector: 'documento',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Nº Documento',
      selector: 'numero',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Tipo usuario',
      selector: 'usuario',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Empresa',
      selector: 'empresa',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Telefono',
      selector: 'telefono',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Correo',
      selector: 'correo',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Generar actividad',
      selector: 'atencion',
      sortable: true,
      right: true,
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
      const search = usuario.filter((data) => {
        return (
          data.documento
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.numero.toString().includes(busqueda) ||
          data.usuario
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.empresa
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.telefono.toString().includes(busqueda) ||
          data.correo
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.atencion
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

  const handleEditar = () => {
    setOpenModal(true);
  };
  const handleEliminar = (e) => {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: `${e.razon}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Eliminado!', 'Se ha eliminado correctamente.', 'success');
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
          </div>

          <DataTable
            columns={columnas}
            data={getUsuario}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            fixedHeaderScrollHeight="500px"
            noDataComponent={<i className="fas fa-inbox table__icono"></i>}
          />
        </div>
      </div>
      {openModal && (
        <MUsuario openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
};

export default Usuario;
