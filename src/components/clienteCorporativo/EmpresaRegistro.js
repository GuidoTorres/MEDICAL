import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { fetchGETPOSTPUTDELETE } from '../../helpers/fetch';
import { paginacionOpciones } from '../../helpers/tablaOpciones';
import EditarDatosTrabajador from './Modales/EditarDatosTrabajador';

const EmpresaRegistro = () => {
  const [busqueda, setBusqueda] = useState('');
  const [employees, setEmployees] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loadExcel, setLoadExcel] = useState();

  const getEmployees = () => {
    fetchGETPOSTPUTDELETE('company_employees')
      .then((res) => res.json())
      .then((res) => setEmployees(res));
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const importarExcel = () => {
    const formData = new FormData();
    formData.set('file', loadExcel);
    fetchGETPOSTPUTDELETE('company_employees/import', formData, 'POST').then(
      (data) => {
        data.json();
      }
    );
    getEmployees();
  };

  const subidaExcel = (e) => {
    const file = e.target.files[0];
    // setLoadExcel(file);
    // importarExcel();
    const formData = new FormData();
    formData.set('file', file);
    fetchGETPOSTPUTDELETE('company_employees/import', formData, 'POST').then(
      (data) => {
        data.json();
      }
    );
    getEmployees();
  };

  const columnas = [
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
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Nº de documento',
      selector: (row) => (row.person && row.person.dni ? row.person.dni : ''),
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Nombres',
      selector: (row) => (row.person && row.person.name ? row.person.name : ''),
      sortable: true,
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
      grow: 2,
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
      grow: 2,
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
      grow: 3,
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
      grow: 2,
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
            <div className="">
              {/* <label>
                <i
                  className="fas fa-upload"
                  // onClick={() => importarExcel()}
                ></i>
              </label> */}
              <input type="file" onClick={(e) => subidaExcel(e)} />
            </div>
          </div>
          <DataTable
            className="dataTable"
            id="table"
            columns={columnas}
            data={employees}
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
