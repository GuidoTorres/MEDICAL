import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { lasubir } from "../../data/LASubir";
import { paginacionOpciones } from "../../helpers/tablaOpciones";
import MSubirLaboratorio from "./MSubirLaboratorio";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";

const SubirLaboratorio = () => {
  const [busqueda, setBusqueda] = useState("");
  const [listRegistro, setListRegistro] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [attention, setAttention] = useState({});
  const [dataSelected, setDataSelected] = useState(null);
  const [tipoPrueba, setTipoPrueba] = useState(null);

  const getAtencion = () => {
    fetchGETPOSTPUTDELETE("result")
      .then((data) => data.json())
      .then((datos) => setAttention(datos.data));
  };

  useEffect(() => {
    getAtencion();
  }, []);

  console.log(tipoPrueba);
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
      name: "Tipo de usuario",
      selector: (row) => (row.people_id === 1 ? "Particular" : "Empresa"),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Nro de documento",
      selector: (row) => (row.dni ? row.person.dni : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Fecha",
      selector: (row) => (row.date_creation ? row.date_creation : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Nombres y apellidos",
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
      name: "Acción",
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleDetalles(e)}
          className="table__tablebutton"
        >
          <i class="fas fa-angle-right"></i>
        </button>
      ),
    },
  ];

  useEffect(() => {
    const filtrarElemento = () => {
      const search = lasubir.filter((data) => {
        return (
          data.tipo
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.dni.toString().includes(busqueda) ||
          data.fecha
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.nombre
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.apellido
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
  //
  const handleDetalles = (e) => {
    // console.log(e);
    setOpenModal(true);
    setDataSelected(e);
  };

  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="barra">
            <p>Subir resultados</p>
            <div className="laboratorio__resultados">
              <div>
                <label>Categoría</label>
                <select class="form-select" aria-label="Default select example">
                  <option>Seleccione</option>
                  <option value="1">COVID-19</option>
                </select>
              </div>
              <div>
                <label>Sub-Categoría</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setTipoPrueba(e.target.value)}
                >
                  <option>Seleccione</option>

                  <option value="1">Antígeno</option>
                  <option value="2">Electroquimioluminiscencia</option>
                  <option value="3">Inmunocromatografia</option>
                  <option value="4">RT-PCR</option>
                </select>
              </div>
            </div>
          </div>
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
              <div>
                {/* <button className="botones">Cargar resultado</button> */}
              </div>
            </div>

            <DataTable
              columns={columnas}
              data={attention}
              pagination
              paginationComponentOptions={paginacionOpciones}
              fixedHeader
              fixedHeaderScrollHeight="500px"
              noDataComponent={
                <div className="spinner">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <i className="fas fa-inbox table__icono"></i>
                </div>
              }
            />
          </div>
        </div>
        {openModal && tipoPrueba > 0 &&(
          <MSubirLaboratorio
            openModal={openModal}
            setOpenModal={setOpenModal}
            dataSelected={dataSelected}
            tipoPrueba= {tipoPrueba}
          />
        )}
      </div>
    </div>
  );
};

export default SubirLaboratorio;
