import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { paginacionOpciones } from '../../helpers/tablaOpciones';
import { fetchGETPOSTPUTDELETEJSON } from '../../helpers/fetch';
import jsPDF from 'jspdf';
import eclia from '../../assets/pdf Imagen/eclia.png';
import antigenono from '../../assets/pdf Imagen/antigenoSi.png';
import antigenosi from '../../assets/pdf Imagen/antigenoSi.png';
import anticuerpos from '../../assets/pdf Imagen/anticuerpos.png';
import molecular from '../../assets/pdf Imagen/molecular.png';
import rapida from '../../assets/pdf Imagen/rapida.png';
import firma from '../../assets/pdf Imagen/Firma.png';
import isos from '../../assets/pdf Imagen/isos.png';

const EmpresaResultados = () => {
  const [busqueda, setBusqueda] = useState('');
  const [clinica, setClinica] = useState([]);
  const [data, setData] = useState([]);
  const [listRegistro, setListRegistro] = useState('');

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
      // selector: 'telefono',
      // sortable: true,
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
          onClick={() => handleDetalles(e)}
          className="table__tablebutton eliminar"
        >
          <i className="far fa-file-pdf"></i>
        </button>
      ),
    },
  ];

  const handleDetalles = (e) => {
    console.log(e);
    if (e.servicio_id === 5) {
      if (e.resultado && e.resultado.result === 0) {
        generarPDF(e, antigenono, 'Formato Antígeno');
      } else if (e.resultado && e.resultado.result === 1) {
        generarPDF(e, antigenosi, 'Formato Antígeno');
      }
    } else if (e.servicio_id === 6) {
      generarPDF(e, eclia, 'Formato Eclia');
    } else if (e.servicio_id === 7) {
      generarPDF(e, anticuerpos, 'Formato Anticuerpos');
    } else if (e.servicio_id === 8) {
      generarPDF(e, rapida, 'Formato Rapida');
    }
  };

  const generarPDF = (e, imagen, formato) => {
    console.log(e);
    const doc = new jsPDF('p', 'pt');
    doc.setProperties({
      title: formato,
    });
    doc.setFontSize(10);

    doc.addImage(imagen, 'PNG', 6, 20, 580, 800, '', 'FAST');

    if (e.servicio_id === 5) {
      doc.text(328, 135, `${e && e.genero ? e.genero : ''}`);
      doc.text(328, 135, `${e && e.genero === null ? 'Masculino' : ''}`);

      doc.text(90, 136, `${e.nro_atencion ? e.nro_atencion : ''}`);
      doc.text(60, 158, `${e.dni ? e.dni : ''}`);
      doc.text(428, 157, `${e.fecha_atencion ? e.fecha_atencion : ''}`);

      doc.text(85, 180, `${e.paciente ? e.paciente : ''}`);
      doc.text(312, 180, '20');

      doc.text(
        284,
        268,
        `${
          e.resultado && e.resultado.result === 0
            ? 'No detectado'
            : e.resultado && e.resultado.result === 1
            ? 'Detectado'
            : 'Sin resultado'
        }`
      );
      doc.addImage(firma, 'PNG', 345, 450, 100, 80, '', 'FAST');
      doc.addImage(isos, 'PNG', 300, 760, 220, 60, '', 'FAST');
    } else if (e.servicio_id == 6) {
      doc.text(
        328,
        120,
        `${
          e && e.person && e.person.gender_id === 1 ? 'Masculino' : 'Femenino'
        }`
      );
      doc.text(85, 119, `${e.nro_atencion ? e.nro_atencion : ''}`);
      doc.text(55, 141, `${e.dni ? e.dni : ''}`);
      doc.text(428, 141, `${e.fecha_atencion ? e.fecha_atencion : ''}`);

      doc.text(80, 163, `${e.paciente ? e.paciente : ''}`);
      // doc.text(313, 164, '20');

      doc.text(
        195,
        268,
        `${e.resultado && e.resultado.result_igm ? e.resultado.result_igm : ''}`
      );
      doc.text(
        285,
        268,
        `${e.resultado && e.resultado.result_igg ? e.resultado.result_igg : ''}`
      );
      doc.setFillColor(255, 255, 255);
      doc.rect(335, 464, 150, 80, 'F');
      doc.addImage(firma, 'PNG', 345, 485, 100, 80, '', 'FAST');
    } else if (e.servicio_id == 7) {
      doc.text(328, 124, `${e && e.genero === null ? 'Masculino' : ''}`);

      doc.text(83, 124, `${e.nro_atencion ? e.nro_atencion : ''}`);
      doc.text(55, 146, `${e.dni ? e.dni : ''}`);
      doc.text(428, 146, `${e.fecha_atencion ? e.fecha_atencion : ''}`);

      doc.text(78, 167, `${e.paciente ? e.paciente : ''}`);

      doc.text(310, 167, '20');

      doc.text(
        180,
        265,
        `${
          e.resultado && e.resultado.result === '0'
            ? 'Negativo'
            : e.resultado && e.resultado.result === '1'
            ? 'Positivo'
            : 'Sin resultado'
        }`
      );
      doc.setFillColor(255, 255, 255);
      doc.rect(335, 465, 151, 81, 'F');
      doc.addImage(firma, 'PNG', 345, 484, 100, 80, '', 'FAST');
    } else if (e.servicio_id == 8) {
      doc.text(84, 142, `${e.nro_atencion ? e.nro_atencion : ''}`);

      doc.text(328, 141, `${e && e.genero ? e.genero : ''}`);
      doc.text(55, 163, `${e && e.dni ? e.dni : ''}`);
      doc.text(428, 163, `${e && e.fecha_atencion ? e.fecha_atencion : ''}`);

      doc.text(80, 184, `${e.paciente ? e.paciente : ''}`);
      doc.text(310, 185, '20');

      if (e.resultado.reactive === '1') {
        doc.text(295, 285, 'X');
      }
      if (e.resultado.reactive === '2') {
        doc.text(200, 285, 'X');
      }
      if (e.resultado.reactive === '3') {
        doc.text(200, 285, 'X');
        doc.text(295, 285, 'X');
      }
      if (e.resultado.reactive === '4') {
        doc.text(180, 285, 'No reactivo');

        doc.text(270, 285, 'No reactivo');
      }
      if (e.resultado.reactive === '5') {
        doc.text(195, 285, 'null');

        doc.text(290, 285, 'null');
      }

      doc.setFillColor(255, 255, 255);
      doc.rect(335, 465, 151, 81, 'F');
      doc.addImage(firma, 'PNG', 345, 484, 100, 80, '', 'FAST');
    }

    window.open(doc.output('bloburl'), '_blank');
    // var blob = doc.output("blob");
  };

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
