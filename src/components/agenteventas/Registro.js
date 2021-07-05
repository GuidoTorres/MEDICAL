import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';

import { registro } from '../../data/ACRegistro';
import { paginacionOpciones } from '../../helpers/tablaOpciones';
import MRegistrarEmpresa from './MRegistrarEmpresa';

const Registro = () => {
  const [busqueda, setBusqueda] = useState('');
  const [listRegistro, setListRegistro] = useState([]);
  const [openModal, setOpenModal] = useState(false);

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
      selector: 'razon',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'RUC',
      selector: 'ruc',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Responsable',
      selector: 'responsable',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Teléfono',
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
  //
  useEffect(() => {
    const filtrarElemento = () => {
      const search = registro.filter((data) => {
        return (
          data.razon
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.ruc.toString().includes(busqueda) ||
          data.responsable
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.telefono.toString().includes(busqueda) ||
          data.correo
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
  const handleAddRegistro = () => {
    setOpenModal(true);
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
                Agregar clinica{' '}
                <i
                  className="fas fa-plus-circle"
                  onClick={handleAddRegistro}
                ></i>{' '}
              </label>
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
        <MRegistrarEmpresa openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
};

export default Registro;
