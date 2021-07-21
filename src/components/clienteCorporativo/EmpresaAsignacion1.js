import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { paginacionOpciones } from '../../helpers/tablaOpciones';
import { fetchGETPOSTPUTDELETE } from '../../helpers/fetch';
import EmpresaAsignacion4 from './EmpresaAsignacion4';

const EmpresaAsignacion = () => {
  const history = useHistory();
  const [busqueda, setBusqueda] = useState('');
  const [asignation, setAsignation] = useState([]);
  const [seleccionar, setSeleccionar] = useState({});
  const [modaesCorporativo, setModaesCorporativo] = useState(false);

  const { seleccionado } = seleccionar;

  const getAsignacion = () => {
    fetchGETPOSTPUTDELETE('company_employees')
      .then((res) => res.json())
      .then((result) => setAsignation(result));
  };

  useEffect(() => {
    getAsignacion();
  }, []);

  console.log(seleccionar);

  const columnas = [
    {
      name: 'Seleccionar',
      button: true,
      // cell: (e) => (
      //   <input
      //     className="form-check-input"
      //     type="checkbox"
      //     name="seleccionado"
      //     checked={seleccionado}
      //     onChange={provandoCambios}
      //     id="flexCheckDefault"
      //   />
      // ),
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
      name: 'Sexo',
      selector: (row) =>
        row.person && row.person.gender_id === 1 ? 'Masculino' : 'Femenino',
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Fecha de Nacimiento',
      selector: (row) =>
        row.fecha_nacimiento && row.fecha_nacimiento
          ? row.fecha_nacimiento
          : '',
      sortable: true,
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
  ];

  const handleOnChange = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };
  const modales = () => {
    setModaesCorporativo(!modaesCorporativo);
  };
  return (
    <div className="container">
      <div className="row">
        <h3 className="titulo">Asignar pruebas</h3>
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
            <div>
              <label>
                Cargar <i onClick={modales} className="fas fa-upload"></i>
              </label>
            </div>
          </div>
          <DataTable
            className="dataTable"
            id="table"
            columns={columnas}
            data={asignation}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            fixedHeaderScrollHeight="100%"
            noDataComponent={<i className="fas fa-inbox table__icono"></i>}
            striped
            selectableRows
            highlightOnHover
            selectableRowsHighlight
          />
        </div>
      </div>
      {modaesCorporativo && (
        <EmpresaAsignacion4
          setModaesCorporativo={setModaesCorporativo}
          modaesCorporativo={modaesCorporativo}
        />
      )}
    </div>
  );
};

export default EmpresaAsignacion;
