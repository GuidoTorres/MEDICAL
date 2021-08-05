import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { paginacionOpciones } from "../../helpers/tablaOpciones";
import { fetchGETPOSTPUTDELETEJSON } from "../../helpers/fetch";
import { listaPacient } from "../../actions/organizador";

import OMLista from "./OMLista";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const Solicitud = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [busqueda, setBusqueda] = useState("");
  const [oranizadorxd, setOranizadorxd] = useState([]);
  const [modalList, setModalList] = useState(false);
  const [search, setSearch] = useState([]);
  const [listRegistro, setListRegistro] = useState({});

  const getSolicitudes = () => {
    fetchGETPOSTPUTDELETEJSON("reservation/organizer")
      .then((data) => data.json())
      .then((datos) => setOranizadorxd(datos.data));
  };
  // console.log(oranizadorxd);
  useEffect(() => {
    getSolicitudes();
  }, []);

  const ventanaIr = (e) => {
    dispatch(listaPacient(e));
    history.push("/organizador/calendario");
  };

  const abrirModal = (e) => {
    setListRegistro(e);
    setModalList(true);
  };

  const columnas = [
    {
      name: "Ítem",
      selector: (row, index) => (index += 1),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Usuario",
      selector: (row) => (row ? row.users[0].person.name : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Distrito",
      selector: (row) => (row ? row.address.district.name : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Fecha solicitada",
      selector: (row) => (row ? row.attention_date : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Hora solicitada",
      selector: (row) => (row ? row.attention_time : ""),
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Ver",
      button: true,
      cell: (e) => (
        <button onClick={() => abrirModal(e)} className="table__tablebutton">
          <i className="far fa-eye"></i>
        </button>
      ),
    },
    {
      name: "Atención",
      button: true,
      cell: (e) => (
        <button onClick={() => ventanaIr(e)} className="table__tablebutton">
          <i className="fas fa-angle-right"></i>
        </button>
      ),
    },
  ];

  useEffect(() => {
    const filtrarElemento = () => {
      const search = oranizadorxd.filter((data) => {
        return (
          (data.users.length > 0
            ? data.users[0].person.name
                .toString()
                .toLowerCase()
                .includes(busqueda.toLowerCase())
            : "") ||
          (data.address
            ? data.address.district.name
                .toString()
                .toLowerCase()
                .includes(busqueda.toLowerCase())
            : "") ||
          data.attention_date.toString().includes(busqueda) ||
          data.attention_time.toString().includes(busqueda)
        );
      });
      setSearch(search);
    };
    filtrarElemento();
  }, [busqueda, oranizadorxd]);

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
            data={search}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            fixedHeaderScrollHeight="100%"
            highlightOnHover
            striped
            noDataComponent={<i className="fas fa-inbox table__icono"></i>}
          />
        </div>
      </div>
      {modalList && (
        <OMLista
          modalList={modalList}
          setModalList={setModalList}
          listRegistro={listRegistro}
        />
      )}
    </div>
  );
};

export default Solicitud;
