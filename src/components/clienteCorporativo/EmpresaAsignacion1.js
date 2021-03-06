import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { paginacionOpciones } from '../../helpers/tablaOpciones';
import { fetchGETPOSTPUTDELETE } from '../../helpers/fetch';
import EmpresaAsignacion4 from './EmpresaAsignacion4';

const EmpresaAsignacion = () => {
  const [busqueda, setBusqueda] = useState('');
  const [asignation, setAsignation] = useState([]);
  const [modaesCorporativo, setModaesCorporativo] = useState(false);
  const [data, setData] = useState([]);
  const [listRegistro, setListRegistro] = useState('');

  const getAsignacion = () => {
    fetchGETPOSTPUTDELETE('company_employees')
      .then((res) => res.json())
      .then((result) => setAsignation(result));
  };

  useEffect(() => {
    getAsignacion();
  }, []);
  // console.log(asignation);
  const columnas = [
    {
      name: 'Ítem',
      selector: (row, index) => (index += 1),
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
      grow: 2,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Nº de documento',
      selector: (row) => (row.person && row.person.dni ? row.person.dni : ''),
      grow: 2,
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Nombres',
      selector: (row) => (row.person && row.person.name ? row.person.name : ''),
      grow: 2,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'A. Paterno',
      selector: (row) =>
        row.person && row.person.pat_lastname ? row.person.pat_lastname : '',
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
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Fecha de Nacimiento',
      selector: (row) =>
        row.person.birthday && row.person.birthday ? row.person.birthday : '',
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
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
  ];

  useEffect(() => {
    const filtrarElemento = () => {
      const search = asignation.filter((data) => {
        return data.person.dni
          ? data.person.dni
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLocaleLowerCase()
              .includes(busqueda)
          : '' || data.person.pat_lastname === null
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
  }, [busqueda, asignation]);

  const handleOnChange = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };
  const modales = () => {
    setModaesCorporativo(!modaesCorporativo);
  };

  return (
    <div className='container'>
      <h3 className='title__modals'>Asignar pruebas</h3>
      <div className='row'>
        <div className=' table-responsive'>
          <div className='adminregistro__option mb-3'>
            <div>
              <input
                type='text'
                placeholder='Buscar'
                name='busqueda'
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
              onClick={modales}
            >
              <label
                style={{
                  cursor: 'pointer',
                }}
              >
                Cargar <i className='fas fa-upload mx-1'></i>
              </label>
            </div>
          </div>
          <DataTable
            className='dataTable'
            id='table'
            columns={columnas}
            data={listRegistro}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            fixedHeaderScrollHeight='100%'
            noDataComponent={<i className='fas fa-inbox table__icono'></i>}
            striped
            highlightOnHover
            selectableRows
            onSelectedRowsChange={(e) => setData(e.selectedRows)}
          />
        </div>
      </div>
      {modaesCorporativo && (
        <EmpresaAsignacion4
          setModaesCorporativo={setModaesCorporativo}
          modaesCorporativo={modaesCorporativo}
          data={data}
        />
      )}
    </div>
  );
};

export default EmpresaAsignacion;
