import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { empresa } from "../../data/AVEmpresa";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";

// import { servicio } from '../../data/AVServicio';
import { paginacionOpciones } from "../../helpers/tablaOpciones";
import MEmpresa from "./MEmpresa";
import MMostrarPreciosEmpresa from "./MMostrarPreciosEmpresa";

const Empresa = ({ getServicio }) => {
  const [busqueda, setBusqueda] = useState("");
  const [listRegistro, setListRegistro] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [listaPrecios, setListaPrecios] = useState(false);
  const [metGetClinic, setMetGetClinic] = useState([]);
  const [dataSelected, setDataSelected] = useState({});
  const [editar, setEditar] = useState(false);

  const getClinica = () => {
    fetchGETPOSTPUTDELETE("company_discount")
      .then((data) => data.json())
      .then((datos) => {
        setMetGetClinic(datos.data);
      });
  };

  useEffect(() => {
    getClinica();
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
    {
      name: "Empresa",
      selector: (row) =>
        row.corporation && row.corporation.business_name
          ? row.corporation.business_name
          : "",
      sortable: true,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },

    {
      name: "Lista de precios",
      button: true,
      cell: (e) => (
        <button onClick={() => handlePrecios(e)} className="table__tablebutton">
          <i class="fas fa-eye"></i>
        </button>
      ),
    },
    {
      name: "Editar",
      button: true,
      cell: (e) => (
        <button onClick={() => handleEditar(e)} className="table__tablebutton">
          <i className="fas fa-pencil-alt"></i>
        </button>
      ),
    },
    {
      name: "Eliminar",
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleEliminar(e)}
          className="table__tablebutton"
        >
          <i className="far fa-trash-alt"></i>
        </button>
      ),
    },
  ];
  //
  useEffect(() => {
    const filtrarElemento = () => {
      const search = empresa.filter((data) => {
        return data.empresa
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLocaleLowerCase()
          .includes(busqueda);
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda]);

  const handleEliminar = (e) => {
    Swal.fire({
      title: "¿Desea eliminar?",
      text: `${e.empresa}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "Se ha eliminado correctamente.", "success");
      }
    });
  };
  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };
  const handleAddRegistro = () => {
    setOpenModal(true);
  };

  const handleEditar = (e) => {
    setOpenModal(true);
    setDataSelected(e);
    setEditar(true);
  };

  const handlePrecios = (e) => {
    setListaPrecios(true);
    setDataSelected(e);
  };

  return (
    <div className="container mt-4">
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
            data={metGetClinic}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            striped
            highlightOnHover
            fixedHeaderScrollHeight="100%"
            noDataComponent={<i className="fas fa-inbox table__icono"></i>}
          />
        </div>
      </div>
      {listaPrecios && (
        <MMostrarPreciosEmpresa
        listaPrecios={listaPrecios}
          setListaPrecios={setListaPrecios}
          dataSelected={dataSelected}
          setDataSelected={setDataSelected}
        />
      )}
      {openModal && (
        <MEmpresa
          setOpenModal={setOpenModal}
          openModal={openModal}
          dataSelected={dataSelected}
          setDataSelected={setDataSelected}
          editar={editar}
          setEditar={setEditar}
          getClinica={getClinica}
          getServicio={getServicio}
        />
      )}
    </div>
  );
};

export default Empresa;
