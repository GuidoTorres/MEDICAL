import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import CodigoBarras from "./Modales/CodigoBarras";
import { ratencion } from "../../data/RAtencion";
import { paginacionOpciones } from "../../helpers/tablaOpciones";
import Swal from "sweetalert2";
import {
  fetchGETPOSTPUTDELETE,
  fetchGETPOSTPUTDELETEJSON,
} from "../../helpers/fetch";

const Atencion = () => {
  const [busqueda, setBusqueda] = useState("");
  const [listRegistro, setListRegistro] = useState([]);
  const [openModalBar, setOpenModalBar] = useState(false);
  const [dataBarCode, setDataBarCode] = useState({});
  const [attention, setAttention] = useState({});
  const [generateAttention, setGenerateAttention] = useState({});

  //clinic care es el optimo
  // por ahora usar clinics get

  const getAttention = () => {
    fetchGETPOSTPUTDELETE("attention_clinic")
      .then((data) => data.json())
      .then((datos) => setAttention(datos.data));
  };


  useEffect(() => {
    getAttention();

  }, []);

  console.log(attention);

  const columnas = [
    {
      name: "Ítem",
      selector: (row, index) => (index += 1),
      sortable: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Nombres y apellidos",
      selector: (row) => (row.fullName ? row.fullName : ""),
      sortable: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
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
    //     color: "#8f9196",
    //     borderBotton: "none",
    //   },
    // },
    {
      name: "Nº de documento",
      selector: (row) => (row.DNI ? row.DNI : ""),
      sortable: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Estado",
      selector: (row) => (row.type_user ? row.type_user : ""),
      sortable: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Tipo de prueba",
      selector: (row) => (row.service_type ? row.service_type : ""),
      sortable: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    // {
    //   name: "Código de barras",
    //   button: true,
    //   cell: (e) => (
    //     <button
    //       className="table__tablebutton editar"
    //       onClick={() => openBarcode(e)}
    //     >
    //       <i className="fas fa-barcode"></i>
    //     </button>
    //   ),
    // },
    {
      name: "Atención",
      button: true,
      cell: (e) => (
        <button
          className="table__tablebutton editar"
          onClick={() => generarAtencion(e)}
        >
          <i className="fas fa-angle-right"></i>
        </button>
      ),
    },
  ];

  useEffect(() => {
    const filtrarElemento = () => {
      const search = ratencion.filter((data) => {
        return (
          data.nombre
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.dni.toString().includes(busqueda) ||
          data.tipoprueba
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda)
        );
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda]);

  const openBarcode = (e) => {
    setDataBarCode(e);
    setOpenModalBar(true);
  };

  const generarAtencion = (e) => {
    // setGenerateAttention({
    //   date_creation: getFecha() || "",
    //   time_attention: getHora(),
    //   people_id: e.id || "",
    //   service_id:
    //     e.service_details && e.service_details.service_category_id
    //       ? e.service_details.service_category_id
    //       : "",
    //   clinic_id: 1 || "",
    //   codebar: "0213000011111",
    // });
    Swal.fire({
      title: "¿Desea Atender al paciente?",
      text: `${e.fullName ? e.fullName : "No hay datos"}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Atender",
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        fetchGETPOSTPUTDELETEJSON(`attention/attend/${e.id}`).then((data) => {
          if (data.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Éxito",
              text: "Se ha genero la atención correctamente.",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Aceptar",
            }).then((resp) => {
              if (resp.isConfirmed) {
                getAttention();
              }
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Ups¡",
              text: "Algo salió mal.",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Cerrar",
            });
          }
        });
        // .then((datos) => setAttention(datos.data));
        // Swal.fire("Éxito!", "Se genero la atención correctamente.", "success");
      }
    });
  };

  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
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
            data={attention}
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

      {openModalBar && (
        <CodigoBarras
          openModalBar={openModalBar}
          setOpenModalBar={setOpenModalBar}
          dataBarCode={dataBarCode}
        />
      )}
    </div>
  );
};

export default Atencion;
