import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { paginacionOpciones } from '../../helpers/tablaOpciones';
import { fetchGETPOSTPUTDELETEJSON } from '../../helpers/fetch';

const EmpresaResultados = () => {
  const [busqueda, setBusqueda] = useState('');
  const [clinica, setClinica] = useState([]);
  const [data, setData] = useState([]);
  const [envioEmail, setEnvioEmail] = useState([]);

  const { atenciones } = setEnvioEmail;

  const getResultado = () => {
    fetchGETPOSTPUTDELETEJSON('resultados/compania', {}, 'POST')
      .then((data) => data.json())
      .then((result) => {
        setClinica(result);
      });
  };
  useEffect(() => {
    getResultado();
  }, []);

  useEffect(() => {
    // const datosNumero = () => {
    // data.map((datos) => {
    // return setEnvioEmail([...envioEmail, datos.nro_atencion]);
    // fetchGETPOSTPUTDELETEJSON(
    //   'enviar-resultados/corporativo',
    //   [datos.nro_atencion],
    //   'POST'
    // ).then((data) => data.json());
    // console.log(datos);
    // });
    //   // datosNumero();
  }, [data, envioEmail]);

  // console.log(envioEmail);

  // console.log(data);
  const enviarEmail = () => {
    // data.map((datos) => {
    // return setEnvioEmail([...envioEmail, datos.nro_atencion]);
    // fetchGETPOSTPUTDELETEJSON(
    //   'enviar-resultados/corporativo',
    //   [datos.nro_atencion],
    //   'POST'
    // ).then((data) => data.json());
    // });

    console.log(envioEmail);
  };

  const columnas = [
    {
      name: 'Ítem',
      selector: (row) => (row && row.nro_atencion ? row.nro_atencion : ''),
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Nombres y apellidos',
      selector: (row) => (row && row.paciente ? row.paciente : ''),
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
      grow: 3,
    },
    {
      name: 'Tipo de documento',
      selector: (row) => (row && row.tipo_documento ? row.tipo_documento : ''),
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Nº de documento',
      selector: (row) => (row && row.dni ? row.dni : ''),
      sortable: true,
      grow: 2,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Teléfono',
      selector: (row) => (row && row.telefono ? row.telefono : ''),
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Correo',
      selector: (row) => (row && row.email ? row.email : ''),
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
      grow: 2,
    },

    {
      name: 'Estado',
      // selector: 'telefono',
      sortable: true,
      right: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Resultados',
      button: true,
      cell: (e) => (
        <button
          type="button"
          // onClick={() => generarPdf(e)}
          className="table__tablebutton eliminar"
        >
          <i className="far fa-file-pdf"></i>
        </button>
      ),
    },
  ];

  return (
    <div className=" container ">
      <div className="row">
        <div className=" table-responsive">
          <div className="adminregistro__option">
            <div>
              <input
                type="text"
                placeholder="Buscar"
                name="busqueda"
                // value={busqueda}
                // onChange={handleSearch}
              />
            </div>
            <div>
              <button className="botones" onClick={enviarEmail}>
                Enviar
              </button>
            </div>
          </div>
          <DataTable
            className="dataTable"
            columns={columnas}
            data={clinica}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            fixedHeaderScrollHeight="100%"
            noDataComponent={<i className="fas fa-inbox table__icono"></i>}
            selectableRows
            onSelectedRowsChange={(e) => setData(e.selectedRows)}
          />
        </div>
      </div>
    </div>
  );
};

export default EmpresaResultados;
