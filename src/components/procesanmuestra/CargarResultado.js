import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import eclia from "../../assets/pdf Imagen/eclia.png";
import antigenosi from "../../assets/pdf Imagen/antigenoSi.png";
import antigenono from "../../assets/pdf Imagen/antigenoNo.png";
import molecular from "../../assets/pdf Imagen/molecular.png";
import rapida from "../../assets/pdf Imagen/rapida.png";
import anticuerpos from "../../assets/pdf Imagen/anticuerpos.png";

import Swal from "sweetalert2";

// import { historial } from '../../data/PHistorial';
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";
import { paginacionOpciones } from "../../helpers/tablaOpciones";

const CargarResultado = () => {
  const [busqueda, setBusqueda] = useState("");
  // const [listResult, setListResult] = useState([]);
  const [result, setResult] = useState({});
  const [resultado, setResultado] = useState({});
  const [getDateAttention, setGetDateAttention] = useState([]);

  const getResult = () => {
    fetchGETPOSTPUTDELETE("result_historial")
      .then((info) => info.json())
      .then((datos) => setResult(datos.data));
  };

  useEffect(() => {
    getResult();
  }, []);

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
    // {
    //   name: "Tipo de documento",
    //   selector: (row) =>
    //     row.person && row.person.document_type_id === 3
    //       ? "Carné de extranjería"
    //       : row.person && row.person.document_type_id === 2
    //       ? "Pasaporte"
    //       : row.person && row.person.document_type_id === 1
    //       ? "DNI"
    //       : "",
    //   sortable: true,
    //   style: {
    //     borderBotton: "none",
    //     color: "#555555",
    //   },
    // },
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
      selector: (row) =>
        row.person && row.person.name && row.person.pat_lastname
          ? row.person.name + " " + row.person.pat_lastname
          : "",
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
      cell: (e) =>
        e.result.pdf === null ? (
          <button
            onClick={() => handleDetalles(e)}
            className="table__tablebutton"
          >
            <i className="far fa-file-pdf" style={{ color: "grey" }}></i>
          </button>
        ) : (
          <button disabled className="table__tablebutton">
            <i className="far fa-file-pdf" style={{ color: "red" }}></i>
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
    if (e.service.id == 5) {
      if (e.resultado && e.resultado.result === 0) {
        generarPDF(e, antigenono, "Formato Antígeno");
      } else if (e.resultado && e.resultado === 1) {
        generarPDF(e, antigenosi, "Formato Antígeno");
      }
    } else if (e.service.id === 6) {
      generarPDF(e, eclia, "Formato Eclia");
    } else if (e.service.id === 7) {
      generarPDF(e, anticuerpos, "Formato Anticuerpos");
    } else if (e.service.id === 8) {
      generarPDF(e, rapida, "Formato Rapida");
    }
  };

  const generarPDF = (e, imagen, formato) => {
    const doc = new jsPDF("p", "pt");
    doc.setProperties({
      title: formato,
    });
    doc.setFontSize(10);

    doc.addImage(imagen, "PNG", 6, 20, 580, 800, "", "FAST");

    if (e.servicio_id === 5) {
      doc.text(328, 135, `${e && e.genero ? e.genero : ""}`);
      doc.text(328, 135, `${e && e.genero === null ? "Masculino" : ""}`);

      doc.text(90, 136, `${e.nro_atencion ? e.nro_atencion : ""}`);
      doc.text(60, 158, `${e.dni ? e.dni : ""}`);
      doc.text(428, 157, `${e.fecha_atencion ? e.fecha_atencion : ""}`);

      doc.text(85, 180, `${e.paciente ? e.paciente : ""}`);
      doc.text(312, 180, "20");

      doc.text(
        284,
        268,
        `${
          e.resultado && e.resultado.result === 0
            ? "No detectado"
            : e.resultado && e.resultado.result === 1
            ? "Detectado"
            : "Sin resultado"
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

      doc.text(80, 163, `${e.paciente ? e.paciente : ""}`);
      doc.text(313, 164, "20");

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
      doc.text(328, 124, `${e && e.genero === null ? "Masculino" : ""}`);

      doc.text(83, 124, `${e.nro_atencion ? e.nro_atencion : ""}`);
      doc.text(55, 146, `${e.dni ? e.dni : ""}`);
      doc.text(428, 146, `${e.fecha_atencion ? e.fecha_atencion : ""}`);

      doc.text(78, 167, `${e.paciente ? e.paciente : ""}`);

      doc.text(310, 167, "20");

      doc.text(
        180,
        265,
        `${
          e.resultado && e.resultado.result === "0"
            ? "Negativo"
            : e.resultado && e.resultado.result === "1"
            ? "Positivo"
            : "Sin resultado"
        }`
      );
    } else if (e.servicio_id == 8) {
      doc.text(84, 142, `${e.nro_atencion ? e.nro_atencion : ""}`);

      doc.text(328, 141, `${e && e.genero ? e.genero : ""}`);
      doc.text(55, 163, `${e && e.dni ? e.dni : ""}`);
      doc.text(428, 163, `${e && e.fecha_atencion ? e.fecha_atencion : ""}`);

      doc.text(80, 184, `${e.paciente ? e.paciente : ""}`);
      doc.text(310, 185, "20");
    }

    var file = new File([doc.output("blob")], "resultados.pdf", {
      type: "application/pdf",
    });

    const formData = new FormData();
    formData.set("id", e.id);
    formData.set("pdf", file);
    console.log(resultado);
    fetchGETPOSTPUTDELETE("result", formData, "POST").then((info) => {
      console.log(info);
      if (info.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Se ha cargo el pdf correctamente.",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Aceptar",
        }).then((resp) => {
          if (resp.isConfirmed) {
            getResult();
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "!Ups¡",
          text: "Algo salió mal.",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Cerrar",
        });
      }
    });
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
          </div>

          <DataTable
            columns={columnas}
            data={result}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            striped
            highlightOnHover
            fixedHeaderScrollHeight="100%"
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
