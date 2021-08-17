import React, { useEffect, useRef, useState } from 'react';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { fetchGETPOSTPUTDELETE } from '../../helpers/fetch';
import { paginacionOpciones } from '../../helpers/tablaOpciones';
import EditarDatosTrabajador from './Modales/EditarDatosTrabajador';

const EmpresaRegistro = () => {
  const [busqueda, setBusqueda] = useState('');
  const [employees, setEmployees] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [listRegistro, setListRegistro] = useState('');
  const fileRef = useRef();

  const getEmployees = () => {
    fetchGETPOSTPUTDELETE('company_employees')
      .then((res) => res.json())
      .then((res) => setEmployees(res));
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const importarExcel = (file) => {
    const formData = new FormData();
    formData.set('file', file);
    fetchGETPOSTPUTDELETE('company_employees/import', formData, 'POST')
      .then((data) => {
        data.json();
      })
      .then(() => {
        getEmployees();
      });
  };

  const subidaExcel = (e) => {
    if (e.target.files[0] !== undefined) {
      importarExcel(e.target.files[0]);
    }
  };

  const triggerClick = () => {
    console.log(fileRef.current.click());
  };

  const columnas = [
    {
      name: 'Ítem',
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
      selector: (row) =>
        row.person && row.person.document_type_id === 3
          ? 'Carné de extranjería'
          : row.person && row.person.document_type_id === 2
          ? 'Pasaporte'
          : row.person && row.person.document_type_id === 1
          ? 'DNI'
          : '',

      sortable: true,
      grow: 2,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Nº de documento',
      selector: (row) => (row.person && row.person.dni ? row.person.dni : ''),
      sortable: true,
      grow: 3,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Nombres',
      selector: (row) => (row.person && row.person.name ? row.person.name : ''),
      sortable: true,
      grow: 3,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'A. Paterno',
      selector: (row) =>
        row.person && row.person.pat_lastname ? row.person.pat_lastname : '',
      sortable: true,
      grow: 3,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'A. Materno',
      selector: (row) =>
        row.person && row.person.mom_lastname ? row.person.mom_lastname : '',
      sortable: true,
      grow: 3,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Correo',
      selector: (row) =>
        row.person && row.person.email ? row.person.email : '',
      sortable: true,
      grow: 5,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Sexo',
      selector: (row) =>
        row.person && row.person.gender_id === 1
          ? 'Masculino'
          : row.person.gender_id === 2
          ? 'Femenino'
          : '',
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Fecha de Nacimiento',
      selector: (row) =>
        row.person && row.person.birthday ? row.person.birthday : '',
      sortable: true,
      grow: 3,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Cargo',
      selector: (row) =>
        row.person && row.person.workstation ? row.person.workstation : '',
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
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

  const handleEliminar = (e) => {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: `${e.person.name}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        fetchGETPOSTPUTDELETE(`users/${e.id}`, {}, 'DELETE').then((result) => {
          if (result.status === 204) {
            Swal.fire(
              'Eliminado!',
              'Se ha eliminado correctamente.',
              'success'
            ).then((response) => {
              if (response.isConfirmed) {
                getEmployees();
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '!Ups¡',
              text: 'Algo salió mal.',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Cerrar',
            });
          }
        });
      }
    });
  };
  const handleOnChange = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };
  console.log(employees);
  useEffect(() => {
    const filtrarElemento = () => {
      const search = employees.filter((data) => {
        return data.person.dni
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLocaleLowerCase()
          .includes(busqueda) || data.person.pat_lastname === null
          ? ' '
          : data.person.pat_lastname
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLocaleLowerCase()
              .includes(busqueda);
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda, employees]);

  return (
    <div className="container">
      <div className="row">
        <h3 className="titulo">Registro de trabajadores</h3>
        <div className=" table-responsive">
          <div className="adminregistro__option">
            <div>
              <input
                type="text"
                placeholder="Buscar"
                name="busqueda"
                value={busqueda}
                onChange={handleOnChange}
              />
            </div>
            <div
              style={{
                alignItems: 'center',
                backgroundColor: '#009DCA',
                borderRadius: '7px',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                padding: '4px 6px',
              }}
              onClick={triggerClick}
            >
              <input
                className="cargar"
                type="file"
                ref={fileRef}
                id="file"
                onChange={subidaExcel}
                style={{ display: 'none' }}
              />
              <p className="pagregar">Subir</p>
              <i className="fas fa-upload mx-1"></i>
            </div>
          </div>
          <DataTable
            className="dataTable"
            id="table"
            columns={columnas}
            data={listRegistro}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            fixedHeaderScrollHeight="100%"
            noDataComponent={<i className="fas fa-inbox table__icono"></i>}
            striped
            highlightOnHover
          />
        </div>
        <EditarDatosTrabajador
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};

export default EmpresaRegistro;
