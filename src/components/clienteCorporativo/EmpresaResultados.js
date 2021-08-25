import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { paginacionOpciones } from "../../helpers/tablaOpciones";
import { fetchGETPOSTPUTDELETEJSON } from "../../helpers/fetch";

const EmpresaResultados = () => {
  const [busqueda, setBusqueda] = useState("");
  const [clinica, setClinica] = useState([]);
  const [data, setData] = useState([]);
  const [listRegistro, setListRegistro] = useState("");
  const [checboxValue, setChecboxValue] = useState({
    chekcboxEmail: false,
  });
  const [switchxd, setAutomatico] = useState(0);
  const { chekcboxEmail } = checboxValue;

  const getResultado = () => {
    fetchGETPOSTPUTDELETEJSON("resultados/compania", {}, "POST")
      .then((data) => data.json())
      .then((result) => {
        setClinica(result.data);
      });
  };
  useEffect(() => {
    getResultado();
  }, []);

  const enviarEmail = () => {
    const array = data.map((m) => m.nro_atencion);
    fetchGETPOSTPUTDELETEJSON(
      "enviar-resultados/corporativo",
      { atenciones: array },
      "POST"
    )
      .then((data) => data.json())
      .then(() => getResultado());
  };

  const cambioSwitch = () => {
    fetchGETPOSTPUTDELETEJSON("company/update_status", {}, "POST").then(
      (data) => data.json()
    );
  };

  useEffect(() => {
    if (chekcboxEmail) {
      setAutomatico(1);
      cambioSwitch({ send_status: switchxd });
      getResultado();
    } else {
      setAutomatico(0);
      cambioSwitch({ send_status: switchxd });
    }
  }, [chekcboxEmail, switchxd]);

  useEffect(() => {
    const filtrarElemento = () => {
      const search = clinica.filter((data) => {
        return data.dni
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
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

  const columnas = [
    {
      name: "Ítem",
      selector: (row, index) => (index += 1),
      grow: 0,
      style: {
        borderBotton: "none",
        color: "#555555",
      },
    },
    {
      name: "Nombres y apellidos",
      selector: (row) => (row && row.paciente ? row.paciente : ""),
      center: true,
      grow: 3,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Tipo de documento",
      selector: (row) => (row && row.tipo_documento ? row.tipo_documento : ""),
      center: true,
      grow: 2,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Nº de documento",
      selector: (row) => (row && row.dni ? row.dni : ""),
      sortable: true,
      center: true,
      grow: 2,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Teléfono",
      selector: (row) => (row && row.telefono ? row.telefono : ""),
      center: true,
      grow: 2,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Correo",
      selector: (row) => (row && row.email ? row.email : ""),
      center: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
      grow: 2,
    },
    {
      name: "Estado",
      selector: (row) =>
        row.resultado === null
          ? "falta generar resultado"
          : row.resultado.enviado === 0
          ? "No enviado"
          : "Enviado",
      grow: 2,
      center: true,
      style: {
        color: "#8f9196",
        borderBotton: "none",
      },
    },
    {
      name: "Resultados",
      button: true,
      cell: (e) => (
        <button type="button" className="table__tablebutton eliminar">
          {e.resultado === null ? (
            <i
              className="far fa-file-pdf"
              style={{ color: "#7c7c7c", cursor: "unset" }}
            ></i>
          ) : (
            <a
              href={e.resultado.pdf}
              alt=""
              target="_blank"
              rel="noreferrer"
              style={{ color: "#009DCA" }}
            >
              <i className="far fa-file-pdf"></i>
            </a>
          )}
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
