import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { paginacionOpciones } from '../../helpers/tablaOpciones';
import { fetchGETPOSTPUTDELETEJSON } from '../../helpers/fetch';
import jsPDF from 'jspdf';
import eclia from '../../assets/pdf Imagen/eclia.png';
import antigenono from '../../assets/pdf Imagen/antigenoSi.png';
import antigenosi from '../../assets/pdf Imagen/antigenoSi.png';
import anticuerpos from '../../assets/pdf Imagen/anticuerpos.png';
// import molecular from '../../assets/pdf Imagen/molecular.png';
import rapida from '../../assets/pdf Imagen/rapida.png';
import firma from '../../assets/pdf Imagen/Firma.png';
import isos from '../../assets/pdf Imagen/isos.png';

const EmpresaResultados = () => {
  const [busqueda, setBusqueda] = useState('');
  const [clinica, setClinica] = useState([]);
  const [data, setData] = useState([]);
  const [listRegistro, setListRegistro] = useState('');
  const [checboxValue, setChecboxValue] = useState({
    chekcboxEmail: false,
  });
  const { chekcboxEmail } = checboxValue;
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
  console.log(clinica);
  const enviarEmail = () => {
    const array = data.map((m) => m.nro_atencion);
    fetchGETPOSTPUTDELETEJSON(
      'enviar-resultados/corporativo',
      { atenciones: array },
      'POST'
    )
      .then((data) => data.json())
      .then((data) => console.log(data));
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
      name: 'Nombres y apellidos',
      selector: (row) => (row && row.paciente ? row.paciente : ''),
      // sortable: true,
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
      grow: 2,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Nº de documento',
      selector: (row) => (row && row.dni ? row.dni : ''),
      // sortable: true,
      grow: 2,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Teléfono',
      selector: (row) => (row && row.telefono ? row.telefono : ''),
      // sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Correo',
      selector: (row) => (row && row.email ? row.email : ''),
      // sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
      grow: 2,
    },

    {
      name: 'Estado',
      selector: (row) =>
        row.resultado === null
          ? ''
          : row.resultado.enviado === 0
          ? 'No enviado'
          : 'Enviado',
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Resultados',
      button: true,
      cell: (e) => (
        <button type="button" className="table__tablebutton eliminar">
          {e.resultado === null ? (
            <i
              className="far fa-file-pdf"
              style={{ color: '#7c7c7c', cursor: 'unset' }}
            ></i>
          ) : (
            <a
              href={e.resultado.pdf}
              alt=""
              target="_blank"
              rel="noreferrer"
              style={{ color: '#009DCA' }}
            >
              <i className="far fa-file-pdf"></i>
            </a>
          )}
        </button>
      ),
    },
  ];

  useEffect(() => {
    const filtrarElemento = () => {
      const search = clinica.filter((data) => {
        return data.dni
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLocaleLowerCase()
          .includes(busqueda);
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda, clinica]);

  const handleOnChange = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };
  const handleOnChangeCheckbox = (e) => {
    setChecboxValue({ ...checboxValue, [e.target.name]: e.target.checked });
  };
  // console.log(chekcboxEmail);
  useEffect(() => {
    if (chekcboxEmail) {
      console.log('enviar data');
      enviarEmail();
    }
  }, [chekcboxEmail]);

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
                value={busqueda}
                onChange={handleOnChange}
              />
            </div>
            <div>
              <div className="switch">
                <input
                  type="checkbox"
                  id="check"
                  name="chekcboxEmail"
                  value={chekcboxEmail}
                  onChange={handleOnChangeCheckbox}
                />
                <label htmlFor="check"></label>
              </div>
              <button className="botones" onClick={enviarEmail}>
                Enviar
              </button>
            </div>
          </div>
          <DataTable
            className="dataTable"
            columns={columnas}
            data={listRegistro}
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
