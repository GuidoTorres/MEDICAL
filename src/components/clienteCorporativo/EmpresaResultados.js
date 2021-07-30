import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { paginacionOpciones } from "../../helpers/tablaOpciones";
import { fetchGETPOSTPUTDELETEJSON } from "../../helpers/fetch";
import jsPDF from "jspdf";
import eclia from "../../assets/pdf Imagen/eclia.png";
import antigeno from "../../assets/pdf Imagen/antigenoSi.png";
import molecular from "../../assets/pdf Imagen/molecular.png";
import rapida from "../../assets/pdf Imagen/rapida.png";

const EmpresaResultados = () => {
  const [busqueda, setBusqueda] = useState("");
  const [clinica, setClinica] = useState([]);
  const [data, setData] = useState([]);
  const [envioEmail, setEnvioEmail] = useState({});
  const [obtenidoData, setObtenidoData] = useState([]);
  // const { atenciones } = setEnvioEmail;

  const getResultado = () => {
    fetchGETPOSTPUTDELETEJSON("resultados/compania", {}, "POST")
      .then((data) => data.json())
      .then((result) => {
        setClinica(result);
      });
  };
  useEffect(() => {
    getResultado();
  }, []);

  // console.log(clinica);
  // useEffect(() => {
  //   const activeList = () => {
  //     data.map((datos, index) => {
  //       let dates = datos.nro_atencion;
  //       return setEnvioEmail({ ...envioEmail, [index]: dates });
  //       // console.log(datos);
  //       // console.log(index);
  //     });
  //   };
  //   activeList();
  // }, [data]);

  // console.log(data);

  const enviarEmail = () => {
    // data.map((datos, index) => {
    //   let dates = datos.nro_atencion;
    //   return setEnvioEmail({ ...envioEmail, [datos.nro_atencion]: dates });
    // });
    // data.map((datos) => {
    // return setEnvioEmail([...envioEmail, datos.nro_atencion]);
    // fetchGETPOSTPUTDELETEJSON(
    //   'enviar-resultados/corporativo',
    //   [datos.nro_atencion],
    //   'POST'
    // ).then((data) => data.json());
    // });
    const array = data.map((m) => m.nro_atencion);

    fetchGETPOSTPUTDELETEJSON(
      "enviar-resultados/corporativo",
      { atenciones: array },
      "POST"
    )
      .then((data) => data.json())
      .then((data) => console.log(data));
  };

  // useEffect(() => {
  //   const obtenerNA = () => {
  //     data.map((datos) => {
  //       setObtenidoData([...obtenidoData, datos]);
  //     });
  //   };
  //   obtenerNA();
  // }, [data]);

  // console.log(envioEmail);

  const columnas = [
    {
      name: "Ítem",
      selector: (row) => (row && row.nro_atencion ? row.nro_atencion : ""),
      sortable: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Nombres y apellidos",
      selector: (row) => (row && row.paciente ? row.paciente : ""),
      sortable: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
      grow: 3,
    },
    {
      name: "Tipo de documento",
      selector: (row) => (row && row.tipo_documento ? row.tipo_documento : ""),
      sortable: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Nº de documento",
      selector: (row) => (row && row.dni ? row.dni : ""),
      sortable: true,
      grow: 2,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Teléfono",
      selector: (row) => (row && row.telefono ? row.telefono : ""),
      sortable: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Correo",
      selector: (row) => (row && row.email ? row.email : ""),
      sortable: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
      grow: 2,
    },

    {
      name: "Estado",
      // selector: 'telefono',
      sortable: true,
      right: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Resultados",
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
    if (e.servicio_id == 5) {
      generarPDF(e, antigeno, "Formato Antígeno");
    } else if (e.servicio_id === 6) {
      generarPDF(e, eclia, "Formato Eclia");
    } else if (e.servicio_id === 7) {
      generarPDF(e, molecular, "Formato Molecular");
    } else if (e.servicio_id === 8) {
      generarPDF(e, rapida, "Formato Rapida");
    }
  };

  const generarPDF = (e, imagen, formato) => {
    console.log(e);
    const doc = new jsPDF("p", "pt");
    doc.setProperties({
      title: formato,
    });
    doc.setFontSize(10);

    doc.addImage(imagen, "PNG", 5, 20, 580, 800, "", "FAST");

    if (e.servicio_id === 5) {
      doc.text(328, 135, `${e && e.genero ? e.genero : ""}`);
      doc.text(90, 136, `${e.nro_atencion ? e.nro_atencion : ""}`);
      doc.text(60, 158, `${e.dni ? e.dni : ""}`);
      doc.text(428, 157, `${e.fecha_atencion ? e.fecha_atencion : ""}`);

      doc.text(90, 180, `${e.paciente ? e.paciente : ""}`);

      doc.text(
        280,
        268,
        `${
          e.resultado && e.resultado.result === 0 ? "No detectado" : "Detectado"
        }`
      );
    } else if (e.servicio_id == 6) {
      doc.text(
        328,
        120,
        `${
          e && e.person && e.person.gender_id === 1 ? "Masculino" : "Femenino"
        }`
      );
      doc.text(85, 119, `${e.nro_atencion ? e.nro_atencion : ""}`);
      doc.text(55, 141, `${e.dni ? e.dni : ""}`);
      doc.text(428, 141, `${e.fecha_atencion ? e.fecha_atencion : ""}`);

      doc.text(85, 163, `${e.paciente ? e.paciente : ""}`);
      doc.text(
        195,
        268,
        `${e.resultado && e.resultado.result_igm ? e.resultado.result_igm : ""}`
      );
      doc.text(
        285,
        268,
        `${e.resultado && e.resultado.result_igg ? e.resultado.result_igg : ""}`
      );
    } else if (e.servicio_id == 7) {
      doc.text(328, 141, `${e && e.genero ? e.genero : ""}`);

      doc.text(85, 140, `${e.nro_atencion ? e.nro_atencion : ""}`);
      doc.text(55, 163, `${e.dni ? e.dni : ""}`);
      doc.text(428, 163, `${e.fecha_atencion ? e.fecha_atencion : ""}`);

      doc.text(85, 185, `${e.paciente ? e.paciente : ""}`);
    } else if (e.servicio_id == 8) {
      doc.text(328, 141, `${e && e.genero ? e.genero : ""}`);
      doc.text(55, 163, `${e && e.person && e.person.dni ? e.person.dni : ""}`);
      doc.text(
        428,
        163,
        `${e && e.result && e.result.date ? e.result.date : ""}`
      );

      doc.text(
        85,
        185,
        `${
          e && e.person && e.person.name && e.person.pat_lastname
            ? e.person.name + " " + e.person.pat_lastname
            : ""
        }`
      );
    }

    window.open(doc.output("bloburl"), "_blank");
    // var blob = doc.output("blob");
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
