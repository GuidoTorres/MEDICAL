import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import eclia from "../../assets/pdf Imagen/eclia.png";
import antigeno from "../../assets/pdf Imagen/antigeno.png";
import molecular from "../../assets/pdf Imagen/molecular.png";

// import { historial } from '../../data/PHistorial';
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";
import { paginacionOpciones } from "../../helpers/tablaOpciones";

const CargarResultado = () => {
  const [busqueda, setBusqueda] = useState("");
  // const [listResult, setListResult] = useState([]);
  const [result, setResult] = useState({});
  const [resultado, setResultado] = useState({});

  const getResult = () => {
    fetchGETPOSTPUTDELETE("result")
      .then((info) => info.json())
      .then((datos) => setResult(datos.data));
  };

  useEffect(() => {
    getResult();
  }, []);

  console.log(result);

  const [getDateAttention, setGetDateAttention] = useState([]);

  const getAttention = () => {
    fetchGETPOSTPUTDELETE("attention")
      .then((data) => data.json())
      .then((datos) => setGetDateAttention(datos.data));
  };

  useEffect(() => {
    getAttention();
  }, []);

  console.log(getDateAttention);

  const columnas = [
    {
      name: "Item",
      selector: "id",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Tipo de documento",
      selector: (row) =>
        row.person && row.person.document_type_id === 3
          ? "Carné de extranjería"
          : row.person && row.person.document_type_id === 2
          ? "Pasaporte"
          : row.person && row.person.document_type_id === 1
          ? "DNI"
          : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Nº documento",
      selector: (row) => (row.person && row.person.dni ? row.person.dni : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Nombre",
      selector: (row) => (row.person && row.person.name ? row.person.name : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Apellido",
      selector: (row) =>
        row.person && row.person.pat_lastname ? row.person.pat_lastname : "",

      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Tipo prueba",
      selector: (row) =>
        row.service && row.service.name ? row.service.name : "",

      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Fecha solicitud",
      selector: (row) => (row.date_creation ? row.date_creation : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Cargar Resultados",
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleDetalles(e)}
          className="table__tablebutton"
        >
          <i className="far fa-file-pdf"></i>
        </button>
      ),
    },
  ];

  //
  // useEffect(() => {
  //   const filtrarElemento = () => {
  //     const search = historial.filter((data) => {
  //       return (
  //         data.dni.toString().includes(busqueda) ||
  //         data.nombre
  //           .normalize('NFD')
  //           .replace(/[\u0300-\u036f]/g, '')
  //           .toLocaleLowerCase()
  //           .includes(busqueda) ||
  //         data.apellido
  //           .normalize('NFD')
  //           .replace(/[\u0300-\u036f]/g, '')
  //           .toLocaleLowerCase()
  //           .includes(busqueda) ||
  //         data.tipo
  //           .normalize('NFD')
  //           .replace(/[\u0300-\u036f]/g, '')
  //           .toLocaleLowerCase()
  //           .includes(busqueda) ||
  //         data.solicitud
  //           .normalize('NFD')
  //           .replace(/[\u0300-\u036f]/g, '')
  //           .toLocaleLowerCase()
  //           .includes(busqueda)
  //       );
  //     });
  //     setListRegistro(search);
  //   };
  //   filtrarElemento();
  // }, [busqueda]);

  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };
  const handleDetalles = (e) => {
    if (e.service.name == "Eclia") {
      generarPDF(e, eclia, "Formato Eclia");
    } else if (e.service.name === "Antígeno") {
      generarPDF(e, antigeno, "Formato Antígeno");
    } else if (e.service.name === "Molecular") {
      generarPDF(e, molecular, "Formato Molecular");
    }
  };

  const generarPDF = (e, imagen, formato) => {
    console.log(e);
    const doc = new jsPDF("p", "pt");
    doc.setProperties({
      title: formato,
    });
    doc.setFontSize(10);

    doc.addImage(imagen, "PNG", 40, 30, 520, 800);

    doc.text(
      328,
      128,
      `${e && e.person && e.person.gender_id === 1 ? "Masculino" : "Femenino"}`
    );
    doc.text(90, 150, `${e && e.person && e.person.dni ? e.person.dni : ""}`);
    doc.text(
      107,
      173,
      `${
        e && e.person && e.person.name && e.person.pat_lastname
          ? e.person.name + " " + e.person.pat_lastname
          : ""
      }`
    );

    window.open(doc.output("bloburl"), "_blank");

    var file = new File([doc.output("blob")], "resultados.pdf", {
      type: "application/pdf",
    });
    // console.log(file);
    // setResultado({
    //   id: e.id,
    //   pdf: file,
    // });
    // postResult(resultado);
  };

  const postResult = (resultado) => {
    const formData = new FormData();
    formData.set("id", resultado.id);
    formData.set("pdf", resultado.pdf);

    fetchGETPOSTPUTDELETE("result", formData, "POST").then((info) =>
      console.log(info)
    );
  };
  //
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
            data={result}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            fixedHeaderScrollHeight="500px"
            noDataComponent={
              <div className="spinner">
                <i className="fas fa-inbox table__icono"></i>
                <p style={{ color: "grey" }}>No hay datos</p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CargarResultado;
